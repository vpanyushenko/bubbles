<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./error.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";
</script>

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
        <CodeCard1 />
      </Card>
    </Column>
  </Row>
</Section>
