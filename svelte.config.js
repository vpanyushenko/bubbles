import vercel from "@sveltejs/adapter-vercel";
import autoprefixer from "autoprefixer";
import preprocess from "svelte-preprocess";
import path from "path";
import { mdsvex } from "mdsvex";
// import svg from "rollup-plugin-svg";
// import inlineSvg from "rollup-plugin-inline-svg";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md", ".svelte.md", ".svx"],
  preprocess: [
    mdsvex({ extensions: [".svelte.md", ".md", ".svx"] }),
    preprocess({
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
      // plugins: [inlineSvg()],
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
