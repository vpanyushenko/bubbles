<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Button from "$lib/components/button/Button.svelte";

  import Form from "$lib/components/form/Form.svelte";
  import FileForm from "$lib/components/form/FileForm.svelte";
  import { validateInputs, getFormData } from "$lib/utils/form";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { showToast } from "$lib/utils/toast";
  import fuzzySearch from "$lib/utils/fuzzy-search";

  const formInputs = [
    {
      type: "text",
      id: "name",
      label: "Your Name",
      value: null,
      desc: "You'll be able to change this name later",
      error: "A name is required",
      validation: "string|required|min:3",
      validate_on_blur: true,
      vob: true,
    },
    {
      type: "number", //Will ensure that getFormData will return this as a number
      id: "age",
      label: "Age",
      value: null,
      desc: null,
      error: "You must be at least 13 years old",
      validation: "numeric|required|min:13",
      bounds: [0, 120], //Set the min and max values for this input. If you only want the min or max, you can do something like: [0, null]
    },
    {
      type: "switch",
      id: "preferences.email",
      label: "Email Updates",
      value: true,
      desc: "Let us know if you want to receive email updates",
      disabled: false,
      error: "An error occurred",
      validation: "accepted", //best UX is to not make switches mandatory, use a checkbox instead if you need
    },
    {
      type: "email",
      id: "email_required_id",
      label: "Your Email",
      value: null,
      desc: "You'll be able to change this name later",
      error: "Email is required",
      validation: "email|required|min:3",
      vob: true,
      hidden_if: [{ id: "preferences.email", value: false }],
    },
    {
      type: "date",
      id: "dob",
      label: "Date Of Birth",
      value: null,
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
      value: null,
      desc: null,
      error: "Your role is required",
      validation: "required", //since you're adding the options, you can just set it to required
      search: false,
      options: [
        {
          label: "Owner",
          caption: "This is the highest position",
          value: "owner",
        },
        "break",
        {
          label: "Collaborator",
          value: "collaborator",
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
      value: null,
      desc: null,
      error: "This is required",
      validation: "required",
      search: false,
      options: [
        {
          label: "One",
          value: 0,
        },
        {
          label: "Two",
          value: 1,
        },
        {
          label: "Three",
          value: 3,
        },
      ],
    },

    {
      type: "radio",
      id: "radio",
      label: "Select your bread",
      value: "plain",
      desc: "Let us know what type of bread you want",
      error: "Select a type of bread",
      validation: "required",
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
      type: "checkbox-group",
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
      type: "checkbox",
      id: "terms",
      label: "Terms and conditions",
      value: false,
      desc: "By submitting this form you agree to our terms. <a href='https://google.com' target='_blank'>View Terms</a>.",
      error: "You must accept the terms and conditions",
      validation: "required|accepted",
    },
    {
      type: "submit", //The form must have a submit button
      label: "Submit Form", //The label for the submit button,
      onsubmit: async (event) => {
        //the onsubmit and onclick function on buttons, will give you the event param
        //if you want to toggle the loading state on your button while doing a networking request
        //just use showLoading() and pass in the id
        //An id will automatically be assigned to the button for you

        const button_id = event.currentTarget.id;
        showLoading(button_id);

        try {
          await validateInputs(formInputs);
          const data = await getFormData(formInputs);
          console.log(data);
        } catch (error) {
          showToast(error.message);
        } finally {
          setTimeout(() => {
            hideLoading(button_id);
          }, 2000);
        }
      },
    },
  ];
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <Form inputs={formInputs} />
</Card>
