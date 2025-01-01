import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  integrations: [
    tailwind(),
    sanity({
      projectId: "erw67dz9",
      dataset: "production",
      useCdn: false,
      ...(isProduction ? {} : { studioBasePath: "/studio" }),
    }),
    react(),
  ],
  site: "https://weslleyaraujo.github.io",
  base: "",
  output: "static",
  vite: {
    build: {
      rollupOptions: {
        external: ["styled-components"],
      },
    },
  },
});
