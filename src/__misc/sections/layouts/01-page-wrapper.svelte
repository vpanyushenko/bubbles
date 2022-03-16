<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./01-page-wrapper.md";

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

<Section id="page-wrapper" title="Page Wrapper">
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
        <CodeCard1 />
      </Card>
    </Column>
  </Row>
</Section>
