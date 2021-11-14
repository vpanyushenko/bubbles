<script context="module">
  export const prerender = true;
</script>

<script>
  import snarkdown from "snarkdown";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  let md = "_this_ is **easy** to `use`.";
  let html = snarkdown(md);
</script>

<svelte:head>
  <title>Bubbles UI Kit</title>
</svelte:head>

<Header title="Welcome" />

<!-- {@html snarkdown(md)}
{@html html} -->

<section>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Who should and shouldn't use bubbles?" />
        <p class="mt-2">
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
</section>

<section id="#installation">
  <Row>
    <Column>
      <h2>Installation</h2>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Download from NPM" />
        <p class="mt-2">
          Install Bubbles into your project using <code>npm install bubbles-ui</code>. When you're doing your final
          build, any components that you are not using will not be included in your bundle.
        </p>
      </Card>
    </Column>
  </Row>
</section>

<section id="usage">
  <Row>
    <Column>
      <h2>Usage</h2>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Components and Utilities" />
        <p class="mt-2">
          All of the components and utility functions can be imported directly from <code>bubbles-ui</code>. The only
          caveat is a global css module that you'll want to import either in a global <code>__layout.svelte</code> file
          or reference in the root <code>app.html</code> which is imported from <code>bubbles-ui/css/app.css</code>
        </p>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Default Config" />
        <p class="mt-2">
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

      <Card>
        <CardHeader title="Code Example" />
        <!-- prettier-ignore -->
        <pre>
          <code>
            <!-- <span>import {defaultConfig} from "bubbles-ui"</span> -->
            ```
              //test
            ```
          </code>
        </pre>
      </Card>
    </Column>
  </Row>`
</section>

<section id="colors">
  <Row>
    <Column>
      <h2>Colors</h2>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Customize Colors" />
        <p class="mt-2">
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
            <TableCell><span style="color: var(--primary-lighter) font-weight: 700">#B5AEE9</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-light</TableCell>
            <TableCell><span style="color: var(--primary-light) font-weight: 700">#9186DE</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary</TableCell>
            <TableCell><span style="color: var(--primary) font-weight: 700">#6C5DD3</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-dark</TableCell>
            <TableCell><span style="color: var(--primary-dark) font-weight: 700">#50459E</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darker</TableCell>
            <TableCell><span style="color: var(--primary-darker) font-weight: 700">#352E69</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darkerest</TableCell>
            <TableCell><span style="color: var(--primary-darkest) font-weight: 700">#1B1734</span></TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Color Options" />
        <p class="mt-2">
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
        <p class="mt-2">
          In your <code>Sidebar</code> component, you have the option to include icons. Bubbles will calculate a filter
          based on your primary color to make sure the icon will hover with the same color. To make sure this filter is
          calculated correctly, the icon used should be black. While using <code>SVGs</code> is encouraged, you can use
          a
          <code>PNG</code> and get the same effect.
        </p>
      </Card>
    </Column>
  </Row>
</section>

<section id="page-layouts">
  <Row>
    <Column>
      <h2>Page Layouts</h2>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Basic Structure" />
        <p class="mt-2">
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
              >If you page includes a <code>Sidebar</code> component, you'll want to include that in the
              <code>__layout.svelte</code> file.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell>primary-lighter</TableCell>
            <TableCell><span style="color: var(--primary-lighter) font-weight: 700">#B5AEE9</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-light</TableCell>
            <TableCell><span style="color: var(--primary-light) font-weight: 700">#9186DE</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary</TableCell>
            <TableCell><span style="color: var(--primary) font-weight: 700">#6C5DD3</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-dark</TableCell>
            <TableCell><span style="color: var(--primary-dark) font-weight: 700">#50459E</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darker</TableCell>
            <TableCell><span style="color: var(--primary-darker) font-weight: 700">#352E69</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darkerest</TableCell>
            <TableCell><span style="color: var(--primary-darkest) font-weight: 700">#1B1734</span></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>
</section>

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

  .mt-2 {
    margin-top: 2rem;
  }
</style>
