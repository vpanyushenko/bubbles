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

<br>
<br>

**Below is a special use case if you are adding a checkbox to your header which will allow you to select to deselect all rows**.

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
