import { browser } from "$app/env";

/**
 * Returns an array of all selected table rows IDs
 * @param {String} [table_id=null] - The ID of the table you want the get rows for. Defaults to the first table
 */
const getSelectedTableRows = (table_id = null) => {
  const ids = [];

  let table = table_id ? document.getElementById(table_id) : document.querySelector(".js-bubbles-table");

  if (browser && table) {
    table.querySelectorAll(".js-bubbles-table-row").forEach((row) => {
      if (row.querySelector(".checkbox").querySelector("input").checked) {
        ids.push(row.id);
      }
    });
  }

  return ids;
};

/**
 * Makes all checkboxes unselected on a table
 * @param {String} [table_id=null] - The ID of the table you want the get rows for. Defaults to the first table
 */
const deselectTableRows = (table_id = null) => {
  let table = table_id ? document.getElementById(table_id) : document.querySelector(".js-bubbles-table");

  if (browser && table) {
    table.querySelectorAll(".row").forEach((row) => {
      row.querySelector(".checkbox").querySelector("input").checked = false;
    });
  }
};

export { getSelectedTableRows, deselectTableRows };
