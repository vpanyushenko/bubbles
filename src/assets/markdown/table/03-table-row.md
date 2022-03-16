# TableRow

<br>

---

<br>

## Props

<br>

**id** `string`<br>
You can set an ID for the row to reference it later. For example, set the id of the `TableRow` to each user you're displaying in your table so you can go to that user's details page if the table is clicked on.

---

**href** `string`<br>
The href value for the entire row. This is useful is you are using a Table for a settings menu, where you don't care where the user clicks. If you have a more complex cell, set the href on the cell, not the row.

---

**onclick** `function`<br>
You can run a function when the user clicks on the row. If you just want to take the user to a new page, use href because it will have better performance as the page with be prefetched.
