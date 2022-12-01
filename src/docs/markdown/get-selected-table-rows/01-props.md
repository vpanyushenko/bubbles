---
width: 50
height: 100
---

If you have selected multiple rows, you you will at some point want to accomplish an action against all of the rows, like deleting them all or updating them all.

Because each `TableRow` has an `id` property, you'll want to get an array of all of the selected rows. At any point, you can do this with the `getSelectedTableRows` utility functions.

It takes in one property, which is the id of the table from which would want to get the row IDs. If you only have one table on the page, `getSelectedTableRows` will work without an ID property because it will target the first table it finds. With multiple tables, you should provide the ID.

<br>

---

<br>

## Props

<br>

**id** `string`<br>
The ID of the table that you are targeting

---

<br>

## Returns

<br>

`Array`<br>
Returns a list of all IDs of the selected rows.

---
