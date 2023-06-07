/**
 * Adds a url query param based on a key value pair
 * @param {String} key - The key for the url param you want to add
 * @param {String} value - The value for the key
 * @param {Object} options - Additional options
 * @param {Boolean} [options.invalidate=true] - If the data on the page should be invalidated
 * @param {String} [options.show_loading] - The ID of an element you want to shoe the animation for. The loading state will automatically stop when the load function completes it's promise.
 * @param {Array<String>} [options.keep_only=[]] - An array of query parameter strings that you want to keep. If the array is empty, then no query parameters will be deleted
 */
export function addQueryParam(key: string, value: string, options?: {
    invalidate?: boolean | undefined;
    show_loading?: string | undefined;
    keep_only?: string[] | undefined;
}): void;
/**
 * Will return an object with all of the query parameters for a url. Works on server and client
 * @param {Object} url - pass the svelte kit url object found on the load function or $page.url
 * @param {String} [key=null] - if you pass a key, you'll get the query param for that key
 * @returns {String|Object} - If you pass in a key, the return will be the value of the param. Without a key, an Object is returned for all of the query params
 */
export function getQueryParam(url: Object, key?: string | undefined): string | Object;
/**
 * Deletes a url query param
 * @param {String} param - The name of the url param you want to delete
 */
export function deleteQueryParam(param: string): void;
export { addQueryParam as setQueryParam };
