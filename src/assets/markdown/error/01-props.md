# Error

To handle errors in Svelte, the load function at the top of each page can return an error status code (4xx and 5xx) and an error Object to describe the error. That will be passed to a page called `__error.svelte` which will display the error.

Bubbles makes styling the page easy by exporting a component called `Error` which will style the error page for you. Import it in your `__error.svelte` page and pass in the props from your load function.

<br>

---

<br>

## Props

<br>

**code** `number|string` <br>
The error code (4xx) or (5xx). If you don't provide a title or message, the error code will be used to generate a generic message.

---

**title** `string` <br>
This should describe the error code. For example: "Not Found" for a 404 message. You can leave this blank and the Error component will fill this in for you.

---

**message** `string` <br>
A message that you want to include for the user that will describe what happened to the end user.

---

**img** `string` <br>
An image you want to include in your error page.

---

**button** `object<Button>` <br>
The default action sends the user back to the index page but you can override this by passing in props to your own [Button](/button) component.

---
