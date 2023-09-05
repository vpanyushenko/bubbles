---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { validateInputs, showToast } from "bubbles-ui";

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
    },
    {
      type: "submit",
      label: "Submit Form",
      onsubmit: async (event) => {
        try {
          await validateInputs(toastExampleFormInputs);
        } catch (error) {
          showToast(error.message); //shows the toast message, defaults to an error
        }
      },
    },
  ];
</script>
```
