import vercel from "@sveltejs/adapter-vercel";
import autoprefixer from "autoprefixer";
import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import path from "path";

// import dns from "dns";

// dns.setDefaultResultOrder("verbatim");

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
    adapter: vercel({ edge: true }),
    prerender: {
      entries: [],
    },
  },
};

export default config;
