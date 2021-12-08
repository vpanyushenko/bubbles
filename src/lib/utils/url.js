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
 * @param {Array<String>} [options.keep_only=[]] - An array of query parameter strings that you want to keep. If the array is empty, then no query parameters will be deleted
 */
const addQueryParam = (key, value, options = { goto: true, show_loading: "", keep_only: [] }) => {
  const _options = {
    goto: !options.goto ? false : true,
    show_loading: options.show_loading ? options.show_loading : "",
    keep_only: options.keep_only ? options.keep_only : [],
  };

  if (browser) {
    const queryParams = new URLSearchParams(window.location.search);

    if (value === "" || value === null || value === undefined) {
      queryParams.delete(key);
    } else {
      queryParams.set(key, value);
    }

    history.replaceState(null, null, "?" + queryParams.toString());

    if (_options?.keep_only && _options.keep_only.length > 0) {
      //remove all params that we do not want to keep
      const all_query_params = Object.fromEntries(queryParams.entries());

      const param_keys = Object.keys(all_query_params);

      if (param_keys) {
        param_keys.forEach((key) => {
          if (!_options.keep_only.find((a) => a === key)) {
            queryParams.delete(key);
            history.replaceState(null, null, "?" + queryParams.toString());
          }
        });
      }
    }

    if (_options?.goto || _options?.show_loading) {
      if (options?.show_loading) {
        showLoading(_options.show_loading);
      }

      goto(window.location.href, { keepfocus: true, replaceState: true, noscroll: true }).then(() => {
        if (_options.show_loading) {
          hideLoading(_options.show_loading);
        }
      });
    }
  }
};
/**
 * Will return an object with all of the query parameters for a url. Works on server and client
 * @param {Object} page - pass the svelte kit page store
 * @param {String} [key=null] - if you pass a key, you'll get the query param for that key
 * @returns {String|Object} - If you pass in a key, the return will be the value of the param. Without a key, an Object is returned for all of the query params
 */
const getQueryParam = (page, key = null) => {
  const query_params = page.query;
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

export { addQueryParam, getQueryParam };
