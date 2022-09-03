import { pageStore } from "../utils/stores";
import { browser } from "$app/env";

const setDarkMode = () => {
  if (browser) {
    document.documentElement.classList.add("dark");
    localStorage["bubbles-color-scheme"] = "dark";
    pageStore.update((data) => {
      data.dark_mode = true;
      return data;
    });
  }
};

const unsetDarkMode = () => {
  if (browser) {
    document.documentElement.classList.remove("dark");
    localStorage["bubbles-color-scheme"] = "light";
    pageStore.update((data) => {
      data.dark_mode = false;
      return data;
    });
  }
};

export { setDarkMode, unsetDarkMode };
