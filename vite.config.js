import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
// import svg from "vite-plugin-svelte-svg";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      $docs: path.resolve("./src/docs"),
    },
  },
};

export default config;
