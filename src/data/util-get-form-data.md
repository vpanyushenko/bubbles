---
component: get-form-data
---

```js
import { validateInputs, showToast, getFormData } from "bubbles-ui";

const formInputs = [
  {
    type: "text",
    id: "name.first", //the id that will be shown if there is an error
    label: "Your First Name",
    value: "Jamie",
    desc: "You'll be able to change this name later",
    error: "A name is required",
    validation: "string|required", //the validation requirements that will be run
    validate_on_blur: true,
    vob: true,
  },
  {
    type: "text",
    id: "name.last", //the id that will be shown if there is an error
    label: "Your Last Name",
    value: "Jones",
    desc: "You'll be able to change this name later",
    error: "A name is required",
    validation: "string|required", //the validation requirements that will be run
    validate_on_blur: true,
    vob: true,
  },
  {
    type: "number",
    id: "favorite_number", //the id that will be shown if there is an error
    label: "Your favorite number",
    value: 5,
    desc: "Pick any number!",
    error: "Please select a number",
    validation: "numeric|required", //the validation requirements that will be run
    validate_on_blur: true,
    vob: true,
  },
  {
    type: "submit",
    label: "Submit Form",
    onsubmit: (event) => {
      //if there are any errors, calling validateInputs will automatically show error states for
      //all components that have failed validation
      const errors = validateInputs(formInputs).errors;

      if (errors.length) {
        showToast("Please fill in all required inputs", "error");
        return;
      }

      const data = getFormData(formInputs);
      // {
      //   name: {
      //     first: "Jamie",
      //     last: "Jones"
      //   }
      //   favorite_number: 5
      // }
    },
  },
];
```
