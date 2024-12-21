import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: "https://weslleyaraujo.github.io",
  base: "",
  build: {
    assets: "assets",
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: ({ names, originalFileNames, source, type }) => {
            return originalFileNames;
          },
        },
      },
    },
  },
  assets: {
    fileDir: "src/assets",
    preserveFilePaths: true,
  },
});
