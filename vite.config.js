import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
// import svg from "vite-plugin-svelte-svg";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $assets: path.resolve("./src/assets"),
    },
  },
};

export default config;
