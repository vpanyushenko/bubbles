<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import { Modal } from "$lib/index";

  import Button from "$lib/components/button/Button.svelte";
  import { showModal, hideModal } from "$lib/utils/modal";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { getFormData, validateInputs } from "$lib/utils/form";
  import { showToast } from "$lib/utils/toast";

  let show_modal = false;

  const form = [
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
      id: "role-form-example",
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
      type: "select-number", //This is a special type of select in case you need to select only from number elements. Use this if all values in a select need to be numbers (Floats or Integers)
      id: "number-form-example",
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
      id: "favorite",
      type: "select",
      label: "Favorite U.S. State",
      error: "we can't find that one!",
      desc: "This is an example of typeahead to get results based on what the user is typing. It can be used on text and textarea inputs. Just add a function to the typeahead property that accepts the current value and responds with a Promise that array of options. Each option is the completed string. ",
      margin: true,
      validation: "required|string",
      vob: true,
      autocomplete: false,
      options: [
        {
          label: "Alabama",
          value: "AL",
        },
        {
          label: "Alaska",
          value: "AK",
        },
        {
          label: "American Samoa",
          value: "AS",
        },
        {
          label: "Arizona",
          value: "AZ",
        },
        {
          label: "Arkansas",
          value: "AR",
        },
        {
          label: "California",
          value: "CA",
          caption: "West coast, best coast",
        },
        {
          label: "Colorado",
          value: "CO",
        },
        {
          label: "Connecticut",
          value: "CT",
        },
        {
          label: "Delaware",
          value: "DE",
        },
        {
          label: "District Of Columbia",
          value: "DC",
        },
        {
          label: "Federated States Of Micronesia",
          value: "FM",
        },
        {
          label: "Florida",
          value: "FL",
        },
        {
          label: "Georgia",
          value: "GA",
        },
        {
          label: "Guam",
          value: "GU",
        },
        {
          label: "Hawaii",
          value: "HI",
        },
        {
          label: "Idaho",
          value: "ID",
        },
        {
          label: "Illinois",
          value: "IL",
        },
        {
          label: "Indiana",
          value: "IN",
        },
        {
          label: "Iowa",
          value: "IA",
        },
        {
          label: "Kansas",
          value: "KS",
        },
        {
          label: "Kentucky",
          value: "KY",
        },
        {
          label: "Louisiana",
          value: "LA",
        },
        {
          label: "Maine",
          value: "ME",
        },
        {
          label: "Marshall Islands",
          value: "MH",
        },
        {
          label: "Maryland",
          value: "MD",
        },
        {
          label: "Massachusetts",
          value: "MA",
        },
        {
          label: "Michigan",
          value: "MI",
        },
        {
          label: "Minnesota",
          value: "MN",
        },
        {
          label: "Mississippi",
          value: "MS",
        },
        {
          label: "Missouri",
          value: "MO",
        },
        {
          label: "Montana",
          value: "MT",
        },
        {
          label: "Nebraska",
          value: "NE",
        },
        {
          label: "Nevada",
          value: "NV",
        },
        {
          label: "New Hampshire",
          value: "NH",
        },
        {
          label: "New Jersey",
          value: "NJ",
        },
        {
          label: "New Mexico",
          value: "NM",
        },
        {
          label: "New York",
          value: "NY",
          caption: "I ❤️ New York",
        },
        {
          label: "North Carolina",
          value: "NC",
        },
        {
          label: "North Dakota",
          value: "ND",
        },
        {
          label: "Northern Mariana Islands",
          value: "MP",
        },
        {
          label: "Ohio",
          value: "OH",
        },
        {
          label: "Oklahoma",
          value: "OK",
        },
        {
          label: "Oregon",
          value: "OR",
        },
        {
          label: "Palau",
          value: "PW",
        },
        {
          label: "Pennsylvania",
          value: "PA",
        },
        {
          label: "Puerto Rico",
          value: "PR",
        },
        {
          label: "Rhode Island",
          value: "RI",
        },
        {
          label: "South Carolina",
          value: "SC",
        },
        {
          label: "South Dakota",
          value: "SD",
        },
        {
          label: "Tennessee",
          value: "TN",
        },
        {
          label: "Texas",
          value: "TX",
        },
        {
          label: "Utah",
          value: "UT",
        },
        {
          label: "Vermont",
          value: "VT",
        },
        {
          label: "Virgin Islands",
          value: "VI",
        },
        {
          label: "Virginia",
          value: "VA",
        },
        {
          label: "Washington",
          value: "WA",
        },
        {
          label: "West Virginia",
          value: "WV",
        },
        {
          label: "Wisconsin",
          value: "WI",
        },
        {
          label: "Wyoming",
          value: "WY",
        },
      ],
    },
    {
      type: "switch", //will render a switch component
      id: "preferences.email",
      label: "Email Updates",
      value: false, //value should be a boolean
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
      error: "A name is required",
      validation: "string|required|min:3",
      vob: true,
      hidden_if: [{ id: "preferences.email", value: false }],
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
      onsubmit: async (event) => {
        //the onsubmit and onclick function on buttons, will give you the event param
        //if you want to toggle the loading state on your button while doing a networking request
        //just use showLoading() and pass in the id
        //An id will automatically be assigned to the button for you

        const button_id = event.currentTarget.id;
        showLoading(button_id);

        try {
          await validateInputs(form);
          const data = await getFormData(form);
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
  <CardHeader title="Modal Demos" border={false} />

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
        // height: 100,
        form: [
          {
            type: "text",
            id: "name",
            label: "Name",
            error: "An error occurred",
            vob: "true",
            validation: "required|string",
          },
        ],

        footer: [
          {
            type: "submit",
            label: "Submit",
            onsubmit: () => {
              hideModal();
            },
          },
        ],
      })}
  />
  <Button
    label="Long Form Modal"
    wide={true}
    mb={true}
    onclick={() =>
      showModal("Long Form Modal", {
        message:
          "This is a form modal. It can have a message option too! Just add Form details just like you would with any other form. You can include the submit buttons in the form, which will cause them to not be locked at the bottom. Or you can include the submit buttons in the footer, which will cause the buttons to be sticky at the bottom of the modal.",
        form: form,
      })}
  />

  <Button label="User Controlled Modal" onclick={() => (show_modal = true)} />
</Card>

{#if show_modal}
  <Modal title="Custom Modal" hideModal={() => (show_modal = false)} hide_on_overlay_click={false}>
    <h2>You can slot whatever content you want in here</h2>

    <footer slot="footer">
      <Button label="Footer Button" />
    </footer>
  </Modal>
{/if}
