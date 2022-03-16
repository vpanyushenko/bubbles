<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./05-page-center.md";

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
        <CodeCard1 />
      </Card>
    </Column50>
  </Row>
</Section>
