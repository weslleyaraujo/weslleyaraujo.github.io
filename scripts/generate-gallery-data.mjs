import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.join(__dirname, "../src/assets");
const OUTPUT_DIR = path.join(__dirname, "../src/data/galleries");

function getExportName(year, month, gallery) {
  // Convert to lowercase and remove any non-alphanumeric characters
  return `${gallery.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
}

async function generateGalleryData() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Get all year directories
    const years = await fs.readdir(ASSETS_DIR);

    for (const year of years) {
      const yearPath = path.join(ASSETS_DIR, year);
      const yearStat = await fs.stat(yearPath);

      if (!yearStat.isDirectory()) continue;

      // Get all month directories
      const months = await fs.readdir(yearPath);

      for (const month of months) {
        const monthPath = path.join(yearPath, month);
        const monthStat = await fs.stat(monthPath);

        if (!monthStat.isDirectory()) continue;

        // Get all gallery directories
        const galleries = await fs.readdir(monthPath);

        for (const gallery of galleries) {
          const galleryPath = path.join(monthPath, gallery);
          const galleryStat = await fs.stat(galleryPath);

          if (!galleryStat.isDirectory()) continue;

          // Get all images in the gallery
          const files = await fs.readdir(galleryPath);
          const images = files.filter((file) =>
            /\.(jpg|jpeg|JPG|JPEG)$/.test(file)
          );

          if (images.length === 0) continue;

          const exportName = getExportName(year, month, gallery);

          // Create TypeScript file content
          const importStatements = images
            .map(
              (file) =>
                `import ${
                  path.parse(file).name
                } from "../../assets/${year}/${month}/${gallery}/${file}";`
            )
            .join("\n");

          const exportStatement = `
export const ${exportName} = [
  ${images.map((file) => path.parse(file).name).join(",\n  ")},
];`;

          const fileContent = `// Generated file - do not edit
${importStatements}

${exportStatement}
`;

          const outputPath = path.join(
            OUTPUT_DIR,
            `${year}-${month}-${gallery}.ts`
          );
          await fs.writeFile(outputPath, fileContent);

          console.log(`Generated gallery data for ${year}/${month}/${gallery}`);
        }
      }
    }

    // Generate index file
    const indexContent = await generateIndexFile();
    await fs.writeFile(path.join(OUTPUT_DIR, "index.ts"), indexContent);

    console.log("Gallery data generation complete!");
  } catch (error) {
    console.error("Error generating gallery data:", error);
    process.exit(1);
  }
}

async function generateIndexFile() {
  const files = await fs.readdir(OUTPUT_DIR);
  const imports = [];
  const exports = [];

  for (const file of files) {
    if (!file.endsWith(".ts") || file === "index.ts") continue;
    const [year, month, gallery] = path.parse(file).name.split("-");
    const exportName = getExportName(year, month, gallery);
    imports.push(`import { ${exportName} } from "./${path.parse(file).name}";`);
    exports.push(exportName);
  }

  return `// Generated file - do not edit
${imports.join("\n")}

export {
  ${exports.join(",\n  ")}
};
`;
}

generateGalleryData();
