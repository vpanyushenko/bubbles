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
  import { pageStore } from "$lib/stores/page.store";

  import Button from "$lib/components/button/Button.svelte";

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
        <CardHeader title="Who should and shouldn't use Bubbles" />
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
        <CardHeader title="Download from NPM" />
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
        <CardHeader title="Components and Utilities" />
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
        <CardHeader title="Default Config" />
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
      <Card color="dark" mx={0} my={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "default-config")]} />
      </Card>
    </Column50>
  </Row>`
</Section>

<Section id="colors" title="Colors">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Customize Colors" />
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
        <CardHeader title="Color Options" />
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
        <CardHeader title="Icon Colors" />
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

<Section id="page-wrappers" title="Page Layouts">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true} height100={true}>
        <CardHeader title="Basic Structure" />
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
      <Card color="dark" mx={0} my={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-wrappers")]} />
      </Card>
    </Column>
  </Row>
</Section>

<Section id="page-rows" title="Page Rows">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true} height100={true}>
        <CardHeader title="Options" />
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
      <Card color="dark" mx={0} my={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-rows")]} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="page-columns" title="Page Columns">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true} height100={true}>
        <CardHeader title="Options" />
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
      <Card color="dark" mx={0} my={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-columns")]} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="page-grids" title="Page Grid">
  <Row>
    <Column100>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Details" />
        <p>Page grid is in progress...</p>
      </Card>
    </Column100>
  </Row>
</Section>

<Section id="page-center" title="Page Center">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Options" />
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
      <Card color="dark" mx={0} my={0} height100={true}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "page-center")]} />
      </Card>
    </Column50>
  </Row>
</Section>

<Section id="buttons" title="Buttons">
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Button" />
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
              >Pass the name of the color variable you want for the button. For example, "primary" or "error".</TableCell
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
              to the submit event,</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell
              >If this button will taking a user to a different page, use href insead of directing them to the page with
              onclick. This will prefetch the data on hover to make the navigation faster,</TableCell
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
      <Card color="dark" mx={0} my={0}>
        <svelte:component this={data.markdown[data.metadata.findIndex((a) => a?.component === "button")]} />
      </Card>
      <Card>
        <CardHeader title="Button colors" />
        <Button mt="1rem" wide={true} label="Primary" color="primary" />
        <Button mt="1rem" wide={true} label="Secondary" color="secondary" />
        <Button mt="1rem" wide={true} label="Success" color="success" />
        <Button mt="1rem" wide={true} label="Error" color="error" />
        <Button mt="1rem" wide={true} label="Warning" color="warning" />
        <Button mt="1rem" wide={true} label="Info" color="info" />
        <Button mt="1rem" wide={true} label="Gray" color="gray" />
        <Button mt="1rem" mb="1rem" wide={true} label="Dark" color="dark" />
      </Card>
      <Card>
        <CardHeader title="Different button styles" />
        <Button mt="2rem" wide={true} label="Primary" color="primary" />
        <Button mt="1rem" wide={true} label="Primary Border" color="primary-border" />
        <Button mt="1rem" mb="1rem" wide={true} label="Primary Light" color="primary-light" />
      </Card>
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

  :global(section p:first-of-type) {
    margin-top: 2rem;
  }
</style>
