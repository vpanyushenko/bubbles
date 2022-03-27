import Search from "$lib/utils/fuze";

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
const search = (query, dataset, options = { sort: true, keys: [] }) => {
  const s = new Search(dataset, {
    shouldSort: options?.sort || true,
    keys: options?.keys || [],
    minMatchCharLength: 2,
    threshold: 0.4,
  });

  return s.search(query).map((obj) => obj.item);
};

export default search;
