---
width: 50
height: 100
---

This feature is still in development

<br>

When loading data during the Svelte Kit `load` function, you can quickly fetch data using the bubbles `fetchData` function.

`fetchData` still used fetch behind the scenes, but does error handling and authentication. All data will be returned in a key called `data` but you can customize this behavior. See the examples for more details.

By default, you'll want to pass all of the props from the svelte kit load function into the options: `url`, `params`, `fetch`, `session`, `stuff`. You can also use it outside of the loading function, you just need to pass in fetch.

<br>

---

<br>

## Props

<br>

**endpoint** `String|Array<{endpoint: String, key: String}>`<br>
This is the endpoint that you want to get data from. If you have specified an API URI in vite using the `VITE_API_URL`, you can just pass in the endpoint.
<br>
Otherwise, pass in the whole string. If you need to fetch multiple endpoints, you can pass in an array of objects, with the `endpoint` property and a `key` property which you'll reference in the email script tag.

---

<br>

**options** `Object`<br>
Options you can pass to this function

---

<br>

**options.url** `Object`<br>
From svelte kit load

---

**options.params** `Object`<br>
From svelte kit load

---

**options.fetch** `Function`<br>
From svelte kit load

---

**options.session** `Object`<br>
From svelte kit load

---

**options.stuff** `Object`<br>
From svelte kit load

---

**options.debug** `Boolean`<br>
Will add additional debug items to the page

---

<br>

## Returns

<br>

`Promise<{data: Any, pagination: ?Object, status: Number}>`<br>
Will return the data from the response or and error with a status code that will redirect to the svelte `__error.svelte` page.

---
