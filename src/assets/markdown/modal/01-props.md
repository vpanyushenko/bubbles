# Modal

A Modal is basically a card that will sit on top of all content. It should only be used for actions that to user needs to take right now, generally for a delete confirmation or something or urgent importance.

Modals are set programmatically in Bubbles. Add the `Modal` component to your `__layout.svelte` file as shown [here](/page-wrapper) and then use the helper function `showModal` to bring up the modal. The `showModal` function will add the required components to a the `modalStore`. You can also programmatically hide the modal using the `hideModal` function.

The `modalStore` is a svelte store that controls the modal. You can edit it directly if you wish to manipulate the modal, but the `showModal` helper is designed to do that for you.

Generally, your modal will display a form or a message to the user with some buttons.

<br>

---

<br>

## Props

Since you are not using the `Modal` component directly and instead the `showModal` function, the props shown are for that.

<br>

**title** `string`<br>
The title of the modal

---

**options** `object` <br>
The rest of the modal options are optional, but it's obviously wise to include at least one.

---

options.**height** `number` <br>
The height in <code>vh</code> values that you want the modal to be.

---

options.**img** `string` <br>
The path to an image to display at the top of the modal. Good to use then there is not a lot of content in the modal.

---

options.**message** `string` <br>
The message you want the modal to display if any. Usually a description of what the modal is asking from them.

---

options.**form** `Array<Input>` <br>
This lets you pass a whole [form input](/form) into the modal if you want to collect data from the user in a modal.

---

options.**footer** `Array<Button>` <br>
You may want to add buttons to your modal that will be locked to the bottom of your modal. You can add an
array of buttons here. If you have also included a form, you can choose to have the buttons (like the submit button) in the form array, or you can add the submit button in the footer.
