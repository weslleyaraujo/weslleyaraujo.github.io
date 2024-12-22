import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), sanity({
    projectId: 'erw67dz9',
    dataset: 'production',
    useCdn: true,
    studioBasePath: '/studio'
  }), react()],
  site: "https://weslleyaraujo.github.io",
  base: "",
  vite: {
    build: {
      rollupOptions: {
        external: ['styled-components']
      }
    }
  }
});