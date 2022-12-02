import { sveltekit } from "@sveltejs/kit/vite";
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
  resolve: {
    alias: {
      $docs: path.resolve("./src/docs"),
    },
  },
  define: {
    __version__: JSON.stringify(pkg.version),
  },
};

export default config;
