import vercel from "@sveltejs/adapter-vercel";
import autoprefixer from "autoprefixer";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    mdsvex({ extensions: [".md"], smartypants: false }),
    preprocess({
      lang: "css",
      postcss: {
        plugins: [autoprefixer()],
      },
    }),
  ],
  package: {},
  kit: {
    alias: {
      $assets: "./src/assets",
      "$assets/*": "./src/assets/*",
    },
    adapter: vercel({ edge: true }),
    prerender: {
      enabled: true,
    },
  },
};

export default config;
