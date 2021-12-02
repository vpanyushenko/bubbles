import vercel from "@sveltejs/adapter-vercel";
import autoprefixer from "autoprefixer";
import sveltePreprocess from "svelte-preprocess";
import path from "path";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.cjs";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions],
  preprocess: [
    // see https://github.com/sveltejs/svelte-preprocess
    mdsvex(mdsvexConfig),
    sveltePreprocess({
      lang: "css",
      postcss: {
        plugins: [autoprefixer],
      },
    }),
  ],
  kit: {
    target: "#svelte",
    adapter: vercel(),
    // prerender: {
    //   enabled: true,
    // },
    vite: {
      resolve: {
        alias: {
          $lib: path.resolve("./src/lib"),
          $misc: path.resolve("./src/misc"),
          $data: path.resolve("./src/data"),
        },
      },
      optimizeDeps: {
        include: ["highlight.js/lib/core"],
      },
    },
  },
};

export default config;
