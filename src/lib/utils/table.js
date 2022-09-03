import { browser } from "$app/environment";
//import { pageStore } from "$lib/utils/stores";
import { pageStore } from "../utils/stores";

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
    pageStore.update((data) => {
      if (!data.table) {
        data.table = {};
      }

      data.table.selected_table_rows = 0;
      // data.table.checkbox_options = [];
      data.table.id = null;

      return data;
    });

    table.querySelectorAll(".row").forEach((row) => {
      row.querySelector(".checkbox").querySelector("input").checked = false;
    });
  }
};

const getTableRowID = (element) => {
  return element.closest(".js-bubbles-table-row")?.id ?? null;
};

export { getSelectedTableRows, deselectTableRows, getTableRowID };
