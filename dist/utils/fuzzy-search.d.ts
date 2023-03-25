export default search;
export type SearchOptions = any;
/**
 * @typedef SearchOptions
 * @type
 * @prop {Boolean} [sort=true] - If the final list should be sorted
 * @prop {?Array<String>} keys - If you are passing an object, enter the keys you want to search by
 */
/**
 * Fuzzy searches an array
 * @param {String} query - The search query
 * @param {Array<Any>} dataset - A list of the things you want to search for
 * @param {SearchOptions} options
 */
declare function search(query: string, dataset: Array<Any>, options?: SearchOptions): any;
