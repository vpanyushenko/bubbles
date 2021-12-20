---
component: validate-inputs
---

```svelte
<script>
  import { validateInputs } from "bubbles-ui";

  const formInputs = [
    {
      type: "text",
      id: "name", //the id that will be shown if there is an error
      label: "Your Name",
      value: null,
      desc: "You'll be able to change this name later",
      error: "A name is required",
      validation: "string|required|min:3", //the validation requirements that will be run
      validate_on_blur: true,
      vob: true,
    },
    {
      type: "submit",
      label: "Submit Form",
      onsubmit: async (event) => {
        try {
          //if there are any errors, calling validateInputs will automatically show error states for
          //all components that have failed validation

          await validateInputs(toastExampleFormInputs); //if any inputs fail validation, the promise will be rejected
        } catch (error) {
          showToast(error.message);
        }
      },
    },
  ];
</script>
```
