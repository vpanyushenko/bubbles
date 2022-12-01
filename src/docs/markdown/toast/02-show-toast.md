# showToast

The toast is used to notify a user that some action took place. It's shown above all content and will persist a page navigation.

The toasts can be dismissed by the user or will just gracefully fade away.

Because toast messages can be initiated from just about any page or component, Bubbles recommends adding the `ToastContainer` component on the `__layout.svelte` page, and adding new toasts using the `showToast` utility function.

<br>

---

<br>

## Props

<br>

**message** `string` <br>
The text that the user will see.

---

**color** `string` <code class="blue">primary-light</code><br>
The color toast that you want to show. By default, the toast is "error" color, but another good option is "success"
