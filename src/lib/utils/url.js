import { browser } from "$app/env";
import { session } from "$app/stores";
//import { showLoading, hideLoading } from "$lib/utils/loading";
import { showLoading, hideLoading } from "../utils/loading";

/**
 * Adds a url query param based on a key value pair
 * @param {String} key - The key for the url param you want to add
 * @param {String} value - The value for the key
 * @param {Object} options - Additional options
 * @param {Function} [options.goto=true] - the imported svelte kit goto function. Passing this will indicate that you want to load function to be rerun
 * @param {String} [options.show_loading] - The ID of an element you want to shoe the animation for. The loading state will automatically stop when the load function completes it's promise.
 * @param {Array<String>} [options.keep_only=[]] - An array of query parameter strings that you want to keep. If the array is empty, then no query parameters will be deleted
 */
const addQueryParam = (key, value, options = { goto: true, show_loading: "", keep_only: [] }) => {
  const goto = options.goto || true;
  const show_loading = options.show_loading || null;
  const keep_only = options.keep_only || [];

  if (browser) {
    const queryParams = new URLSearchParams(window.location.search);

    if (value === "" || value === null || value === undefined) {
      queryParams.delete(key);
    } else {
      queryParams.set(key, value);
    }

    history.replaceState(null, null, "?" + queryParams.toString());

    if (keep_only && keep_only.length > 0) {
      //remove all params that we do not want to keep
      const all_query_params = Object.fromEntries(queryParams.entries());

      const param_keys = Object.keys(all_query_params);

      if (param_keys) {
        param_keys.forEach((key) => {
          if (!keep_only.find((a) => a === key)) {
            queryParams.delete(key);
            history.replaceState(null, null, "?" + queryParams.toString());
          }
        });
      }
    }

    if (goto || show_loading) {
      if (show_loading) {
        showLoading(show_loading);

        setTimeout(() => {
          hideLoading(show_loading);
        }, 2000);
      }

      if (goto) {
        session.update((obj) => {
          obj.timestamp = Date.now();
          return obj;
        });
      }
    }
  }
};

/**
 * Will return an object with all of the query parameters for a url. Works on server and client
 * @param {Object} url - pass the svelte kit url object found on the load function or $page.url
 * @param {String} [key=null] - if you pass a key, you'll get the query param for that key
 * @returns {String|Object} - If you pass in a key, the return will be the value of the param. Without a key, an Object is returned for all of the query params
 */
const getQueryParam = (url, key = null) => {
  const query_params = url.searchParams;
  const all_query_params = Object.fromEntries(query_params.entries());
  const param_keys = Object.keys(all_query_params);

  if (key && param_keys && param_keys.length) {
    return all_query_params[key];
  }

  if (key) {
    return null;
  }

  if (!all_query_params) {
    return {};
  }

  return all_query_params;
};

/**
 * Deletes a url query param
 * @param {String} param - The name of the url param you want to delete
 */
const deleteQueryParam = (param) => {
  if (browser) {
    const queryParams = new URLSearchParams(window.location.search);
    const all_query_params = Object.fromEntries(queryParams.entries());

    const param_keys = Object.keys(all_query_params);

    if (param_keys) {
      param_keys.forEach((key) => {
        if (key === "search") {
          queryParams.delete(key);
          history.replaceState(null, null, "?" + queryParams.toString());
        }
      });
    }
  }
};

export { addQueryParam, getQueryParam, deleteQueryParam, addQueryParam as setQueryParam };
