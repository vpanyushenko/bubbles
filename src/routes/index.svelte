<script context="module">
  import { importMarkdown } from "$misc/read-markdown";

  export const prerender = true;

  export async function load() {
    const markdown = importMarkdown();
    return {
      props: {
        data: markdown,
      },
    };
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

  import { pageStore } from "$lib/stores/page.store";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { validateInputs, getFormData } from "$lib/utils/form";
  import { showToast } from "$lib/utils/toast";

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
      id: "role",
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
      id: "number",
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

  export let data = { modules: [], metadata: [], markdown: [] };

  console.log(data.markdown);
  console.log(data.metadata);

  $pageStore.title = "Welcome";
</script>

<svelte:head>
  <title>Bubbles UI Kit</title>
</svelte:head>

<Header />

<Section id="/">
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
          You can import a store called <code>configStore</code> into your inital <code>__layout.svelte</code> file to set
          some default behaviors for Bubbles. You can view the table below for all of the default options:
        </p>

        <Table>
          <TableHeader header={[{ label: "Property" }, { label: "Description" }, { label: "Default" }]} />
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
          <TableHeader header={[{ label: "Variable" }, { label: "Description" }, { label: "Default" }]} />
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
          <TableHeader labels={[{ label: "Component" }, { label: "Description" }]} />
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
          <TableHeader labels={[{ label: "Component" }, { label: "Description" }]} />
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
          <TableHeader labels={[{ label: "Component" }, { label: "Description" }]} />
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
          any columns. This is usefuil for making something like a Auth section.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Component" }, { label: "Description" }]} />
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
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Button" border={false} />
        <p>
          The <code>Button</code> is a standard button component. It has a text label and can run functions when clicked.
          Below are the properties that you can add to this button.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
              >If this button will taking a user to a different page, use href insead of directing them to the page with
              onclick. This will prefetch the data on hover to make the navigation faster.</TableCell
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
            <TableCell>The bottom margin. Ideally set it in rem vaues</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "button")]} />
      </Card>
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
      </Card>
    </Column50>
  </Row>
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="IconButton" border={false} />
        <p>
          The <code>IconButton</code> is a circular button. It's best used in places like a <code>Header</code>,
          <code>Card</code>, or <code>Table</code> component. They have some cool features like the option to show a
          dropdown, pretty common when you add a <code>more</code> icon.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
              >If this button will taking a user to a different page, use href insead of directing them to the page with
              onclick. This will prefetch the data on hover to make the navigation faster,</TableCell
            >
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
              >If this button will taking a user to a different page, use href insead of directing them to the page with
              onclick. This will prefetch the data on hover to make the navigation faster.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "icon-buttons")]} />
      </Card>

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
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card" border={false} />
        <p>
          These are the sections that make up your application. All of the outlined and dark code sections of this
          knowledgebase are made of cards.
        </p>
        <p>
          The card will take some properties to figure out it's visual appearence. The main content of the <code
            >Card</code
          >
          typically a <code>Form</code> or <code>Table</code> will be added as a
          <code>slot</code> into the card.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
              example for shwo this works, but this is useful if you're adding dynamic cards to the page.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">footer</span></TableCell>
            <TableCell
              >You are able to set the card footer as a prop instead of adding it as a component into the slot. See the
              example for shwo this works, but this is useful if you're adding dynamic cards to the page.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "card")]} />
      </Card>
    </Column50>
  </Row>
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card Header" border={false} />
        <p>
          The <code>CardHeader</code> is fixed to the top of the card and will contain things like the title, action buttons,
          and filters.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell
              >The main prop that you will usually include in your card. This will be the title that descibes the
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
              by passing <code>false</code> to thsi propery.
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
            <TableCell><span style="font-weight: 700">fitlers</span></TableCell>
            <TableCell
              >An array of filters that should be used if you have a <code>Table</code> inside of you card and want to
              filter the data. The Filters are a special type of <code>Select</code> that will modify urls query params,
              which will cause Svelte to refetch the data required.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "card-header")]} />
      </Card>
    </Column50>
  </Row>
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card Footer" border={false} />
        <p>
          The <code>CardFooter</code> is fixed to the bottom of the card and will contain pagination if required.
        </p>

        <p><strong>The CardFooter component is not yet completed.</strong></p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">pagination</span></TableCell>
            <TableCell
              >Will add the <code>Pagination</code> component. Useful if you have Table component slotted in the Card.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "card-footer")]} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="checkboxes" title="Checkboxes">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Checkbox" border={false} />
        <p>
          The single checkbox is best used in a Table. If you're making a Form with some options for a user to select
          from, use the <code>CheckboxGroup</code> component.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "checkbox")]} />
      </Card>

      <Card>
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
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Labeled Checkbox" border={false} />
        <p>
          This is usually a component you would want to include inside a form if you wanted the user to agree to
          something like terms and conditions. The labeled checkbox includes a label, description field, and validation.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "labeled-checkbox")]} />
      </Card>

      <Card>
        <CardHeader title="Demo" border={false} />
        <LabeledCheckbox {...labeledCheckbox} />
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Checkbox Group" border={false} />
        <p>
          This is a component to include in a form when you want to user to select one or more options. If you want the
          user to only select one options, look into a <code>RadioGroup</code> instead.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "checkbox-group")]} />
      </Card>

      <Card>
        <CardHeader title="Demo" border={false} />
        <CheckboxGroup {...checkboxGroup} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="divider" title="Divider">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Divider" border={false} />
        <p>
          The divider is just a horizontal line the divders content. This component also allows you to add text to the
          line.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>If you add a label, text will show up nicely in the middle of the line.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "divider")]} />
      </Card>

      <Card>
        <CardHeader title="Demo" border={false} />
        <div class="d-flex">
          <Divider label="TEXT IN THE MIDDLE" />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="form" title="Form">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Form" border={false} />
        <p>
          Your form data is probably a mix of some JS Objects / JSON and an inital fetch request to get existing data
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
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">inputs</span></TableCell>
            <TableCell
              >An array of input values that you want to add. See the individal articles for inputs like <code
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
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "form")]} />
      </Card>

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
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Header" border={false} />
        <p>
          The Header is the element that is at the top of the page. This is typically have a large title, a back buttons
          if needed, and breadcrumbs. If you need any action items, you can add those too.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
            <TableCell><span style="font-weight: 700">buttons</span></TableCell>
            <TableCell
              >Buttons are an array of <code>IconButton</code>s that will show up on the right side of the header.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "header")]} />
      </Card>

      <!-- <Card>
        <CardHeader title="Demo" border={false} />
        <div class="d-flex">
          <Header title="header" />
        </div>
      </Card> -->
    </Column50>
  </Row>
</Section>

<Section id="input" title="Input">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Header" border={false} />
        <p>
          All of the text based inputs are housed under one <code>Input</code> component. You can specify the type of
          input that you want to use using the <code>type</code> property.
        </p>

        <p>
          With Bubbles, you'll normally never actually import any <code>Input</code> components, you'll just programatically
          add them directly to the Form.
        </p>
      </Card>
    </Column>
  </Row>
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Text" border={false} />
        <p>
          All of the text based inputs are housed under one <code>Input</code> component. You can specify the type of
          input that you want to use using the <code>type</code> property.
        </p>

        <Table>
          <TableHeader labels={[{ label: "Property" }, { label: "Description" }]} />
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
              >The label that will descible what information needs to be entered. Will float up when the input is in
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
              >This will be the small text below the input to describle it in more detail. It supports html so you can
              add anchor tags that will get rendered correctly.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>The value for this input it you want to prefill it.</TableCell>
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
              >Specifiies the height in rows to be used. It's used only with the <code>textarea</code> input type.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">typeahead</span></TableCell>
            <TableCell>//TODO</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "header")]} />
      </Card>

      <!-- <Card>
        <CardHeader title="Demo" border={false} />
        <div class="d-flex">
          <Header title="header" />
        </div>
      </Card> -->
    </Column50>
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

  p {
    font-size: 1rem;
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
</style>
