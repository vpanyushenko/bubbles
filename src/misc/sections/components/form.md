---
component: form
---

```svelte
<script>
  import { Form } from "bubbles-ui";
  import { validateInputs, getFormData, showToast, showLoading, hideLoading } from "bubbles-ui";

  const formInputs = [
    {
      type: "text", //will render a text input field. Other options are: "email" and "password" which are all basically the same thing
      id: "name", //the id will be the key when you call the getFormData function. If you add a "." in the id, it will return the item as a nested object. For example, if your `id` value is `name.last`, the getFormData function will return that as {name: {last: ""}}
      label: "Your Name", //The label is what we'll initially show for the input, it should explain what is required. Keep this short like "First Name"
      value: null, //You can add a value to the input
      desc: "You'll be able to change this name later", //This will add text below the input to explain in more detail what is needed from the user. Optional.
      error: "A name is required", //this is the text that will appear if this input fails validation
      validation: "string|required|min:3", // See the validation section for more details, but this adds what validation you need. In This case, it must be a string, it's required, with a min length of 3
      validate_on_blur: true, //defaults to true. Will run validation when focus is lost from the element
      vob: true, //defaults to true. Alias validation_on_blur just less to type. You only need to set one.
    },
    {
      type: "number", //Will ensure that getFormData will return this as a number
      id: "age",
      label: "Age",
      value: null, //You can add a value to the input
      desc: null,
      error: "You must be at least 13 years old",
      validation: "numeric|required|min:13",
      bounds: [0, 120], //Set the min and max values for this input. If you only want the min or max, you can do something like: [0, null]
    },
    {
      type: "date",
      id: "dob",
      label: "Date Of Birth",
      value: null, //You can add a value to the input
      desc: null,
      error: "Add your Date of Birth",
      validation: "required|date", //date validator is built in
    },
    {
      type: "textarea", //the textarea / text field input
      id: "description",
      label: "Your Address",
      value: "",
      desc: "Type your address",
      rows: 8, //specify how many rows you want. Defaults to 5
      validation: "required",
    },
    {
      type: "select",
      id: "role",
      label: "Select Your Role",
      value: null, //You can add a value to the input
      desc: null,
      error: "Your role is required",
      validation: "required", //since you're adding the options, you can just set it to required
      search: false, //By default, if your select has more than 5 options, it will turn on fuzzy search unless you explicitly turn it off
      //an array of options for your input
      options: [
        {
          label: "Owner", //The label is the main option the user is picking,
          caption: "This is the highest position", //This is optional to add more context to the option,
          value: "owner", //This is the actual value the user is selecting
        },
        "break", //if you pass a string that says break, Bubbles will add a line break between these options for you
        {
          label: "Collaborator", //The label is the main option the user is picking,
          value: "collaborator", //This is the actual value the user is selecting
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    {
      type: "select-number", //This is a special type of select in case you need to select only from number elements. Use this if all values in a select need to be numbers (Floats or integers)
      id: "number",
      label: "Select Your Number",
      value: null, //You can add a value to the input
      desc: null,
      error: "This is required",
      validation: "required", //since you're adding the options, you can just set it to required
      search: false, //By default, if your select has more than 5 options, it will turn on fuzzy search unless you explicitly turn it off
      //an array of options for your input
      options: [
        {
          label: "One", //The label is the main option the user is picking,
          value: 0, //This is the actual value the user is selecting
        },
        {
          label: "Two", //The label is the main option the user is picking,
          value: 1, //This is the actual value the user is selecting
        },
        {
          label: "Three",
          value: 3,
        },
      ],
    },
    {
      type: "switch", //will render a switch component
      id: "preferences.email",
      label: "Email Updates",
      value: true, //value should be a boolean
      desc: "Let us know if you want to receive email updates",
      disabled: false,
      error: "An error occurred",
      validation: "accepted", //best UX is to not make switches mandatory, use a checkbox instead if you need
    },
    {
      type: "radio", //a group of radio buttons
      id: "radio",
      label: "Select your bread",
      value: "plain",
      desc: "Let us know what type of bread you want",
      error: "Select a type of bread",
      validation: "required", //if you set a default value, one will always be selected
      options: [
        {
          label: "Plain",
          value: "plain",
        },
        {
          label: "Whole Wheat",
          value: "whole_wheat",
        },
        {
          label: "Spinach",
          value: "spinach",
        },
      ],
    },
    {
      type: "checkbox-group", //This will give a group of checkboxes, here the user can select multiple options
      id: "toppings",
      label: "Select Your Toppings",
      value: [], //Will need an array because you can select multiple
      desc: "Select as many toppings as you'd like",
      error: "Something went wrong",
      validation: null,
      options: [
        {
          label: "Beans",
          value: "beans",
        },
        {
          label: "Lettuce",
          value: "lettuce",
        },
        {
          label: "Tomato Sauce",
          value: "tomato_sauce",
        },
      ],
    },
    {
      type: "checkbox", //a single checkbox, like for accepting terms and conditions
      id: "terms",
      label: "Terms and conditions",
      value: false, //You can add a value to the input
      desc: "By submitting this form you agree to our terms. <a href='https://google.com' target='_blank'>View Terms</a>.", //you can add html into the description
      error: "You must accept the terms and conditions",
      validation: "required|accepted",
    },
    {
      type: "submit", //The form must have a submit button
      label: "Submit Form", //The label for the submit button,
      onsubmit: (event) => {
        //you can also use the onclick, if it's on a submit button Bubbles will look for the onsubmit event

        const errors = validateInputs(formInputs).errors; //check for errors

        if (errors.length) {
          showToast("Please fill in all required inputs", "error");
          return;
        }

        const data = getFormData(formInputs);

        //the onsubmit and onclick function on buttons, will give you the event param
        //if you want to toggle the loading state on your button while doing a networking request
        //just use showLoading() and pass in the id
        //An id will automatically be assigned to the button for you

        const button_id = event.currentTarget.id;
        showLoading(button_id);

        alert(JSON.stringify(data));

        setTimeout(() => {
          hideLoading(button_id);
        }, 2000);
      },
    },
  ];
</script>

<Form inputs={formInputs} />
```
