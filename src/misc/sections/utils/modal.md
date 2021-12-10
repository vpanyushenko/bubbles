---
component: modal
---

```svelte
<script>
  //__layout.svelte
  // The modal component is important and places in the root __layout.svelte component
  // <Modal />;

  import { Button, Modal, showModal, hideModal } from "bubbles-ui";
</script>

<Button
  label="Message Modal"
  wide={true}
  mb={true}
  onclick={() =>
    showModal("Message Modal", {
      message: "This is a message modal. Good for things like confirming a destructive action for the user",
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
        "This is a form modal. It can have a message option too! Just add Form details just like you would with any other form. You can include the submit buttons in the form, which will cause them to not be locked at the bottom. Or you can include the submit buttons in the footer, which will cause the buttons to be sticky at the bottom of the modal.",
      form: [
        {
          type: "text",
          id: "name",
          label: "Name",
          error: "An error occurred",
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
```
