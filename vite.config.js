import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
// import svg from "vite-plugin-svelte-svg";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    fs: {
      strict: false,
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      $docs: path.resolve("./src/docs"),
      // "bubbles-ui": path.resolve("./package"),
    },
  },
};

export default config;
