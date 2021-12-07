<script context="module">
  import { importMarkdown } from "$misc/read-markdown";

  export async function load({ page, fetch, session, stuff }) {
    const articles = importMarkdown();

    //initially there isn't a query param in the url so we can set the limit to whatever the default value of the pagination will be
    const limit = page.query.get("limit") ? page.query.get("limit") : 10;

    //same process with the page, since if the page is undefined the user is on the first one
    const _page = page.query.get("page") ? Number(page.query.get("page")) : 1;

    //this api needs an offset number we we can calc it using the page and limit
    const offset = Number(limit) * (_page - 1);

    const pagination = {
      limit: Number(limit),
      page: _page,
      offset: Number(page.query.get("limit")) * (Number(page.query.get("page")) - 1),
      count: null,
      first_last_arrow: true,
    };

    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // pagination.has_more = res.next ? true : false;
        pagination.count = res.count;

        const pokemon = res.results.map((poke) => {
          return fetch(poke.url)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              return res;
            });
        });

        return Promise.all(pokemon);
      })
      .then((pokemon) => {
        return {
          props: {
            data: articles,
            pokemon: pokemon,
            pagination: pagination,
          },
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }
</script>

<script>
  import snarkdown from "snarkdown";
  import { inview } from "svelte-inview";

  import Section from "$misc/components/section.svelte";

  import Row from "$lib/layouts/Row.svelte";
  import Center from "$lib/layouts/Center.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";

  import Button from "$lib/components/button/Button.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import Checkbox from "$lib/components/checkbox/Checkbox.svelte";
  import LabeledCheckbox from "$lib/components/checkbox/LabeledCheckbox.svelte";
  import CheckboxGroup from "$lib/components/checkbox/CheckboxGroup.svelte";
  import Divider from "$lib/components/divider/Divider.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import Input from "$lib/components/input/Input.svelte";
  import List from "$lib/components/list/List.svelte";
  import RadioGroup from "$lib/components/radio/RadioGroup.svelte";
  import SegmentedController from "$lib/components/segmented-controller/SegmentedController.svelte";
  import Select from "$lib/components/select/Select.svelte";
  import Switch from "$lib/components/switch/Switch.svelte";
  import LabeledSwitch from "$lib/components/switch/LabeledSwitch.svelte";
  import Pagination from "$lib/components/pagination/Pagination.svelte";
  import Tag from "$lib/components/tag/Tag.svelte";
  import Overlay from "$lib/components/overlay/Overlay.svelte";
  import Spinner from "$lib/components/spinner/Spinner.svelte";

  import { pageStore } from "$lib/stores/page.store";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { validateInputs, getFormData } from "$lib/utils/form";
  import { showToast } from "$lib/utils/toast";
  import { showModal, hideModal } from "$lib/utils/modal";
  import fuzzySearch from "$lib/utils/fuzzy-search";
  import CardFooter from "$lib/components/card/CardFooter.svelte";

  const codeCard = {
    px: 0,
    py: 0,
    color: "dark",
    height100: true,
  };

  $: segments = [true, false, false];

  const buttonLoadingDemo = (event) => {
    const id = event.currentTarget.id;

    showLoading(id);

    setTimeout(() => {
      hideLoading(id);
    }, 2000);
  };

  const iconButtonOptions = [
    {
      label: "Option 1",
      caption: "onclick example",
      onclick: () => {
        alert("Option 1 clicked");
      },
    },
    {
      label: "Option 2",
      caption: "href example",
      href: "/#buttons",
    },
  ];

  const labeledCheckbox = {
    id: "tos",
    value: null,
    label: "Terms of Service",
    desc: `You can view more details about our terms of service and privacy policy <a href="https://google.com">at this link</a>.`,
    error: "You have not accepted the terms of service.",
    validation: "required|boolean",
  };

  const checkboxGroup = {
    id: "toppings",
    options: [
      {
        label: "Pepperoni",
        value: "pepperoni",
      },
      {
        label: "Chedder Cheese",
        value: "cheese",
      },
      {
        label: "Small Mushrooms",
        value: "mushroons",
      },
    ],
    value: ["pepperoni"],
    label: "Select Toppings",
    desc: `You may select as many toppings as you would like.`,
    error: "Something went wrong",
    validation: "array",
  };

  const formInputs = [
    {
      type: "text", //will render a text input field. Other options are: "email" and "password" which are all basically the same thing
      id: "name", //the id will be the key when you call the getFormData function. If you add a "." in the id, it will return the item as a nested object. For example, if your `id` value is `name.last`, the getFormData function will return that as {name: {last: ""}}
      label: "Your Name", //The label is what we'll initally show for the input, it should explain what is required. Keep this short like "First Name"
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
      type: "textarea", //the textarea / fieldfield input
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
      search: false, //By default, if your select has more than 5 options, it will turn on fuzzy search unles you explictly turn it off
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
          value: "collab", //This is the actual value the user is selecting
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    {
      type: "select-number", //This is a special type of select in case you need to select only from number elements. Use this if all values in a select need to be numbers (Floats or Ints)
      id: "number-form-example",
      label: "Select Your Number",
      value: null, //You can add a value to the input
      desc: null,
      error: "This is required",
      validation: "required", //since you're adding the options, you can just set it to required
      search: false, //By default, if your select has more than 5 options, it will turn on fuzzy search unles you explictly turn it off
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
      desc: "Let us know if you want to recieve email updates",
      disabled: false,
      error: "An error occured",
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

  export let data = { metadata: [], markdown: [] };
  export let pokemon = [];
  export let pagination = {};

  $: _pokemon = pokemon;

  let overlayToggle = false;

  $pageStore.title = "Welcome";
</script>

<svelte:head>
  <title>Bubbles UI Kit</title>
</svelte:head>

<Header
  buttons={[
    {
      icon: "more",
      transparent: false,
      options: [
        {
          label: "Changelog",
          href: "/changelog",
          new_page: true,
        },
        {
          label: "Examples",
          caption: "Tables, Auth, Errors, etc",
          href: "/examples",
          new_page: true,
        },
      ],
    },
  ]}
/>

<Section>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Who should and shouldn't use Bubbles" border={false} />
        <p>
          Bubbles is an opinionated component library build for Svelte. It's has a specific structure and style that it
          follows. If the overall structure of it's layouts and components don't fit your needs, you're most likely
          better of using a more flexible component framework like Material UI, Tailwind, or writing your own.
        </p>
        <p>
          Bubbles is mostly set up to construct dashboards NOT landing pages and marketing sites. It has not's of
          dashboard specific components like <code>Sidebars</code> and <code>Tables</code> that are usually overkill and/or
          are too restrictive for marketing sites.
        </p>
      </Card>
    </Column>
  </Row>
</Section>

<Section id="installation" title="Installation">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Download from NPM" border={false} />
        <p>
          Install Bubbles into your project using <code>npm install bubbles-ui</code>. When you're doing your final
          build, any components that you are not using will not be included in your bundle.
        </p>
      </Card>
    </Column>
  </Row>
</Section>

<Section id="usage" title="Usage">
  <Row>
    <Column100>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Components and Utilities" border={false} />
        <p>
          All of the components and utility functions can be imported directly from <code>bubbles-ui</code>. The only
          caveat is a global css module that you'll want to import either in a global <code>__layout.svelte</code> file
          or reference in the root <code>app.html</code> which is imported from <code>bubbles-ui/css/app.css</code>
        </p>
      </Card>
    </Column100>
  </Row>
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Default Config" border={false} />
        <p>
          You can import a store called <code>configStore</code> into your initial <code>__layout.svelte</code> file to set
          some default behaviors for Bubbles. You can view the table below for all of the default options:
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }, { label: "Default" }]} />
          <TableRow>
            <TableCell><code>validate_on_blur</code></TableCell>
            <TableCell
              >This will run validation anytime an input has lost focus. If there is an error, it will show the error
              message. You're able to set this globally, but you can also set this property by passing it as a component
              prop.</TableCell
            >
            <TableCell><code>true</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>show_required</code></TableCell>
            <TableCell
              >If set to true, any input that has <code>required</code> in it's validation property will automatically get
              a "*" symbol at the end of the input label to indicate that the field is required.</TableCell
            >
            <TableCell><code>false</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>toast_delay</code></TableCell>
            <TableCell
              >How long a toast notification will stay on screen in milliseconds until it is automatically hidden.</TableCell
            >
            <TableCell><code>5500</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code>error_delay</code></TableCell>
            <TableCell
              >How long an error state will last on an input that has failed validation until it goes back to it's
              normal state - unless the user interacts with it as it will go back to it's normal state then as well.</TableCell
            >
            <TableCell><code>4500</code></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "default-config")]} />
      </Card>
    </Column50>
  </Row>`
</Section>

<Section id="colors" title="Colors">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Customize Colors" border={false} />
        <p>
          The global stylesheet that you imported from <code>bubbles-ui/css/app.css</code> added all of the supported colors
          as variables. You're able to add a stylesheet after the Bubbles stylesheet to override those styles and add your
          own.
        </p>
        <p class="">
          With the exception of black and white, every color has a base color, three lighter variations, and three
          darker variations. Below is an example for <code>primary</code>, which you should use in your css as a color
          variable: <code>color: var(--primary)</code> or <code>background: var(--primary-dark)</code>.
        </p>

        <Table>
          <TableRow>
            <TableCell>primary-lightest</TableCell>
            <TableCell><span style="color: var(--primary-lightest); font-weight: 700">#DAD6F4</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-lighter</TableCell>
            <TableCell><span style="color: var(--primary-lighter); font-weight: 700">#B5AEE9</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-light</TableCell>
            <TableCell><span style="color: var(--primary-light); font-weight: 700">#9186DE</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary</TableCell>
            <TableCell><span style="color: var(--primary); font-weight: 700">#6C5DD3</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-dark</TableCell>
            <TableCell><span style="color: var(--primary-dark); font-weight: 700">#50459E</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darker</TableCell>
            <TableCell><span style="color: var(--primary-darker); font-weight: 700">#352E69</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darkerest</TableCell>
            <TableCell><span style="color: var(--primary-darkest); font-weight: 700">#1B1734</span></TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Color Options" border={false} />
        <p>
          Like most kits, Bubbles uses descriptive words for colors that describe the action to which that color will
          apply. For example the default <span style="color: var(--error); font-weight: 700">red</span> color is called
          <code>error</code>. Below is a light of all of the color variables included with Bubbles.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Variable" }, { label: "Description" }, { label: "Default" }]} />
          <TableRow>
            <TableCell>Primary</TableCell>
            <TableCell>The main color for buttons, hover states, sidebar, etc</TableCell>
            <TableCell><span style="color: var(--primary); font-weight: 700">#DAD6F4</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Secondary</TableCell>
            <TableCell
              >Mostly used for secondary buttons, and colors. You'll need to request this in a property.</TableCell
            >
            <TableCell><span style="color: var(--secondary); font-weight: 700">#FF98E5</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Error</TableCell>
            <TableCell>Error states will show up on inputs fields that fail validation and error toasts</TableCell>
            <TableCell><span style="color: var(--error); font-weight: 700">#FF6628</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Warning</TableCell>
            <TableCell>Useful to caution a user about something. You can request warning toasts</TableCell>
            <TableCell><span style="color: var(--warning); font-weight: 700">#FF9F38</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Success</TableCell>
            <TableCell>Used by default for success toasts</TableCell>
            <TableCell><span style="color: var(--primary); font-weight: 700">#4FBF67</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Info</TableCell>
            <TableCell>Useful for highlighting links and other clickable non-button components</TableCell>
            <TableCell><span style="color: var(--info); font-weight: 700">#355DFF</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gray</TableCell>
            <TableCell>Shaded of gray are used everywhere for borders and outlines.</TableCell>
            <TableCell><span style="color: var(--gray); font-weight: 700">#808191</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dark</TableCell>
            <TableCell>If you want a dark color that isn't black, use dark.</TableCell>
            <TableCell><span style="color: var(--dark); font-weight: 700">#1B1D21</span></TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Icon Colors" border={false} />
        <p>
          In your <code>Sidebar</code> component, you have the option to include icons. Bubbles will calculate a filter
          based on your primary color to make sure the icon will hover with the same color. To make sure this filter is
          calculated correctly, the icon used should be black. While using <code>SVGs</code> is encouraged, you can use
          a
          <code>PNG</code> and get the same effect.
        </p>
      </Card>
    </Column>
  </Row>
</Section>

<Section id="errors" title="Errors">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Svelte Errors" border={false} />
        <p>
          To handle errors in Svelte, the <code>load</code> function at the top of each page can return an error
          <code>status</code> code (4xx and 5xx) and an <code>error</code> Object to describe the error. That will be
          passed to a page called <code>__error.svelte</code> which will display the error.
        </p>
        <p>
          Bubbles makes styling the page easy by exporting a component called <code>Error</code> which will style the
          error page for you. Import it in your <code>__error</code> page and pass in the props from your load function.
        </p>
      </Card>

      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "errors")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="page-wrappers" title="Page Wrappers">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true} height100={true}>
        <CardHeader title="Basic Structure" border={false} />
        <p>
          Just like Svelte Kit wants you to use <code>__layout.svelte</code> files for your standard page structure,
          Bubbles include some pre-made layouts. You'll generally want to include these layout components inside of
          <code>__layout.svelte</code>
          and pass everything else with a <code>slot</code>. These layouts will make sure that components like
          <code>Sidebar</code>, <code>Header</code>, and <code>Cards</code> are all behaving property.
        </p>
        <p>None of the page or layout components take any props.</p>
        <p>Below of a table of all layout components, and what they do.</p>

        <Table>
          <TableHeader cells={[{ label: "Component" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">SidebarPageWrapper</span></TableCell>
            <TableCell
              >If your page includes a <code>Sidebar</code> component, you'll want to include that in the
              <code>__layout.svelte</code> file.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">PageWrapper</span></TableCell>
            <TableCell>The <code>PageWrapper</code> will add padding to the pages and make is responsive.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>

    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-wrappers")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="page-rows" title="Page Rows">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true} height100={true}>
        <CardHeader title="Options" border={false} />
        <p>
          Each page of your UI will most likely have data structured in rows and columns. First you'll include the type
          of row you want, then include of that row will have the columns or grid you want inside. The rows will add the
          correct padding that you need.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Component" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">Row</span></TableCell>
            <TableCell
              >The most basic row that you can have. You'll normally use this with a 100% width column or a 50% width
              column.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">RowBorder</span></TableCell>
            <TableCell
              >This will add a vertical border between two rows. It will make the first column within it 2x wider than
              the second column.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-rows")]} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="page-columns" title="Page Columns">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true} height100={true}>
        <CardHeader title="Options" border={false} />
        <p>
          After you have selected the type of <code>Row</code> that you want to include, you need to select the
          <code>Column</code> that you want to include. There are a few options that Bubbles includes by default.
        </p>
        <p>All of the column types will respond to mobile sizes.</p>

        <Table>
          <TableHeader cells={[{ label: "Component" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">Column</span></TableCell>
            <TableCell
              >This column will be dynamic. The first column will be 66% of the width, with the second column being 33%.
              You should not use this for more than two columns.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">Column100</span></TableCell>
            <TableCell>This column will take up 100% of the <code>Row</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">Column50</span></TableCell>
            <TableCell>This column will take up 50% of the <code>Row</code></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-columns")]} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="page-grids" title="Page Grid">
  <Row>
    <Column100>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Details" border={false} />
        <p>Page grid is in progress...</p>
      </Card>
    </Column100>
  </Row>
</Section>

<Section id="page-center" title="Page Center">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Options" border={false} />
        <p>
          An easy way to center items on a page. Add the <code>Center</code> component to center everything without including
          any columns. This is useful for making something like a Auth section.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Component" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">Column</span></TableCell>
            <TableCell
              >This column will be dynamic. The first column will be 66% of the width, with the second column being 33%.
              You should not use this for more than two columns.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">Column100</span></TableCell>
            <TableCell>This column will take up 100% of the <code>Row</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">Column50</span></TableCell>
            <TableCell>This column will take up 50% of the <code>Row</code></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-center")]} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="buttons" title="Buttons">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Button" border={false} />
        <p>
          The <code>Button</code> is a standard button component. It has a text label and can run functions when clicked.
          Below are the properties that you can add to this button.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there
              will be a unique id added to the component.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>This is the text label that the button will have. Defaults to "Submit"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >Pass the name of the color variable you want for the button. For example, "primary" or "error". If you
              want a light version of the button pass in a "-light" with the color, like <code>primary-light</code>. If
              you want an outlined button, pass "-outlined" such as <code>success-outlined</code></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell>Pass a function that you would like to run when this button is clicked</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onsubmit</span></TableCell>
            <TableCell
              >If the button is inside of a bubbles <code>Form</code> element, pass a function to onsumbit, which will listen
              to the submit event.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell
              >If this button will taking a user to a different page, use href instead of directing them to the page
              with onclick. This will prefetch the data on hover to make the navigation faster.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">wide</span></TableCell>
            <TableCell
              >Pass <code>true</code> if you want the button to take the full width of it's parent container</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">mt</span></TableCell>
            <TableCell>The top margin. Ideally set it in rem values</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">mb</span></TableCell>
            <TableCell>The bottom margin. Ideally set it in rem values</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>
  <Row>
    <Column50>
      <Card {...codeCard}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "button")]} />
      </Card>
    </Column50>
    <Column50>
      <Card>
        <CardHeader title="Button colors" border={false} />
        <Button mt="1rem" wide={true} label="Primary" color="primary" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Secondary" color="secondary" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Success" color="success" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Error" color="error" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Warning" color="warning" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Info" color="info" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Gray" color="gray" onclick={buttonLoadingDemo} />
        <Button mt="1rem" mb="1rem" wide={true} label="Dark" color="dark" onclick={buttonLoadingDemo} />
      </Card>
      <Card>
        <CardHeader title="Different button styles" border={false} />
        <Button mt="2rem" wide={true} label="Primary" color="primary" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Primary Border" color="primary-border" onclick={buttonLoadingDemo} />
        <Button
          mt="1rem"
          mb="1rem"
          wide={true}
          label="Primary Light"
          color="primary-light"
          onclick={buttonLoadingDemo}
        />
      </Card></Column50
    >
  </Row>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="IconButton" border={false} />
        <p>
          The <code>IconButton</code> is a circular button. It's best used in places like a <code>Header</code>,
          <code>Card</code>, or <code>Table</code> component. They have some cool features like the option to show a
          dropdown, pretty common when you add a <code>more</code> icon.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there
              will be a unique id added to the component.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">icon</span></TableCell>
            <TableCell
              >You can pass an icon for the button. Import an <code>svg</code> icon as a variable reference it. There are
              a few bundled common icons you can select from, listed in the table below.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell>Pass a function that you would like to run when this button is clicked</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell
              >If this button will taking a user to a different page, use href instead of directing them to the page
              with onclick. This will prefetch the data on hover to make the navigation faster,</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">transparent</span></TableCell>
            <TableCell
              >Normally the button is transparent, but you can set this to <code>false</code> to make the button standout
              with a slight gray background.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell
              >An <code>array</code> of options. If you add options, you'll get a dropdown of those options.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.label</span></TableCell>
            <TableCell>The label for the options.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.caption</span></TableCell>
            <TableCell>The caption if you want extra text for the option.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.onclick</span></TableCell>
            <TableCell>A function that will be called when the option is selected.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.href</span></TableCell>
            <TableCell
              >If this button will taking a user to a different page, use href instead of directing them to the page
              with onclick. This will prefetch the data on hover to make the navigation faster.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>
  <Row>
    <Column50>
      <Card {...codeCard}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "icon-buttons")]} />
      </Card>
    </Column50>
    <Column50>
      <Card>
        <CardHeader title="Bundled Icon Options" border={false} />
        <div class="d-flex">
          <IconButton icon="more" options={iconButtonOptions} />
          <code>more</code>
        </div>
        <div class="d-flex">
          <IconButton icon="add" options={iconButtonOptions} />
          <code>add</code>
        </div>
        <div class="d-flex">
          <IconButton icon="arrowLeft" options={iconButtonOptions} />
          <code>arrowLeft</code>
        </div>
        <div class="d-flex">
          <IconButton icon="arrowRight" options={iconButtonOptions} />
          <code>arrowRight</code>
        </div>
        <div class="d-flex">
          <IconButton icon="close" options={iconButtonOptions} />
          <code>close</code>
        </div>
        <div class="d-flex">
          <IconButton icon="search" options={iconButtonOptions} />
          <code>search</code>
        </div>
        <div class="d-flex">
          <IconButton icon="edit" options={iconButtonOptions} />
          <code>edit</code>
        </div>
        <div class="d-flex">
          <IconButton icon="trash" options={iconButtonOptions} />
          <code>trash</code>
        </div>
        <div class="d-flex">
          <IconButton icon="filter" options={iconButtonOptions} />
          <code>filter</code>
        </div>
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="cards" title="Cards">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card" border={false} />
        <p>
          These are the sections that make up your application. All of the outlined and dark code sections of this
          knowledgebase are made of cards.
        </p>
        <p>
          The card will take some properties to figure out it's visual appearance. The main content of the <code
            >Card</code
          >
          typically a <code>Form</code> or <code>Table</code> will be added as a
          <code>slot</code> into the card.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell>This is the background color of the card. It defaults to <code>white</code>.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">border</span></TableCell>
            <TableCell>If you want the card to have a border. It defaults to <code>false</code>.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">shadow</span></TableCell>
            <TableCell
              >The shadow behind the card. You can't specify the shadow right now, just if you want it or not. It
              defaults to <code>true</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">height100</span></TableCell>
            <TableCell
              >Makes the card height 100% of the row it's in. This is useful for when you have two columns and there are
              two tows side by side. It defaults to <code>false</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">px</span></TableCell>
            <TableCell
              >The horisontal padding on the card in <code>rem</code> values. It defaults to
              <code>0.065</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">py</span></TableCell>
            <TableCell
              >The vertical padding on the card in <code>rem</code> values. It defaults to <code>2</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">header</span></TableCell>
            <TableCell
              >You are able to set the card header as a prop instead of adding it as a component into the slot. See the
              example for how this works, but this is useful if you're adding dynamic cards to the page.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">footer</span></TableCell>
            <TableCell
              >You are able to set the card footer as a prop instead of adding it as a component into the slot. See the
              example for how this works, but this is useful if you're adding dynamic cards to the page.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card {...codeCard}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "card")]} />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <p class="d-flex">This is a basic card with just text inside. You can slot whatever content you want inside</p>
      </Card>

      <Card border={true} shadow={false}>
        <p class="d-flex">This is a card with a border and no shadow</p>
      </Card>

      <Card border={true} shadow={false} color={"primary"}>
        <p class="d-flex" style="color: white">This is a card with a color property of primary and no background.</p>
      </Card>
    </Column50>
  </Row>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card Header" border={false} />
        <p>
          The <code>CardHeader</code> is fixed to the top of the card and will contain things like the title, action buttons,
          and filters.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell
              >The main prop that you will usually include in your card. This will be the title that describes the
              content of the card.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">caption</span></TableCell>
            <TableCell
              >if you need more details for your title, you can include a caption, which will display smaller text below
              the title. Captions load data as html, so you can add an anchor tag with an <code>href</code> and it will render
              the link correctly.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">border</span></TableCell>
            <TableCell
              >By default, the header has a bottom border to divide it from the rest of the content. This can be removed
              by passing <code>false</code> to this property.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">center</span></TableCell>
            <TableCell
              >Decides if the header should be centered. It's advised to only use this if you are not using filers or
              buttons.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">buttons</span></TableCell>
            <TableCell
              >Buttons are an array of <code>IconButton</code>s that will show up on the right side of the header.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">filters</span></TableCell>
            <TableCell
              >An array of filters that should be used if you have a <code>Table</code> inside of you card and want to
              filter the data. The Filters are a special type of <code>Select</code> that will modify urls query params,
              which will cause Svelte to refetch the data required.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>
  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "card-header")]} />
      </Card>
    </Column50>
    <Column50>
      <Card>
        <CardHeader title="Title" caption="Learn more <a href='https://google.com'>here</a>." />
        <div class="d-flex">This is a card header</div>
      </Card>

      <Card>
        <CardHeader
          title="Header With Buttons"
          buttons={[
            {
              icon: "edit",
              href: "/#cards",
            },
            {
              icon: "more",
              options: [
                {
                  label: "Contact Support",
                  href: "/#cards",
                },
                {
                  label: "Delete Account",
                  onclick: () => {
                    showModal("Delete Account");
                  },
                },
              ],
            },
          ]}
        />
        <div class="d-flex">This is a card header with buttons</div>
      </Card>

      <Card>
        <CardHeader
          filters={[
            {
              id: "filter",
              label: "Filter",
              options: [
                {
                  label: "Filter 1",
                  value: "filter1",
                  caption: "Most popular",
                },
                "break",
                {
                  label: "Filter 2",
                  value: "filter2",
                },
                {
                  label: "Filter 3",
                  value: "filter3",
                },
              ],
            },
          ]}
        />
        <span class="d-flex">
          This is a card header with filters. The filters will update page query params which will make Svelte fetch new
          data. You can also pass your own logic for the filter by adding a function to the onselect property for the
          filter options.
        </span>
      </Card>
    </Column50>
  </Row>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card Footer" border={false} />
        <p>
          The <code>CardFooter</code> is fixed to the bottom of the card and will contain pagination if required.
        </p>

        <p><strong>The CardFooter component is not yet completed.</strong></p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">pagination</span></TableCell>
            <TableCell
              >Will add the <code>Pagination</code> component. Useful if you have Table component slotted in the Card.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "card-footer")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="checkboxes" title="Checkboxes">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Checkbox" border={false} />
        <p>
          The single checkbox is best used in a Table. If you're making a Form with some options for a user to select
          from, use the <code>CheckboxGroup</code> component.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>add a boolean value, either <code>true</code>true or <code>false</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onchange</span></TableCell>
            <TableCell>You can add a function when the value of the checkbox changes.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "checkbox")]} />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Checkbox Demo" border={false} />
        <div class="d-flex">
          <Checkbox
            value={true}
            onchange={() => {
              alert("Value Changed");
            }}
          />
        </div>
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Labeled Checkbox" border={false} />
        <p>
          This is usually a component you would want to include inside a form if you wanted the user to agree to
          something like terms and conditions. The labeled checkbox includes a label, description field, and validation.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >If you're using this inside of the form, you'll want to include the id value, which will be the property
              value in JSON data when the form is submitted.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>add a boolean value, either <code>true</code>true or <code>false</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label you want explaining what the checkbox is</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The option to add more text to explain the option the user is selecting in more detail. This element
              allows you to include html elements, so you can add an outbound link with an anchor tag.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text you want to shwo if this item fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string you want to use for this form. See the validation article in the Utils section for
              more info.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "labeled-checkbox")]} />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <LabeledCheckbox {...labeledCheckbox} />
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Checkbox Group" border={false} />
        <p>
          This is a component to include in a form when you want to user to select one or more options. If you want the
          user to only select one options, look into a <code>RadioGroup</code> instead.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >If you're using this inside of the form, you'll want to include the id value, which will be the property
              value in JSON data when the form is submitted.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell
              >An array that will contain the options the user can select. Each option can have a label, that the user
              will see, and a value, which is not shown to the user but will be added to the Form JSON.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell
              >The value is an <code>array</code> because you can have multiple selected. The array will be the labels for
              each of the options that are selected</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label you want explaining what the checkbox is</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The option to add more text to explain the option the user is selecting in more detail. This element
              allows you to include html elements, so you can add an outbound link with an anchor tag.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text you want to show if this item fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string you want to use for this form. See the validation article in the Utils section for
              more info.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "checkbox-group")]} />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Demo" border={false} />
        <CheckboxGroup {...checkboxGroup} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="divider" title="Divider">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Divider" border={false} />
        <p>
          The divider is just a horizontal line the divides content. This component also allows you to add text to the
          line.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>If you add a label, text will show up nicely in the middle of the line.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "divider")]} />
      </Card>
    </Column50>

    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <div class="d-flex">
          <Divider label="TEXT IN THE MIDDLE" />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="error" title="Error">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Description" border={false} />
        <p>
          To handle errors in Svelte, the <code>load</code> function at the top of each page can return an error status
          code (4xx and 5xx) and an <code>error</code> Object to describe the error. That will be passed to a page
          called <code>__error.svelte</code> which will display the error.
        </p>
        <p>
          Bubbles makes styling the page easy by exporting a component called <code>Error</code> which will style the
          error page for you. Import it in your <code>__error</code> page and pass in the props from your load function.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">code</span></TableCell>
            <TableCell
              >The error code (4xx) or (5xx). If you don't provide a title or message, the error code will be used to
              generate a generic message.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell
              >This should describe the error code. For example: "Not Found" for a 404 message. You can leave this blank
              and the Error component will fill this in for you.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">message</span></TableCell>
            <TableCell
              >A message that you want to include for the user that will describe what happened to the end user.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">img</span></TableCell>
            <TableCell
              >An image you want to include in your error page. There's a default image that is provided for you.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">button</span></TableCell>
            <TableCell
              >The default action sends the user back to the index page but you can override this by passing in props to
              your own <code>Button</code> component.</TableCell
            >
          </TableRow>
        </Table>
      </Card>

      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "errors")]} />
      </Card>
    </Column>
  </Row>
</Section>

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
            <TableCell><span style="font-weight: 700">inputs</span></TableCell>
            <TableCell
              >An array of input values that you want to add. See the individual articles for inputs like <code
                >Input</code
              >, <code>Select</code>, and <code>Button</code> to understand what kind of properties to add to each.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell>You can set an ID for the form, otherwise an unique ID will automatically be applied.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "form")]} />
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
</Section>

<Section id="header" title="Header">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Header" border={false} />
        <p>
          The Header is the element that is at the top of the page. This is typically have a large title, a back buttons
          if needed, and breadcrumbs. If you need any action items, you can add those too.
        </p>

        <p>
          Bubbles will calculate the labels from the breadcrumbs using the path if you set <code>breadcrumbs</code>
          to <code>true</code>. For the last breadcrumb it will use the page title that you set in the Header. For
          example, a settings page path of <code>/settings/profile</code> would give breadcrumbs of "Settings /
          Profile". Sometimes it's common to add the ID of an element in the href, such as
          <code>/invoices/inv_09384oisejfk</code>. In this case, the breadcrumb will look for the title for the last
          element and show something like "Invoices / 23" (or whatever the title of the page is in the Header.). In an
          scenario where your page has two dynamic links such as <code>/pokedex/[pokemon_id]/[move_id]</code> you may
          want to pass in more human readable labels to the breadcrumbs using the <code>breadcrumb_labels</code>
          property.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell
              >This is the main title for the page. You can either pass it as a prop to the header component, or update
              the <code>pageStore.title</code> property which will do the same thing.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">subtitle</span></TableCell>
            <TableCell
              >You can add a subtitle to the page. This accepts html so you can add anchor tags. If you add a subtitle
              and are on a nested page, you will not see any breadcrumbs.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">breadcrumbs</span></TableCell>
            <TableCell
              >This is a boolean option if you want breadcrumbs enabled. Bubbles will automatically calculate
              breadcrumbs for you.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">breadcrumb_labels</span></TableCell>
            <TableCell>An array of string to overwrite the labels for breadcrumbs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">buttons</span></TableCell>
            <TableCell
              >Buttons are an array of <code>IconButton</code>s that will show up on the right side of the header.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "header")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="input" title="Input">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Bubbles Inputs" border={false} />
        <p>
          All of the text based inputs are housed under one <code>Input</code> component. You can specify the type of
          input that you want to use using the <code>type</code> property.
        </p>

        <p>
          With Bubbles, you'll normally never actually import any <code>Input</code> components, you'll just programmatically
          add them directly to the Form.
        </p>

        <p>
          All of the text based inputs are housed under one <code>Input</code> component. You can specify the type of
          input that you want to use using the <code>type</code> property.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >All of the inputs that you provide to the form should have an <code>id</code> property. This will end up
              being the property name on the JSON object. If your <code>id</code> includes any periods in it like
              <code>profile.name</code>, the "name" will be nested under "profile".</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">type</span></TableCell>
            <TableCell
              >Bubbles supports several inputs: <code>text</code>, <code>email</code>, <code>password</code>,
              <code>date</code>, <code>number</code>, and <code>textarea</code></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell
              >The label that will describe what information needs to be entered. Will float up when the input is in
              focus. Best to keep this as short as possible</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell
              >The error text that you want to display if this input fails validation. Best to keep this as short as
              possible.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string you want to use for this form. See the validation article in the Utils section for
              more info.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validate_on_blur</span></TableCell>
            <TableCell>If true, runs the validation checks when focus is lost from the input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">vob</span></TableCell>
            <TableCell>Just an alias for <code>validate_on_blur</code>. Set whichever is best for you.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >This will be the small text below the input to describe it in more detail. It supports html so you can
              add anchor tags that will get rendered correctly.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>The value for this input it you want to pre-fill it.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">autocomplete</span></TableCell>
            <TableCell
              >If you want to browser to autocomplete fields for the user. Disable this by passing <code>false</code>,
              by default this is turned on.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">margin</span></TableCell>
            <TableCell>Adds margin to the input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">bounds</span></TableCell>
            <TableCell
              >This is an array with the min and max values for an input. It's used only with the <code>number</code> input
              type.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">rows</span></TableCell>
            <TableCell
              >Specifies the height in rows to be used. It's used only with the <code>textarea</code> input type.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">typeahead</span></TableCell>
            <TableCell
              >This lets you show a list of suggestions for a user as they are typing in a value. This is useful for
              helping populate an address, for example. The typeahead property is a function which takes in <code
                >value</code
              > the current value of the input and should return an array of string as possible suggestions.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "inputs")]} />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Examples" border={false} />
        <div>
          <Input
            id="name"
            type="text"
            label="Full Name"
            error="Please add your name"
            validation="string|required|min:3"
            vob={true}
            desc="This is a text input that has validation that checks for a string with a minimum length of 3"
            margin={true}
          />

          <Input
            id="password"
            type="password"
            label="Passphrase"
            error="Your passphrase must be at least 10 characters"
            validation="string|required|min:10"
            vob={true}
            desc="This is a password field that has a minimum requirement of 10 characters."
            margin={true}
          />

          <Input
            id="date_of_birth"
            type="date"
            label="Date Of Birth"
            error="This is not a valid date"
            validation="required|date"
            desc="This is a date field"
            margin={true}
          />

          <Input
            id="age"
            type="number"
            label="What is your age"
            error="Please select a number between 13 and 150"
            validation="required|number|min:13|max:150"
            desc="Type a number between 13 and 150"
            margin={true}
            bounds="{[13, 150]},"
          />

          <Input
            id="address"
            type="textarea"
            label="Enter your address"
            error="Enter your address"
            validation="string"
            vob={true}
            desc="This is a textarea field with a height of 5 rows."
            margin={true}
            rows="5"
          />

          <Input
            id="favorite"
            type="text"
            label="Favorite U.S. State"
            error="we can't find that one!"
            desc="This is an example of typeahead to get results based on what the user is typing. It can be used on text and textarea inputs. Just add a function to the typeahead property that accepts the current value and responds with a Promise that array of options. Each option is the completed string. "
            margin={true}
            autocomplete={false}
            typeahead={(input) => {
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

              const fuse = new fuzzySearch(states, {
                shouldSort: false,
                keys: ["name", "abbreviation"],
                minMatchCharLength: 2,
                threshold: 0.4,
              });

              return Promise.resolve(fuse.search(input).map((obj) => obj.item.name));
            }}
          />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="list" title="List">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A list is a great way to display information one line at a time. Think of a list as a vertical table. You can
          create a list by either passing in an array on items into the <code>items</code> property, or importing the
          <code>ListItem</code>
          or <code>ListItemTimeline</code> components and adding them into the List.
        </p>

        <p>
          As a general rule of thumb for dashboard, it's easier to just pass in the list of items as a prop, since you
          are most likely fetching this data from a server.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">type</span></TableCell>
            <TableCell
              >The type of list that you want to show. There are currently two types of lists that are supported. <code
                >standard</code
              >is the default list, and <code>timeline</code> if you want a timeline list.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">items</span></TableCell>
            <TableCell>An array items items that list list will have. Each item is an object</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.label</span></TableCell>
            <TableCell
              >This is the label at the top of the list. It should describe what the text is that the user is seeing.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.text</span></TableCell>
            <TableCell>This is the main content of of list</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.href</span></TableCell>
            <TableCell>If you want the list item to be a link, pass in the href</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.new_page</span></TableCell>
            <TableCell
              >If the item is an href, pass <code>false</code> if you don't want the href to be opened in a new tab.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.icon</span></TableCell>
            <TableCell
              >You can include an icon on the right side of the list. You can pass an imported icon, or use the bundled
              common icons for the list which include <code>copy</code>, <code>download</code>, <code>edit</code>, and
              <code>trash</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.onclick</span></TableCell>
            <TableCell
              >If you have an icon, you can pass a function that will run when a user clicks on an icon. Useful for
              downloading some content or copying the text that's in the List.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.active</span></TableCell>
            <TableCell>
              If the list <code>type</code> is a timeline, you can set the timeline bubble to be active, which will change
              it's color to green
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.pulse</span></TableCell>
            <TableCell>
              If the list <code>type</code> is a timeline, and the item is active, it will be pulsing. You can turn this
              off by passing <code>false</code> to this attrubute.
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "list")]} />
      </Card>
    </Column50>
    <Column50>
      <Card>
        <CardHeader title="Standard List" border={false} />
        <List
          items={[
            {
              label: "Label",
              text: "Simple List Item",
            },
            {
              label: "Label",
              text: "Example with href",
              href: "https://google.com",
              new_page: true,
            },
            {
              label: "Download",
              text: "Icon Example",
              icon: "download",
              onclick: () => {
                alert("List clicked");
              },
            },
            {
              label: "copy",
              text: "Icon Example",
              icon: "copy",
              onclick: () => {
                alert("List clicked");
              },
            },
            {
              label: "edit",
              text: "Icon Example",
              icon: "edit",
              onclick: () => {
                alert("List clicked");
              },
            },
            {
              label: "trash",
              text: "Icon Example",
              icon: "trash",
              onclick: () => {
                alert("List clicked");
              },
            },
          ]}
        />
      </Card>

      <Card>
        <CardHeader title="Timeline List" border={false} />
        <List
          type="timeline"
          items={[
            {
              label: "Label",
              text: "List test",
              href: "https://google.com",
              new_page: true,
              active: false,
            },
            {
              label: "Label",
              text: "List test",
              icon: "edit",
              active: true,
            },
          ]}
        />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="modal" title="Modal">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A Modal is basically a card that will sit on top of all content. It should only be used for actions that to
          user needs to take right now.
        </p>

        <p>
          Modals are set programatically. Add the <code>Modal</code> component to your <code>__layout.svelte</code>
          file, and then use the helper functions <code>showModal</code> to bring up the modal. The
          <code>showModal</code>
          function will add the required components to a the <code>modalStore</code>. You can also programatically hide
          the modal using the <code>hideModal</code> function.
        </p>

        <p>Generally, your modal will display a form or a message to the user with some buttons.</p>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "modal")]} />
      </Card>
    </Column50>
    <Column50>
      <Card>
        <CardHeader title="Modal Demos" border={false} />

        <Button
          label="Message Modal"
          wide={true}
          mb={true}
          onclick={() =>
            showModal("Message Modal", {
              message: "This is a message modal. Good for things like confirming an undoable action for the user",
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
                "This is a form modal. It can have a message option too! Just add Form details just like you would with any other form. You can include the submit buttons in the form, which will cause them to not be locked at the bottom. Or you can include the submit buttons in the footer, which will cause the buttons to be sticky at the buttom of the modal.",
              form: [
                {
                  type: "text",
                  id: "name",
                  label: "Name",
                  error: "An error occured",
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
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="overlay" title="Overlay">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The overlay puts a page overtop of the whole page. It's useful if you want to temporarily block the current
          page content without navigating to a new page.
        </p>

        <p>
          For example, the <code>Error</code> and <code>Modal</code> components use overlays to show content without navigating
          to a new page.
        </p>

        <p>
          You'll want to include functionality to hide an show the Overlay, otherwise it will block all content on the
          screen.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">solid</span></TableCell>
            <TableCell
              >Normally the overlay is a transparent black background, but you can force it to be a solid background by
              passing in <code>true</code> to this field.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">transition_duration</span></TableCell>
            <TableCell>Add the time in milliseconds that you want the overlay to fade in.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell>An function that will be fired when the overlay is clicked on</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "overlay")]} />
      </Card>
    </Column50>
    <Column50>
      <Card>
        <CardHeader title="Overlay Demo" border={false} />

        {#if overlayToggle}
          <Overlay solid={true} transition_duration={500} onclick={() => (overlayToggle = false)}>
            <Center>
              <Spinner size={5} color="primary" />
              <p>Loading Your Data (Click anywhere to close the overlay)</p>
            </Center>
          </Overlay>
        {/if}

        <Button
          label="Show Overlay"
          wide={true}
          mb={true}
          onclick={() => {
            overlayToggle = true;
          }}
        />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="pagination" title="Pagination">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Used for reducing the amount of data shown in a <code>Table</code>. This component should be mounted in a
          <code>CardFooter</code> for best results.
        </p>

        <p>
          Depending on your data source, you may have different options for the pagination. For example, if you have the
          total count of all documents you can show individual pages. However, if your database does not give you a
          total document count and you don't keep track yourself, you'll be better off using just a previous and next
          buttons.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">rows_per_page</span></TableCell>
            <TableCell
              >This is an array of integers to be able to change the limit of how many options that pagination will
              request. The default values are 10, 25, 50, and 100. You can change these by adding your own array or
              choose to not give users this options by passing in <code>null</code> or an empty array</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">limit</span></TableCell>
            <TableCell
              >The default limit that is used to determine the amount of document the pagination will request. By
              default it will pick the first value from <code>rows_per_page</code> but you can set this to whatever integer
              you would like.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">count</span></TableCell>
            <TableCell
              >The total number of documents in this set. By passing in count, Bubbles will add page numbers to the
              pagination for you.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">max_buttons</span></TableCell>
            <TableCell
              >The maximum number of page buttons to include on the page. Does not include next and previous buttons.
              Defaults to 10.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">arrows</span></TableCell>
            <TableCell>If you want to include previous and next arrow buttons. Defaults to true.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">first_last_arrows</span></TableCell>
            <TableCell
              >Will add buttons on the left and right sides of the pagination to navigate to the first and last page.
              You need to add a count for this, otherwise Bubbles does not know what the last page is.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">has_more</span></TableCell>
            <TableCell
              >If you don't provide a <code>count</code>, you should provide a boolean value to share if there is
              another page in your navigation. If your API or database does not provide this data, you can query the
              database for the pagination limit + 1 to check if there are more documents, and then respond with just the
              pagination limit number of documents.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">page_query_name</span></TableCell>
            <TableCell
              >Updates the name of the query parameter that gets added for the page query. The default name is "page"
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">limit_query_name</span></TableCell>
            <TableCell
              >Updates the name of the query parameter that gets added for the limit query. The default name is "limit"
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "pagination")]} />
      </Card>
    </Column>
    <Column>
      <Card>
        <CardHeader title="Pagination Options" border={false} />
        <div style="margin-bottom: 2rem;">
          <Pagination
            limit={10}
            count={1000}
            max_buttons={10}
            first_last_arrows={true}
            page_query_name="page_query_1"
            limit_query_name="limit_query_1"
          />
        </div>
        <div style="margin-bottom: 2rem;">
          <Pagination
            rows_per_page={[5, 500]}
            limit={5}
            count={1000}
            max_buttons={10}
            page_query_name="page_query_2"
            limit_query_name="limit_query_2"
          />
        </div>
        <div style="margin-bottom: 2rem;">
          <Pagination
            rows_per_page={null}
            limit={5}
            count={null}
            has_more={true}
            page_query_name="page_query_3"
            limit_query_name="limit_query_3"
          />
        </div>
      </Card>
    </Column>
  </Row>
</Section>

<Section id="radio" title="Radio">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Like a <code>Checkbox</code> a radio let's a user chose from one of multiple options. Fundamentally you get the
          same results using Bubbles with the radio and select elements.
        </p>

        <p>The best practice if to use the radio in forms and times when the user has less options to choose from.</p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >You can assign an id to the radio group. When used in a form, the ID will be the name of the property in
              the data object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>If you want one of the options to pre pre-selected</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text to show if this element fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label that describes what the user is selecting</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >A longer, detailed explanation of the options that this user has. Supports parsing html elements in the
              string.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell>Add the required validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell>An array of options the user can chose from</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.value</span></TableCell>
            <TableCell>The value of the option. This is the value that will be passed to the form data</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.label</span></TableCell>
            <TableCell>This is what the user see's while selecting the option</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "radio-group")]} />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Radio Group" border={false} />

        <RadioGroup
          id="sandwitch.type"
          value="burger"
          error="Please select an option"
          label="Choose sandwitch"
          validation="required|string"
          desc="This is the longer description for the RadioGroup if you think it needs more explaination. You can add html elements like <a href='https://google.com' target='blank'>links</a>."
          options={[
            {
              label: "Burger",
              value: "burger",
            },
            {
              label: "Hot Dog",
              value: "hd",
            },
            {
              label: "Grilled Cheese",
              value: "gc",
            },
          ]}
        />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="segmented-controller" title="Segmented Controller">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>The segmented controller is a series of buttons for dividing elements on the same page.</p>
        <p>
          The segment will automatically transform into a select element when the screen is too small to support the
          full width bar.
        </p>
        <p>
          This relies on binding the the <code>innerWidth</code> of the window. If you are using the device toggle in your
          browser dev tools, the segmented controller will not respond correctly
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">segments</span></TableCell>
            <TableCell>This is an array of options for all of the buttons to include</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">segment.label</span></TableCell>
            <TableCell>This is the label that the user will see</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">segment.onclick</span></TableCell>
            <TableCell
              >This is the function that will fire that will determine the logic for your segment. Typically you will
              want to hide some sections and show others</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component
          this={data.markdown[data.metadata.findIndex((a) => a?.component === "segmented-controller")]}
        />
      </Card>
    </Column>
    <Column>
      <SegmentedController
        segments={[
          {
            label: "Section 1",
            onclick: (event) => {
              segments[0] = true;
              segments[1] = false;
              segments[2] = false;
            },
          },
          {
            label: "Section 2",
            onclick: () => {
              segments[0] = false;
              segments[1] = true;
              segments[2] = false;
            },
          },
          {
            label: "Section 3",
            onclick: () => {
              segments[0] = false;
              segments[1] = false;
              segments[2] = true;
            },
          },
        ]}
      />
      <div class:hidden={!segments[0]}>
        <Card>
          <CardHeader title="Section 1" border={false} />
        </Card>
      </div>

      <div class:hidden={!segments[1]}>
        <Card>
          <CardHeader title="Section 2" border={false} />
        </Card>
      </div>

      <div class:hidden={!segments[2]}>
        <Card>
          <CardHeader title="Section 3" border={false} />
        </Card>
      </div>
    </Column>
  </Row>
</Section>

<Section id="select" title="Select">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>The select element lets the user select from one of multiple options.</p>
        <p>
          While there are multi select elements, Bubbles currently does not support multi-select <code>Select</code>
          elements. Many arguments can be made that this is incorrect, but the current thinking is that a
          <code>CheckboxGroup</code> is a better user experience.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >The ID for the select. When used in a <code>Form</code> the id will be the name of the property in the data
              object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell
              >If you want to set a default value for the select. This value will need to match one of the values of
              your <code>options</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label shown to the user that will describe what the user is selecting</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text that will be displayed if this element fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The option to add more text to explain the option the user is selecting in more detail. This element
              allows you to include html elements, so you can add an outbound link with an anchor tag.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">type</span></TableCell>
            <TableCell
              >The default type is <code>select</code> but if it's really important for you to have values that are
              numbers, you can change the type to <code>select-number</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell>The validation string. See the utils section for all of the validation fields.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validate_on_blur</span></TableCell>
            <TableCell>Will run validation when the element loses focus</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">vob</span></TableCell>
            <TableCell
              >An alias for <code>validate_on_blur</code> for those who want to type less. You can use either option.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">search</span></TableCell>
            <TableCell
              >If you want the select element to be searchable. By default, if you have more than 5 options, the search
              will be turned on. You can override this behavior by settings the value to a boolean.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell>An array of options for the user to choose from</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.label</span></TableCell>
            <TableCell>The label that the user will see when select the option</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.caption</span></TableCell>
            <TableCell>A second line to give more detail about the option</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.value</span></TableCell>
            <TableCell>The actual value that will be selected.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.onselect</span></TableCell>
            <TableCell>A function that can be run if this option is selected</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "select")]} />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <Select
          id="select_example"
          value={null}
          label="Select a shape"
          error="Please select a shape"
          desc="This is the description that will be below the select element. Any description field can render inline html elements."
          type="select"
          validation="required|string"
          vob={true}
          options={[
            {
              label: "Circle",
              value: "circle",
              caption: "No corners!",
            },
            "break",
            {
              label: "Square",
              value: "square",
            },
            {
              label: "Polygon",
              value: "poly",
              onselect: () => {
                console.log("Whoa, you like polygons?");
              },
            },
            {
              label: "Triangle",
              value: "tri",
            },
            {
              label: "Hexagon",
              value: "hex",
            },
          ]}
        />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="sidebar" title="Sidebar">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The Sidebar is located on the left side of the screen and lets users access different sections of your
          application.
        </p>

        <p>
          On mobile devices, the sidebar will collapse into a hamburger button, which can be opened by the user to
          reveal the sections
        </p>

        <p>
          It's best to load this component in <code>__layout.svelte</code> since the Sidebar will remain rendered on
          each page. You'll also generally want to use the <code>PageSidebarWrapper</code> to slot the rest of your content
          with the proper paddings
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">logo</span></TableCell>
            <TableCell>Pass a reference in for your logo that will be included at the top of the sidebar</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">sections</span></TableCell>
            <TableCell>An array of Objects that will be the sections you want to include in your Sidebar.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.icon</span></TableCell>
            <TableCell
              >If you want your section to have an icon, pass an <code>svg</code> or <code>png</code> icon. This icon should
              be black (#000000) as Bubbles will calculate the correct color filters for it automatically.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.label</span></TableCell>
            <TableCell>This is the text that will be displayed for the user</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.section</span></TableCell>
            <TableCell
              >If you want to divide your sidebar into groups, you can add a section property. In this example, the
              sidebar is divided into four sections, "Getting Started", "Layouts", "Components", and "Utils"</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.id</span></TableCell>
            <TableCell
              >An id that you can pass to the section to make a reference of it. If you'll be adding notifications
              counts next to any of the sidebar items, it's useful to know the ID so that you can update the
              notification counter easily. If you don't set an ID, Bubbles will set one for you.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.href</span></TableCell>
            <TableCell
              >This is the page where the user will be routed. Bubbles will automatically highlight the active section
              and show loading indicators if the page is taking a while to load.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.href_aliases</span></TableCell>
            <TableCell
              >There can be times when you have pages with multiple hrefs. For example, it's common that <code>/</code>
              and <code>/dashboard</code> might be the same page. As a result, if the initial href is set to
              <code>/dashboard</code>
              and the user navigates to <code>/</code>, the correct section will not be shown as active. Add an array of
              string here that share that href here to correct this behavior.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.notifications</span></TableCell>
            <TableCell
              >If you want to set an initial value for notifications when the component mounts you can do so here.
              Otherwise, you'll update notifications counts using the <code>pageStore</code></TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "sidebar")]} />
      </Card>
    </Column>
  </Row>
  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component
          this={data.markdown[data.metadata.findIndex((a) => a?.component === "sidebar-notifications")]}
        />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Updating Sidebar Notifications" wide={true} border={null} />
        <Button
          label="Increment Notifications"
          mb={true}
          wide={true}
          color="success"
          onclick={() => {
            $pageStore.sidebar.notifications.sidebar++;
          }}
        />
        <Button
          label="Decrement Notifications"
          mb={true}
          wide={true}
          color="error"
          onclick={() => {
            if ($pageStore.sidebar.notifications.sidebar > 0) {
              $pageStore.sidebar.notifications.sidebar--;
            }
          }}
        />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="spinner" title="Spinner">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A Spinner shows that something is loading when you do not know how long th last will take to complete, or when
          the task will take a short enough time where a progress bar would be distracting.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">size</span></TableCell>
            <TableCell>Will set the length and width of the spinner in <code>REMs</code>. Defaults to 1.25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >The default color for the spinner is a light gray, but you can change this by passing in one of your
              color variables</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">style</span></TableCell>
            <TableCell>Add any valid inline <code>CSS</code></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "spinner")]} />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Spinner Demo" border={false} />

        <div>
          <Spinner />
          <Spinner size={2} color="primary" />
          <Spinner size={3} color="error" />
          <Spinner size={4} color="success" />
          <Spinner size={5} color="info" />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="switch" title="Switch">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="User Experience" border={false} />
        <p>
          The Switch is fundamentally the same element as the checkbox, but a better user experience for settings and
          preferences that a user should set.
        </p>
        <p>
          Switches also have a loading state, so they are a good option for togging a settings in a database without
          needing to click a save button.
        </p>
      </Card>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Switch" border={false} />
        <p>
          This is a basic switch that you might user to create your own component or in an Table Row. If you're looking
          for a switch for a form, you're better off using a <code>LabeledSwitch</code>
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >The ID for the switch. When used in a <code>Form</code> the id will be the name of the property in the data
              object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">disabled</span></TableCell>
            <TableCell>A boolean if this switch should be disabled or not</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick, onselect, onchange</span></TableCell>
            <TableCell
              >Bubbles will treat all of these the same. Write the function you want to occur when the switch is
              clicked.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>The value of the switch, add true for on or false for off</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "switch")]} />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <Switch
          value={true}
          onclick={(event) => {
            const value = event.currentTarget.value;

            document.getElementById("switch-example").textContent = value;
          }}
        />
        <div>
          The value of the switch is now:
          <span id="switch-example" />
        </div>
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="LabeledSwitch" border={false} />
        <p>
          The <code>LabeledSwitch</code> is best used in a Form because it provides some attributes to explain what the switch
          is for.
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >The ID for the switch. When used in a <code>Form</code> the id will be the name of the property in the data
              object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">disabled</span></TableCell>
            <TableCell>A boolean if this switch should be disabled or not</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick, onselect, onchange</span></TableCell>
            <TableCell
              >Bubbles will treat all of these the same. Write the function you want to occur when the switch is
              clicked.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>The value of the switch, add true for on or false for off</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label explains what the switch is for</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The description can be added to provide more context about this element. It can render inline html
              elements like anchor tags.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text to display if this field fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string needed for this element. For better user experience, the switch should generally
              not be required.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "labeled-switch")]} />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <LabeledSwitch
          label="Marketing Notifications"
          desc="We'll only send you notifications when something important happens."
          id="notifications.marketing"
          validation="boolean"
          value={true}
          onclick={(event) => {
            const value = event.currentTarget.value;
            const id = event.currentTarget.id;

            showLoading(id);

            setTimeout(() => {
              hideLoading(id);
            }, 2000);
          }}
        />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="table" title="Table">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="User Experience" border={false} />
        <p>
          The table is the main way to present data in Bubbles. Tables can be created with individual components,
          meaning you'll import <code>TableRow</code> and <code>TableCell</code>, or programmatically, meaning all of
          the data will be passed as a prop into the <code>Table</code>
        </p>

        <p>
          The Table is just make up of a TableHeader, where you can set the headings for rows. And TableRow's, which
          themselves are just an array of TableCells.
        </p>

        <p>
          If you're looking to add filters of pagination at the bottom of your table, you'll want to slot the Table into
          a Card, and add the CardHeader with filters and CardFooter with pagination
        </p>
      </Card>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="TableHeader" border={false} />
        <p>This is the top of the Table that explain what each of the column are.</p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">cells</span></TableCell>
            <TableCell
              >Cells are an array of Objects that will add text to the top of the table. The number of cells should
              match the numbers for TableCells that are in each TableRow</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">cell.label</span></TableCell>
            <TableCell
              >This is the text the user will see. Leave this blank or pass in <code>null</code> to add a blank cell. Useful
              if you have an icon or image in one of your TableCells.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">cell.align</span></TableCell>
            <TableCell
              >Normally cells are aligned to the left, but if you want to align the header to the right, pass in "right"
              or "end"</TableCell
            >
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="TableRow" border={false} />
        <p>
          The TableRow will have TableCells in it. You can set the TableCells as a component by importing <code
            >TableCell</code
          >
          or by passing in an array to the <code>cells</code> property of the TableRow
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell>You can set an ID for the row to reference it later</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell
              >The href value for the entire row. This is useful is you are using a Table for a settings menu, where you
              don't care where the user clicks. If you have a more complex cell, set the href on the cell, not the row.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell
              >You can run a function when the user clicks on the row. If you just want to take the user to a new page,
              use href because it will have better performance as the page with be prefetched.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">cells</span></TableCell>
            <TableCell
              >An array of cells to include in the row. You can pass the data in as a prop, or import the <code
                >TableCell</code
              >
              component and add as many as you need into the slot of the row.
              <strong>To view the props for the <code>TableCell</code> view the details in the next section.</strong
              ></TableCell
            >
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="TableCell" border={false} />
        <p>
          The cell that is inside of the <code>TableRow</code>. Like all of the other table components, you can add the
          data as props, or slot your own UI into the component.
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">text</span></TableCell>
            <TableCell>This will add a string of text to the cell</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell>Will cause the text to be an href</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">caption</span></TableCell>
            <TableCell>This will add a second line of text below in grey below the text</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">large</span></TableCell>
            <TableCell>Make the text in the cell large. Best used for simple tables like settings screens</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">bold</span></TableCell>
            <TableCell>Will make the text in this cell bold.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">align</span></TableCell>
            <TableCell>By default the text in the cell is left aligned, but you can change that to "right"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">img.src</span></TableCell>
            <TableCell
              >If you pass in an img, Bubbles will assume you want to add an image to the cell, like someone's profile
              picture. The image will be added and all text properties will be ignored.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">img.alt</span></TableCell>
            <TableCell>If you pass an image, add an alt tag for accessibility.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">tag</span></TableCell>
            <TableCell
              >You can add a tag into your cell. See the <a href="#tag">tag</a> section for more details.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">button</span></TableCell>
            <TableCell
              >If you add a button property, Bubbles will assume you want to add an <code>IconButton</code> to that
              cell. See the props needed for an icon button <a href="#button">here</a></TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "table-simple")]} />
      </Card>
    </Column>
    <Column>
      <Card>
        <CardHeader title="Settings Table Example" border={false} />
        <Table>
          <TableRow href="/#table">
            <TableCell text="Profile" large={true} bold={true} caption="Edit your profile and update your photo" />
            <TableCell button={{ icon: "arrowRight", href: "/#table" }} />
          </TableRow>
          <TableRow href="/#table">
            <TableCell text="Notifications" large={true} caption="Select how and went we message you" />
            <TableCell button={{ icon: "arrowRight", href: "/#table" }} />
          </TableRow>
          <TableRow href="/#table">
            <TableCell
              text="Billing"
              large={true}
              bold={true}
              caption="Edit your payment methods and see past transactions"
            />
            <TableCell button={{ icon: "arrowRight", href: "/#table" }} />
          </TableRow>
        </Table>

        <!-- <Table header={[{ label: "Label 1" }, { label: "Label 2", align: "end" }, { label: null, align: "end" }]} /> -->
      </Card>

      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "table-complex")]} />
      </Card>

      <Card>
        <CardHeader title="Complex Table Example" border={false} />
        <Table
          header={[
            { label: null },
            { label: "Name" },
            { label: "Weight" },
            { label: "Type(s)" },
            { label: "Possible Moves", align: "end" },
            { label: null, align: "end" },
          ]}
        >
          {#each _pokemon as poke}
            <TableRow>
              <TableCell img={{ src: poke?.sprites?.front_default, alt: "Sprite" }} />
              <TableCell text={poke.name} caption={`Pokedex Number: ${poke.id}`} bold={true} />
              <TableCell text={`${poke.weight} lbs`} />
              <TableCell rows={[[{ text: poke?.types[0]?.type?.name }, { text: poke?.types[1]?.type?.name }]]} />
              <TableCell tag={{ label: poke.moves.length, color: "primary", min_width: 2.75 }} align="right" />
              <TableCell
                button={{
                  icon: "more",
                  options: [
                    {
                      label: "Encounters",
                      href: poke.location_area_encounters,
                      caption: "Areas you can find this pokemon",
                    },
                    "break",
                    {
                      label: "View JSON",
                      href: poke.species.url,
                    },
                    {
                      label: "Shiny Sprite",
                      href: poke.sprites.front_shiny,
                    },
                  ],
                }}
              />
            </TableRow>
          {/each}
        </Table>
        <CardFooter>
          <Pagination {...pagination} />
        </CardFooter>
      </Card>
    </Column>
  </Row>
</Section>

<Section id="tag" title="Tag">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>The tag is a good way to accent what would be a text element. For example the status of something.</p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The text inside of that tag that the user will see</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >Select one of the color variables to color the tag. Like buttons you can pass a "-light" to use a light
              version of the tag or a "-border" for a tag with a border.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">small</span></TableCell>
            <TableCell
              >A boolean to make the tag small. By default this is false but is helpful if you are using it inline with
              text like in a Table.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">min_width</span></TableCell>
            <TableCell
              >Will make sure the tag maintains a minimum width value since cause the contents of the tag are very sort.
              You can pass a value in <code>rem</code> values. The default is 3.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">margin</span></TableCell>
            <TableCell
              >You can set margins for the tag using the css shorthand method. By default the top, right, bottom, and
              left values are set to <code>0 0 0 0</code>.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "tag")]} />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Regular Colors" border={false} />
        <div class="margin">
          <Tag color="primary" margin="1rem 0 1rem 0">primary</Tag>
          <Tag color="secondary" margin="1rem 0 1rem 0">secondary</Tag>
          <Tag color="error" margin="1rem 0 1rem 0">error</Tag>
          <Tag color="warning" margin="1rem 0 1rem 0">warning</Tag>
          <Tag color="success" margin="1rem 0 1rem 0">success</Tag>
          <Tag color="info" margin="1rem 0 1rem 0">info</Tag>
          <Tag color="gray" margin="1rem 0 1rem 0">gray</Tag>
          <Tag color="dark" margin="1rem 0 1rem 0">dark</Tag>
        </div>
      </Card>

      <Card>
        <CardHeader title="Light Colors" border={false} />
        <div class="margin">
          <Tag color="primary-light" label="primary-light" margin="1rem 0 1rem 0" />
          <Tag color="secondary-light" label="secondary-light" margin="1rem 0 1rem 0" />
          <Tag color="error-light" label="error-light" margin="1rem 0 1rem 0" />
          <Tag color="warning-light" label="warning-light" margin="1rem 0 1rem 0" />
          <Tag color="success-light" label="success-light" margin="1rem 0 1rem 0" />
          <Tag color="info-light" label="info-light" margin="1rem 0 1rem 0" />
          <Tag color="gray-light" label="gray-light" margin="1rem 0 1rem 0" />
          <Tag color="dark-light" label="dark-light" margin="1rem 0 1rem 0" />
        </div>
      </Card>

      <Card>
        <CardHeader title="Border Colors" border={false} />
        <div class="margin">
          <Tag color="primary-border" label="primary-border" margin="1rem 0 1rem 0" />
          <Tag color="secondary-border" label="secondary-border" margin="1rem 0 1rem 0" />
          <Tag color="error-border" label="error-border" margin="1rem 0 1rem 0" />
          <Tag color="warning-border" label="warning-border" margin="1rem 0 1rem 0" />
          <Tag color="success-border" label="success-border" margin="1rem 0 1rem 0" />
          <Tag color="info-border" label="info-border" margin="1rem 0 1rem 0" />
          <Tag color="gray-border" label="gray-border" margin="1rem 0 1rem 0" />
          <Tag color="dark-border" label="dark-border" margin="1rem 0 1rem 0" />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="toast" title="Toast">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Toast Container" border={false} />
        <p>
          The <code>ToastContainer</code> makes it easy to include <code>Toast</code>s in your app. Include the
          container in you <code>__layout.svelte</code> file, and then use the utility function
          <code>showToast<code> to add toasts to the page. </code></code>
        </p>
        <p>The container has no properties and will already show toasts at the top right of the screen.</p>
      </Card>
    </Column>

    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The toast is used to notify a user that some action took place. It's shown above all content and will persist
          a page navigation.
        </p>
        <p>The toasts can be dismissed by the user or will just gracefully fade away.</p>
        <p>
          Because toast messages can be initiated from just about any page or component, Bubbles recommends adding the <code
            >ToastContainer</code
          >
          component on the <code>__layout.svelte</code> page, and adding new toasts using the <code>showToast</code> utility
          function.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">message</span></TableCell>
            <TableCell>The text that the user will see.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >The color toast that you want to show. By default, the toast is "error" color, but another good option is
              "success"</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "toast")]} />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Toast Example" border={false} />

        <Form inputs={toastExampleFormInputs} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="validateInputs" title="validateInputs">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Some form elements have options to validate the inputs when blurred but other, like a checkbox, don't have a
          that. After a user submits a form, but before the request is made to your endpoint, you'll want to validate
          the inputs again to catch any errors.
        </p>
        <p>
          <strong
            >Front end validation is done for user experience, you should incorporate server side validation for the
            actual check, and never trust the data coming from a client.</strong
          >
        </p>

        <p>Error states will automatically be shown for any component that fails validation.</p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Response" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">inputs</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >The array of inputs you want to validate. These inputs should be declared in your <code>script</code> tag
              and passed into the <code>Form</code> element as a prop. The validation will look at the
              <code>validation</code> property of each input. Will return an Object with one property called
              <code>errors</code> which will be an array of input ID's that failed validation.</TableCell
            >
            <TableCell><span style="font-weight: 700"><code>Object.errors</code></span></TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "validate-inputs")]} />
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Validation Properties" border={false} />
        <p>
          You can see the validation properties that Bubbles supports. These are basic common validations but you're
          expected to have more sophisticated options server side.
        </p>

        <p>
          All of the validations are written as a string with a pipe separating all of the options you want to check.
        </p>
        <p>
          This was heavily inspired by the great library called <code>validatorjs</code>.
          <a href="https://www.npmjs.com/package/validatorjs">View here</a>. The one built into Bubbles is not as
          powerful, but is a much smaller size. Using <code>validatorjs</code> server side would be very easy as the validation
          strings are identical.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">required</span></TableCell>
            <TableCell>Makes the field required to be validated, meaning it must have a value.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">boolean</span></TableCell>
            <TableCell>The value must be a falsy or truthy value to pass validation.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">string</span></TableCell>
            <TableCell>The value must be a string</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">min</span></TableCell>
            <TableCell
              >The value must have a minimum value. If the value is a number is will make sure that number is greater
              than or equal to the min number. If the value is a string, it will check the length of the string. Set the
              value for min using a colon. To check a string with a minimum length of 8, such as for a password use <code
                >min:8</code
              >.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">max</span></TableCell>
            <TableCell
              >The same as min just for max values for numbers and strings. Set the same way using <code>max:100</code
              ></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">email</span></TableCell>
            <TableCell>Check that the value being validated is an email.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">numeric</span></TableCell>
            <TableCell
              >Will accept a value that is numeric. It will accept string values that are numeric such as "99".</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">array</span></TableCell>
            <TableCell>The value must be an array.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">url</span></TableCell>
            <TableCell>The value must be a url.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">alpha</span></TableCell>
            <TableCell>The value must only be alphabetic characters, a-z</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">alpha_dash</span></TableCell>
            <TableCell>Accepts alphabetical characters with dashes, slashes, and underscores.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">alpha_num</span></TableCell>
            <TableCell>The value must be alphabetical or numeric characters.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">accepted</span></TableCell>
            <TableCell>The value must be truthy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">integer</span></TableCell>
            <TableCell>The value must be an integer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">date</span></TableCell>
            <TableCell>The value must be a date value</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">regex</span></TableCell>
            <TableCell
              >Enter your own regex to check a field. Just like min an max, enter your value with a colon. <code
                >regex:/^(19|20)[\\d]{(2, 2)}$/</code
              ></TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>
</Section>

<Section id="getFormData" title="getFormData">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          After running <code>validateInputs</code> you will most likely want to get the data to end to and endpoint.
          <code>getFormData</code>
          will make an object with the same inputs that you passed into <code>validateInputs</code>.
        </p>

        <p>
          The properties of the object will be the ID's that you passed into the input. If you separated any ID's with a
          period, like <code>name.first</code> the property will be nested for you.
        </p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Response" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">inputs</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >The array of inputs you passed into the Form. You'll be calling with function within the <code
                >onsubmit</code
              > function of a button in the form.</TableCell
            >
            <TableCell><span style="font-weight: 700"><code>Object</code></span></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "get-form-data")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="showLoading" title="showLoading">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Whenever you use an <code>href</code> property, Bubbles will automatically show and hide loading states for
          you. However when you use <code>onclick</code>, <code>onselect</code>, <code>onchange</code>, etc properties,
          you need to tell bubbles what needs to show loading animations.
        </p>
        <p>
          Bubbles makes loading states imperative, meaning you control when to start and stop the loading animation.
          This is most commonly done because you are waiting for a promise, like when submitting a form.
        </p>

        <p>
          Every element that the user can interact with can accept an ID property. Use the <code>showLoading</code> function
          and pass in the ID of the element that needs to show a loading state.
        </p>

        <p>
          When your promise resolves, use <code>hideLoading</code> to stop the loading state by passing in the ID for the
          item that's loading.
        </p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Response" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The ID of the component that needs to show a loading state</TableCell>
            <TableCell><span style="font-weight: 700"><code>--</code></span></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "show-loading")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="hideLoading" title="hideLoading">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Just like <code>showLoading</code>, this will hide the loading animation for a component. Best to use this
          when your promise resolves.
        </p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Response" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The ID of the component you wish to stop loading</TableCell>
            <TableCell><span style="font-weight: 700"><code>--</code></span></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "hide-loading")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="showToast" title="showToast">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The toast is used to notify a user that some action took place. It's shown above all content and will persist
          a page navigation.
        </p>

        <p>The toasts can be dismissed by the user or will just gracefully fade away.</p>

        <p>
          Because toast messages can be initiated from just about any page or component, Bubbles recommends adding the <code
            >ToastContainer</code
          >
          component on the <code>__layout.svelte</code> page, and adding new toasts using the <code>showToast</code> utility
          function.
        </p>

        <p>The function will take two properties, the message you want to display and the color of the toast.</p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Default" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">message</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The messages you want the toast to display</TableCell>
            <TableCell>"An error occurred"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell
              >The color of the message you want to show. For best results, use "success" and "error".</TableCell
            >
            <TableCell>"error"</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "show-toast")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="showModal" title="showModal">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A Modal is basically a card that will sit on top of all content. It should only be used for actions that to
          user needs to take right now.
        </p>

        <p>
          Modals are set programmatically. Add the <code>Modal</code> component to your <code>__layout.svelte</code>
          file, and then use the helper functions <code>showModal</code> to bring up the modal. The
          <code>showModal</code> function will add the required components to a the <code>modalStore</code>. You can
          also programmatically hide the modal using the <code>hideModal</code> function.
        </p>

        <p>Generally, your modal will display a form or a message to the user with some buttons.</p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Default" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The title of the modal</TableCell>
            <TableCell><code>null</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>Object</code></span></TableCell>
            <TableCell>Options that the user can add to their modal</TableCell>
            <TableCell>--</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options.message</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The message you want the modal to display if any</TableCell>
            <TableCell><code>null</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options.form</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >An array of inputs that you want the modal to have it the user is meant to add data to a form.</TableCell
            >
            <TableCell><code>[ ]</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options.footer</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >You may want to add buttons to your modal that will be locked to the bottom of your modal. You can add an
              array of buttons here, either for the form or non form related buttons like ones to dismiss the modal.</TableCell
            >
            <TableCell><code>[ ]</code></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "modal")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="hideModal" title="hideModal">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Because there can only be one <code>Modal</code> at a time, you can call the <code>hideModal</code> function from
          anywhere and it will hide the currently active modal.
        </p>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "modal")]} />
      </Card>
    </Column>
  </Row>
</Section>

<style>
  h2 {
    margin-bottom: 1rem;
  }
  h6,
  p {
    margin-bottom: 1rem;
    color: var(--gray-darker);
  }

  section p:first-of-type {
    margin-top: 2rem;
  }

  .d-flex {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .margin > * {
    margin-bottom: 0.75rem;
  }
</style>
