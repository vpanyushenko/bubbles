import { sveltekit } from "@sveltejs/kit/vite";
import autoprefixer from "autoprefixer";
import path from "path";
// import svg from "vite-plugin-svelte-svg";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const file = fileURLToPath(new URL("package.json", import.meta.url));
const json = readFileSync(file, "utf8");
const pkg = JSON.parse(json);

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  server: {
    fs: {
      strict: false,
      allow: [".."],
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      $docs: path.resolve("./src/docs"),
      "bubbles-ui": path.resolve("./dist"),
    },
  },
  define: {
    __version__: JSON.stringify(pkg.version),
    __kit_version__: JSON.stringify(pkg.devDependencies["@sveltejs/kit"]),
  },
};

export default config;
