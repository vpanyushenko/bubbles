---
width: 50
height: 100
---

Whenever you use an `href` property, Bubbles will automatically show and hide loading states for you. However when you use `onclick`, `onselect`, `onchange`, etc properties, you need to tell bubbles what needs to show loading animations.

Bubbles makes loading states imperative, meaning you control when to start and stop the loading animation. This is most commonly done because you are waiting for a promise, like when submitting a form.

Every element that the user can interact with can accept an `id` property. Use the `showLoading` function and pass in the `id` of the element that needs to show a loading state.

When your promise resolves, use `hideLoading` to stop the loading state by passing in the `id` for the item that's loading.

<br>

---

<br>

## Props

<br>

**id** `string`<br>
The ID of the component you wish to stop loading

---

<br>

## Returns

<br>

`void`<br>
Does not return anything.

---
