---
width: 50
height: 100
---

The sort function is built to be used with sorting tables, but since all it really does is sort an array of objects, you can use it anywhere. It works for both string and number fields out of the box, and you don't need to specify which is which. If there is an error, it will gracefully return the unsorted data and log out the error to the console.

<br>

---

<br>

## Props

<br>

**array** `Array<Object>`<br>
This is the data that you pass in.

---

**sort_by** `string`<br>
This is the property on the object that you want to sort by. If the property is nested, you can use dot notation to access it like this "deeply.nested.prop"

---

**order** `string`<br>
Options are "descending" or "ascending"

---

<br>

## Returns

<br>

`Array<Object>`<br>
Returns the sorted array

---
