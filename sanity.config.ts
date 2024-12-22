// ./sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  projectId: "erw67dz9",
  dataset: "production",
  plugins: [structureTool()],
  schema,
});
