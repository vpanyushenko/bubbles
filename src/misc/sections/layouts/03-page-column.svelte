<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./03-page-column.md";

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

<Section id="page-column" title="Page Column">
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
              <strong>You should not use this for more than two columns.</strong></TableCell
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
        <CodeCard1 />
      </Card>
    </Column50>
  </Row>
</Section>
