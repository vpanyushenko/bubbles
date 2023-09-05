/**
 * @prop {Array<Object>} array - The array of objects that are being passed into the Table.
 * @prop {String} sort_by - The string you want to sort by. If you pass in a string with periods, it will look for a nested object
 * @prop {String} order - Ether "ascending" or "descending"
 * @returns {Array<Object>} returns the sorted array
 */
export default (array, sort_by, order) => {
  let numeric = false;

  //if a string with periods was passed in, we need to get the data from a nested object
  function getValue(object, string) {
    return string
      .split(".")
      .filter(Boolean)
      .reduce((prev, curr) => {
        return prev ? prev[curr] : null;
      }, object || self);
  }

  if (!sort_by) {
    console.error("Missing sort_by property");
    return array;
  }

  if (getValue(array[0], sort_by) === undefined || getValue(array[1], sort_by) === undefined) {
    console.error(
      `The property ${sort_by} was not found on at least one of the first two objects of your array. The original data was returned`
    );
    return array;
  }

  if (!isNaN(getValue(array[0], sort_by)) && !isNaN(getValue(array[1], sort_by))) {
    numeric = true;
  }

  if (order === "descending" || order === "desc") {
    return array.sort((a, b) =>
      getValue(b, sort_by).toString().localeCompare(getValue(a, sort_by).toString(), undefined, { numeric })
    );
  } else {
    return array.sort((a, b) =>
      getValue(a, sort_by).toString().localeCompare(getValue(b, sort_by).toString(), undefined, { numeric })
    );
  }
};
