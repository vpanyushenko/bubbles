# TableHeader

This is the top of the `Table` that explains what each of the column are.

<br>

---

<br>

## Props

<br>

**cells** `array<Object>`<br>
Cells are an array of Objects that will add text to the top of the table. The number of cells should match the numbers for `TableCell` components that are in each `TableRow`.

---

cell[].**label** `string`<br>
This is the text the user will see. Leave this blank or pass in null to add a blank cell. Useful if you have an icon or image in one of your TableCell and don't want a header.

---

cell[].**align** `string`<br>
Normally cells are aligned to the left, but if you want to align the header to the right, pass in "right" or "end

---

cell[].**width** `integer`<br>
Set the width to `0` to hide this item

---

cell[].**mobile_width** `integer`<br>
Set to zero to hide this cell on mobile devices

<br>
<br>

## "Select All" Checkbox Props

In some tables, you'll want the user to select multiple items and do an action, like deleting all items. Each `TableRow` can have a checkbox component. Adding an option to the header will let you select and deselect all checkboxes in the same column, and adjust to UI of the `CardHeader` to display options.

<br>

---

cell[].**checkbox** `boolean`<br>
Set this value to true to display the checkbox in the header

---

cell[].**options** `array<Object>`<br>
An array that will contain the options the user can select. These options should be functions that apply to all selected items. To get all of the selected rows, make sure you have provided an `id` property to all rows, then import the [getSelectedTableRows](/get-selected-table-rows).

<details>
<summary>Show Details</summary>

|                                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------------- |
| option[].**label** `string`<br> The text the user sees for the option                                                                   |
| option[].**value** `string`<br> The value that will be added for the url query param                                                    |
| option[].**caption** `string`<br> More details to give about the option                                                                 |
| option[].**img** `string`<br> An image that will be displayed on the left of the text                                                   |
| option[].**icon** `string`<br> An icon to display on the right. Defaults to an arrow. You can remove this by setting this value to null |
| option[].**onselect** `function`<br> A function that can be run if this option is selected                                              |

</details><br>

---

<br>
<br>

## Table Sorting

At some point you'll want to sort the data in your table. There are two ways you can sort the data. First, you can sort the data in place, that means you are not refetching data from an API and the other route is to fetch the data from the API and have the server do the sorting. The sorting props let you do both. Refetching data will add query parameters to the url, which will trigger the load function to run. Make sure that you have destructured the `url` property in the load function.

<br>

---

cell[].**sort** `Object`<br>
Set this value to sort the table rows for the end user. The result is when the user clicks on the cell to sort, an event gets fired. If you are modifying the query params and refetching data, you don't need to do anything at this point. If you are sorting locally, you'll need to listen for the sort event dispatched to the header, and sort the data yourself. Bubbles has a built in utility function that can [sort](/sort) for you.

<details>
<summary>Show Details</summary>

|                                                                                                                                        |
| :------------------------------------------------------------------------------------------------------------------------------------- |
| cell.sort.**id** `string`<br> The prop name you want to search for. If the prop is nested, use dot notation like "hello.world"         |
| cell.sort.**order** `string`<br> The default order for the displayed arrow. Defaults to "ascending" but you can change to "descending" |
| cell.sort.**query** `boolean`<br> Set to true if you want the sort to add query params to refetch the API                              |
| cell.sort.**key** `string`<br> The key for the query param. Will default to the ID                                                     |
| cell.sort.**value** `string`<br> The value for the query param, will default to the `order`                                            |

<br>

```js
import { TableHeader, sort } from "bubbles-ui";

$: data = [] //This is the data for your table

<TableHeader
  on:sort={(event) => (data = sort(data, event.detail.sort_by, event.detail.order))} //Will sort the data locally without refetching
  cells={[
    { label: "Name", sort: { id: "name", query: true, key: "name" } }, //Will add a query param, with custom key
    { label: "Weight", sort: { id: "size.weight" } }, //The sort function will sort by numbers and find the value nested on obj.size.weight
  ]}
/>;
```

</details><br>
