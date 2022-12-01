---
width: 50
height: 100
---

The toast is used to notify a user that some action took place. It's shown above all content and will persist a page navigation.

The toasts can be dismissed by the user or will just gracefully fade away.

Because toast messages can be initiated from just about any page or component, Bubbles recommends adding the `ToastContainer` component on the `__layout.svelte` page, and adding new toasts using the `showToast` utility function.

The function will take two properties, the message you want to display and the color of the toast.

<br>

---

<br>

## Props

<br>

**message** `string` <code class="blue">An error occurred</code><br>
The messages you want the toast to display

---

**color** `string` <code class="blue">error</code><br>
The color of the message you want to show. For best results, use "success" and "error".

---

<br>

## Returns

<br>

`void`<br>
Does not return anything.

---
