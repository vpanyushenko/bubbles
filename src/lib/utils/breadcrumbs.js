import { pageStore } from "$lib/stores/page.store";
import { get } from "svelte/store";

export default (path) => {
  const pathArray = path.split("/").filter(Boolean);
  const pageStoreData = get(pageStore);

  if (pathArray.length > 0 && !pageStoreData.title) {
    pageStore.update((data) => {
      const title = pathArray[pathArray.length - 1];
      data.title = title.charAt(0).toUpperCase() + title.slice(1);
      return data;
    });
  }

  if (pathArray.length <= 1) {
    return [];
  } else {
    // const title = get(pageStore).title;

    const breadcrumbs = pathArray.map((crumb, index) => {
      let href = "";

      for (let i = 0; i <= index; i++) {
        href += `/${pathArray[i]}`;
      }

      if (pathArray.length - 1 === index && pageStoreData.title) {
        crumb = pageStoreData.title;
      }

      const obj = {
        text: pathArray.length - 3 >= index ? "..." : crumb,
        href: href,
      };
      return obj;
    });

    return breadcrumbs;
  }
};
