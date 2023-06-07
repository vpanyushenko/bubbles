/**
 * Returns an array of all selected table rows IDs
 * @param {String} [table_id=null] - The ID of the table you want the get rows for. Defaults to the first table
 */
export function getSelectedTableRows(table_id?: string | undefined): any[];
/**
 * Makes all checkboxes unselected on a table
 * @param {String} [table_id=null] - The ID of the table you want the get rows for. Defaults to the first table
 */
export function deselectTableRows(table_id?: string | undefined): void;
export function getTableRowID(element: any): any;
