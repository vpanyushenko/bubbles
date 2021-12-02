import { browser } from "$app/env";
import { goto } from "$app/navigation";
import { showLoading, hideLoading } from "$lib/utils/loading";

/**
 * Adds a url query param based on a key value pair
 * @param {String} key - The key for the url param you want to add
 * @param {String} value - The value for the key
 * @param {Object} options - Additional options
 * @param {Boolean} [options.goto=true] - Will rerun the svelte load function after the query param is added
 * @param {String} [options.show_loading] - The ID of an element you want to shoe the animation for. The loading state will automatically stop when the load function completes it's promise.
 */
const addQueryParam = (key, value, options = { goto: true, show_loading: "" }) => {
  if (browser) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(key, value);
    history.replaceState(null, null, "?" + queryParams.toString());

    if (options?.goto || options?.show_loading) {
      if (options?.show_loading) {
        showLoading(options.show_loading);
      }

      goto(window.location.href, { keepfocus: true, replaceState: true, noscroll: true }).then(() => {
        if (options.show_loading) {
          hideLoading(options.show_loading);
        }
      });
    }
  }
};

export { addQueryParam };
