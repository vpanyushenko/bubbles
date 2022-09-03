import vercel from "@sveltejs/adapter-vercel";
import autoprefixer from "autoprefixer";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md", ".svelte.md", ".svx"],
  preprocess: [
    mdsvex({ extensions: [".svelte.md", ".md", ".svx"], smartypants: false }),
    preprocess({
      lang: "css",
      postcss: {
        plugins: [autoprefixer()],
      },
    }),
  ],
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
