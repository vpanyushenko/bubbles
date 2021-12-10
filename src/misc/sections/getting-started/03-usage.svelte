<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./03-usage.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
</script>

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

        <p>
          <strong
            >There is a current limitation with svelte kit that the <code>goto</code> function from
            <code>app/navigation</code> cannot be bundled into the UI Kit. You will need to pass a reference to this function
            here.</strong
          >
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
          <TableRow>
            <TableCell><code>debug</code></TableCell>
            <TableCell>We'll show you if there is any issue caused by the Bubbles package</TableCell>
            <TableCell><code>true</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span><code>goto</code></span></TableCell>
            <TableCell
              ><span>This accept the <code>goto</code> function imported from <code>app/navigation</code>.</span
              ></TableCell
            >
            <TableCell><span><code>null</code></span></TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column50>

    <Column50>
      <CodeCard1 />
    </Column50>
  </Row>`
</Section>

<style>
  strong {
    color: var(--primary);
  }

  span {
    color: var(--primary);
  }
</style>
