<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./hide-loading.md";

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
        <CodeCard1 />
      </Card>
    </Column>
  </Row>
</Section>
