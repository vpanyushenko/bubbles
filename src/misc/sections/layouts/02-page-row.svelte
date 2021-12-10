<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./02-page-row.md";

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

<Section id="page-row" title="Page Row">
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
        <CodeCard1 />
      </Card>
    </Column50>
  </Row>
</Section>
