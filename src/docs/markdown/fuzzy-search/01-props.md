---
width: 50
height: 100
---

This let's you search an array of strings or objects and get matches to data you need. This is best used inside of the `typeahead` function found on `Input` and `IconButton`.

<br>

---

<br>

## Props

<br>

**query** `string`<br>
The search query that you are using. When used the the typeahead component, the query will be passed in as the first argument in the function.

---

<br>

**dataset** `Array<String|Object>`<br>
This is the data that you want to search through. This can be strings, or an object. You can provide options for the object properties you want to search through.

---

<br>

**options** `Object`<br>
This is the data that you want to search through. This can be strings, or an object. You can provide options for the object properties you want to search through.

---

<br>

**options?.sort** `boolean`<br>
Defaults to `false`. If you want the results sorted from best match to worst match.

---

**options?.keys** `Array<String>`<br>
If you are passing an object, enter the keys you want to search by

---

<br>

## Returns

<br>

`Array<String|Object>`<br>
Returns a filtered and/or sorted version of the dataset.

---
