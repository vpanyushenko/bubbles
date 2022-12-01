import fs from "fs";
import path from "path";
// import { read_file } from "$lib/docs/server";
import { error } from "@sveltejs/kit";

const base = "../../docs";

import breadcumbs from "$lib/utils/breadcrumbs";
console.log(fs.existsSync("../../lib/utils/breadcrumbs"));

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  console.log(breadcumbs);
  /* @vite-ignore */
  const markdown = await import(`$docs/markdown/${params.component}`);

  console.log(markdown);
  console.log(base);
  console.log(base);
  console.log(base);
  const test = fs.existsSync("../../lib");
  console.log(test);
  console.log(test);
  console.log(test);
  console.log(fs.existsSync("./"));
  console.log(fs.existsSync("../"));
  console.log(fs.existsSync("../../"));
  console.log(fs.existsSync("../../lib"));
  console.log(fs.existsSync("$lib"));
  console.log(fs.existsSync("$lib/utils"));
  //   console.log(fs.existsSync("$docs"));
  //   console.log(fs.existsSync(base));

  const dir = `${base}/${params.component}`;
  console.log(fs.statSync(base));
  console.log("base");
  console.log("base");
  console.log("base");
  console.log("base");
  console.log(dir);
  console.log(__dirname);

  console.log(fs.readdirSync(path.join(__dirname, dir)));

  //   for (const subdir of fs.readdirSync(base)) {
  //   	if (!fs.statSync(`${base}/${subdir}`).isDirectory()) continue;

  for (const file of fs.readdirSync(dir)) {
    console.log(file);
    // if (file.slice(3, -3) === params.slug) {
    // 	return {
    // 		page: await read_file(`docs/${subdir}/${file}`)
    // 	};
    // }
  }
  //   }

  // throw error(404);
}
