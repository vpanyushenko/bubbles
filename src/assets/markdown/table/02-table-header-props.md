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
