---
component: hide-loading
---

```js
import { validateInputs, showToast, getFormData, showLoading, hideLoading } from "bubbles-ui";

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

      //the onsubmit and onclick function on buttons will give you the event param
      //if you want to toggle the loading state on your button while doing a networking request
      //just use showLoading() and pass in the id
      //An id will automatically be assigned to the button for you

      const button_id = event.currentTarget.id;
      showLoading(button_id);

      fetch("/api/your-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //if using ssr
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          //handle your api response

          showToast("Your account was successfully updated", "success");
          hideLoading(button_id);
        })
        .catch((err) => {
          showToast("Something went wrong, please try again", "error");
          hideLoading(button_id);
        });
    },
  },
];
```
