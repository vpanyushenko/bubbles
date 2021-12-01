---
component: modal
---

```js
import {Button, Modal, showModal, hideModal} from "bubbles-ui";

<Button
  label="Message Modal"
  wide={true}
  mb={true}
  onclick={() =>
    showModal("Message Modal", {
      message: "This is a message modal. Good for things like confirming an undoable action for the user",
      footer: [
        {
          label: "Close Modal",
          color: "gray-light",
          onclick: () => {
            hideModal();
          },
        },
      ],
    })}
/>

<Button
  label="Form Modal"
  wide={true}
  mb={true}
  onclick={() =>
    showModal("Form Modal", {
      message:
        "This is a form modal. It can have a message option too! Just add Form details just like you would with any other form. You can include the submit buttons in the form, which will cause them to not be locked at the bottom. Or you can include the submit buttons in the footer, which will cause the buttons to be sticky at the buttom of the modal.",
      form: [
        {
          type: "text",
          id: "name",
          label: "Name",
          error: "An error occured",
          vob: "true",
          validation: "required|string",
        },
        {
          type: "button",
          label: "Submit",
          onsubmit: () => {
            hideModal();
          },
        },
      ],
    })}
/>

//__layout.svelte
<Modal />
```
