---
width: 50
height: 100
type: code
---

```svelte
<script>
  // Add the modal component to your root layout component
  //__layout.svelte
  //<Modal />;

  import { Button, Modal, showModal, hideModal } from "bubbles-ui";
</script>

<Button
  label="Message Modal"
  wide={true}
  mb={true}
  onclick={() =>
    showModal("Message Modal", {
      img: "/favicon.png",
      message: "This is a message modal. Good for things like confirming an un-doable action for the user",
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
