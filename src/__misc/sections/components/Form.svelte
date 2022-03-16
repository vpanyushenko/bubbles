<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./form.md";
  import CodeCard2 from "./form-stripe.md";
  import CodeCard3 from "./form-image.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Form from "$lib/components/form/Form.svelte";
  import FileForm from "$lib/components/form/FileForm.svelte";
  import { validateInputs, getFormData } from "$lib/utils/form";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { showToast } from "$lib/utils/toast";
  import fuzzySearch from "$lib/utils/fuzzy-search";

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
      type: "text",
      label: "Favorite U.S. State",
      error: "we can't find that one!",
      desc: "This is an example of typeahead to get results based on what the user is typing. It can be used on text and textarea inputs. Just add a function to the typeahead property that accepts the current value and responds with a Promise that array of options. Each option is the completed string. ",
      margin: true,
      validation: "required|string",
      vob: true,
      autocomplete: false,
      typeahead: (input) => {
        const states = [
          {
            name: "Alabama",
            abbreviation: "AL",
          },
          {
            name: "Alaska",
            abbreviation: "AK",
          },
          {
            name: "American Samoa",
            abbreviation: "AS",
          },
          {
            name: "Arizona",
            abbreviation: "AZ",
          },
          {
            name: "Arkansas",
            abbreviation: "AR",
          },
          {
            name: "California",
            abbreviation: "CA",
            caption: "West coast, best coast",
          },
          {
            name: "Colorado",
            abbreviation: "CO",
          },
          {
            name: "Connecticut",
            abbreviation: "CT",
          },
          {
            name: "Delaware",
            abbreviation: "DE",
          },
          {
            name: "District Of Columbia",
            abbreviation: "DC",
          },
          {
            name: "Federated States Of Micronesia",
            abbreviation: "FM",
          },
          {
            name: "Florida",
            abbreviation: "FL",
          },
          {
            name: "Georgia",
            abbreviation: "GA",
          },
          {
            name: "Guam",
            abbreviation: "GU",
          },
          {
            name: "Hawaii",
            abbreviation: "HI",
          },
          {
            name: "Idaho",
            abbreviation: "ID",
          },
          {
            name: "Illinois",
            abbreviation: "IL",
          },
          {
            name: "Indiana",
            abbreviation: "IN",
          },
          {
            name: "Iowa",
            abbreviation: "IA",
          },
          {
            name: "Kansas",
            abbreviation: "KS",
          },
          {
            name: "Kentucky",
            abbreviation: "KY",
          },
          {
            name: "Louisiana",
            abbreviation: "LA",
          },
          {
            name: "Maine",
            abbreviation: "ME",
          },
          {
            name: "Marshall Islands",
            abbreviation: "MH",
          },
          {
            name: "Maryland",
            abbreviation: "MD",
          },
          {
            name: "Massachusetts",
            abbreviation: "MA",
          },
          {
            name: "Michigan",
            abbreviation: "MI",
          },
          {
            name: "Minnesota",
            abbreviation: "MN",
          },
          {
            name: "Mississippi",
            abbreviation: "MS",
          },
          {
            name: "Missouri",
            abbreviation: "MO",
          },
          {
            name: "Montana",
            abbreviation: "MT",
          },
          {
            name: "Nebraska",
            abbreviation: "NE",
          },
          {
            name: "Nevada",
            abbreviation: "NV",
          },
          {
            name: "New Hampshire",
            abbreviation: "NH",
          },
          {
            name: "New Jersey",
            abbreviation: "NJ",
          },
          {
            name: "New Mexico",
            abbreviation: "NM",
          },
          {
            name: "New York",
            abbreviation: "NY",
            caption: "I ❤️ New York",
          },
          {
            name: "North Carolina",
            abbreviation: "NC",
          },
          {
            name: "North Dakota",
            abbreviation: "ND",
          },
          {
            name: "Northern Mariana Islands",
            abbreviation: "MP",
          },
          {
            name: "Ohio",
            abbreviation: "OH",
          },
          {
            name: "Oklahoma",
            abbreviation: "OK",
          },
          {
            name: "Oregon",
            abbreviation: "OR",
          },
          {
            name: "Palau",
            abbreviation: "PW",
          },
          {
            name: "Pennsylvania",
            abbreviation: "PA",
          },
          {
            name: "Puerto Rico",
            abbreviation: "PR",
          },
          {
            name: "Rhode Island",
            abbreviation: "RI",
          },
          {
            name: "South Carolina",
            abbreviation: "SC",
          },
          {
            name: "South Dakota",
            abbreviation: "SD",
          },
          {
            name: "Tennessee",
            abbreviation: "TN",
          },
          {
            name: "Texas",
            abbreviation: "TX",
          },
          {
            name: "Utah",
            abbreviation: "UT",
          },
          {
            name: "Vermont",
            abbreviation: "VT",
          },
          {
            name: "Virgin Islands",
            abbreviation: "VI",
          },
          {
            name: "Virginia",
            abbreviation: "VA",
          },
          {
            name: "Washington",
            abbreviation: "WA",
          },
          {
            name: "West Virginia",
            abbreviation: "WV",
          },
          {
            name: "Wisconsin",
            abbreviation: "WI",
          },
          {
            name: "Wyoming",
            abbreviation: "WY",
          },
        ];

        const array = input.split(",");
        const text = array[array.length - 1];
        array.pop();

        let entered_string = "";

        array.forEach((string) => {
          entered_string += `${string},`;
        });

        const fuse = new fuzzySearch(states, {
          shouldSort: false,
          keys: ["name", "abbreviation"],
          minMatchCharLength: 2,
          threshold: 0.4,
        });

        return Promise.resolve(
          fuse.search(text).map((obj) => {
            return {
              label: obj.item.name,
              value: entered_string ? `${entered_string} ${obj.item.name}` : obj.item.name,
              caption: obj.item?.caption,
            };
          })
        );
      },
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

  const stripeFormInputs = [
    {
      type: "select",
      id: "payment_method",
      label: "Select Payment Method",
      error: "Select a payment method",
      value: "token_1234",
      options: [
        {
          label: "Visa ···· 1234 (default)",
          value: "token_1234",
          caption: "Expires: 11/26",
        },
        {
          label: "Mastercard ···· 5678",
          value: "token_5678",
          caption: "Expires: 11/26",
        },
        {
          label: "Amex ···· 9012",
          value: "token_9012",
          caption: "Expires: 11/26",
        },
        "break",
        {
          label: "Add New Card",
          value: null,
        },
      ],
    },
    {
      type: "text",
      id: "cardholder_name",
      label: "Cardholder Name",
      error: "Cardholder name is required",
      validation: "string|required",
      hidden_unless: [{ id: "payment_method", value: null }],
    },
    {
      type: "stripe-card",
      id: "stripe_card_token",
      hidden_unless: [{ id: "payment_method", value: null }],
      stripe_key_name: "VITE_STRIPE_PUBLIC_KEY",
      stripe_token_values: {
        name: "cardholder_name",
      },
    },
    {
      type: "checkbox",
      id: "save_card",
      value: null,
      label: "Save Card Information",
      desc: "If you check this box, we'll save this card to yur profile and you'll see it as a dropdown in the future.",
      hidden_unless: [{ id: "payment_method", value: "" }],
    },
    {
      type: "button",
      label: "Purchase for $9.99",
      onsubmit: async (event) => {
        const button_id = event.currentTarget.id;

        showLoading(button_id);

        try {
          await validateInputs(stripeFormInputs);
          const data = await getFormData(stripeFormInputs);
          console.log(data);
        } catch (error) {
          showToast(error.message);
        } finally {
          hideLoading(button_id);
        }
      },
    },
  ];

  const fileForm = {
    button: {
      label: "Upload Image",
      color: "primary",
    },
    endpoint: "https://bubbles-ui/api/logos",
    fetch_options: {
      method: "POST",
      credentials: "include",
    },
    toast: true,
    //src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png",
  };
</script>

<Section id="form" title="Form">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Form" border={false} />
        <p>
          Your form data is probably a mix of some JS Objects / JSON and an initial fetch request to get existing data
          from your users. As a result, Bubbles uses an array of objects to create your form.
        </p>
        <p>
          Basically, to use forms, you'll pass in your objects indicating the type of input you want. One of your button
          inputs, whichever you choose to be your submit button, will have an `onsubmit` handler that will deal with
          your form submission.
        </p>
        <p>
          Bubbles provides two utility functions called <code>getFormData</code>, which will give you an
          <code>object</code> of your data and <code>validateInputs</code> which will validate the inputs based on the validation
          params that you supply to each of the inputs.
        </p>
        <p>
          All of the inputs that you provide to the form should have an <code>id</code> property. This will end up being
          the property name on the JSON object. If your <code>id</code> includes any periods in it like
          <code>profile.name</code>, the "name" will be nested under "profile".
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell>You can set an ID for the form, otherwise an unique ID will automatically be applied.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">inputs</span></TableCell>
            <TableCell
              >An array of input values that you want to add. See the individual articles for inputs like <code
                >Input</code
              >, <code>Select</code>, and <code>Button</code> to understand what kind of properties to add to each.</TableCell
            >
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">input.width</span></TableCell>
            <TableCell
              >You can add inputs next to each other instead of inline simply by passing the width as a percentage. If
              you wanted two inputs side by side, you would passing <code>50</code> as the width for both of them. If
              you wanted three inputs all in one row, you would pass in <code>33</code> as the width for all of the inputs.</TableCell
            >
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">input.hidden_if</span></TableCell>
            <TableCell>
              When used with a form, each <strong style="color: var(--success)">input</strong> has a special property
              called <code>hidden_if</code>, which contains logic for when to remove from the DOM, if
              <strong style="color: var(--error)">another input</strong>
              in this form has a specific value. <code>hidden_if</code> expects an array of objects, with each object
              providing an <code>id</code>, of the that should be referenced, and a
              <code>value</code> property, which is the value the
              <strong style="color: var(--error)">other input</strong>
              will have that will hide <strong style="color: var(--success)">this input</strong>.
              <br />
              <br />
              See the example below for more details. From a UX point of view, <code>hidden_if</code> is best used with
              Select, Radio, and Switch elements.
              <br />
              <br />
              <strong style="color: var(--primary)"
                >This property is still experimental and may change in a future release.</strong
              >
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">input.hidden_unless</span></TableCell>
            <TableCell
              >This works in the reverse way of <code>hidden_if</code>, when you want to hide
              <strong style="color: var(--success)">this input</strong>
              if the value(s) of <strong style="color: var(--error)">another input</strong> DO NOT equal something else.
              The ideal use case for this is when you have a <code>Select</code> with many options like payment methods,
              and want to show components to add new payment details ONLY IF (aka unless) the user selects the option to
              add a new payment method.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <CodeCard1 />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Demo" border={false} />
        <div>
          <Form inputs={formInputs} />
        </div>
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Stripe" border={false} />
        <p>
          There are many ways to collect payments. At Bubbles our preferred way to process payments is on the backend
          server instead of the front end. This gives us a lot more flexibility with things like the
          <code>application_fee_amount</code> property, which is a more common use case for dashboards and SaaS products.
        </p>
        <p>
          Therefore, the only thing that our <code>stripe-card</code> input does, is convert the user's credit card into
          the stripe token ID that you will send to your backend and finalize the transaction.
        </p>
        <p>
          The process for this is pretty simple. Like any bubbles <code>Form</code> component, you pass in the
          <code>array</code> of form inputs to the form component as a prop. In the <code>onsumbit</code> function of
          your button, you'll pass in the reference to your array of inputs to the <code>getFormData</code> utility you
          imported. Bubbles will automatically convert the card to the token, and the token will be part of the object
          returned. They key, as always, being the <code>id</code> you passed to that input.
        </p>
        <p>
          Any StripeJS dependencies will only load client side after everything else mounts, so there will be no
          performance penalties for using this component.
        </p>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          While this input shares some common properties with other inputs, it also has enough unique properties that
          it's worth reviewing them independently.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell>This is the key that the Stripe token will have in the final data object.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label for the input. Defaults to "Credit Card Information"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >A description you can add to the bottom of the input that supports rendering inline html strings.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell
              >The default error text. This is optional and will be overwritten by any Stripe specific error messages
              during validation</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell
              >The default error text. This is optional and will be overwritten by any Stripe specific error messages
              during validation</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">margin</span></TableCell>
            <TableCell>Adds margin to the input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">stripe_key_name</span></TableCell>
            <TableCell
              >To initialize Stripe, you'll need to pass in your <code>stripe_public_key</code>. This variable is safe
              to expose to front end code. Save it in your <code>.env</code> file, and pass in the name of the key. The
              default key Bubbles will check for is <code>"VITE_STRIPE_PUBLIC_KEY"</code>. Remember, only keys prefixed
              with VITE_ are exposed to the front end by default, unless you have made a change to this.
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <CodeCard2 />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Demo" border={false} />
        <div>
          <Form inputs={stripeFormInputs} />
        </div>
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Files" border={false} />
        <p>
          Generally your backend will accept images and files as FormData instead of JSON. The <code>FileForm</code> is a
          pre-made form that will allow the user to select an image and upload it to your backend as FormData
        </p>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          This component include the image input and a button so generally your properties are that of the
          `ImageInput``, `Button`, and options for the `fetch` function.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">button</span></TableCell>
            <TableCell
              >These are all of the the properties for the `Button`. You don't need to pass an `onclick` function as a
              param because the form will handle that for you
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">endpoint</span></TableCell>
            <TableCell>The endpoint that will accept the form data</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">fetch_options</span></TableCell>
            <TableCell
              >These are all of the typical options you would add to a fetch function. The only items you need to add
              here are the method and whatever authorization you are using.</TableCell
            >
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">src</span></TableCell>
            <TableCell>if there is already an image provided, add it to the source to show a preview</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">toast</span></TableCell>
            <TableCell>Boolean that will show the toast message from `res.message` or `error.message`</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">extensions</span></TableCell>
            <TableCell
              >An array of extensions that you want to use for the input. Defaults to [".png", ".jpg", ".jpeg", ".svg"]</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} />
      <CodeCard3 />
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Demo" border={false} />
        <div>
          <FileForm {...fileForm} />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>
