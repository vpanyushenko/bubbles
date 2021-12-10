---
component: toast
---

```svelte
<script>
  //__layout.svelte
  //
  //import { ToastContainer } from "bubbles-ui";
  //
  //<ToastContainer />

  //index.svelte or whatever page you're on

  import { Form, showToast, validateInputs, getFormData } from "bubbles-ui";

  const toastExampleFormInputs = [
    {
      type: "radio",
      id: "toast_example_color",
      value: "success",
      label: "Select a toast color",
      options: [
        {
          label: "primary",
          value: "primary",
        },
        {
          label: "secondary",
          value: "secondary",
        },
        {
          label: "error",
          value: "error",
        },
        {
          label: "warning",
          value: "warning",
        },
        {
          label: "success",
          value: "success",
        },
        {
          label: "info",
          value: "info",
        },
        {
          label: "gray",
          value: "gray",
        },
        {
          label: "dark",
          value: "dark",
        },
      ],
    },
    {
      type: "text",
      id: "toast_example_message",
      label: "Toast Message",
      value: "Your settings were successfully updated!",
      error: "Add a message that is at least 3 characters",
      validation: "string|required|min:3",
      vob: true,
    },
    {
      type: "submit",
      label: "Show Toast",
      onsubmit: (event) => {
        //you can also use the onclick, if it's on a submit button Bubbles will look for the onsubmit event
        const errors = validateInputs(toastExampleFormInputs).errors; //check for errors

        if (errors.length) {
          showToast("Please fill in all required inputs", "error");
          return;
        }

        const data = getFormData(toastExampleFormInputs);

        showToast(data.toast_example_message, data.toast_example_color);
      },
    },
  ];
</script>

<Form inputs={toastExampleFormInputs} />
```
