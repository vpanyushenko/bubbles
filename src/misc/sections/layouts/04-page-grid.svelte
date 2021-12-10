<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./04-page-grid.md";

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

<Section id="page-grid" title="Page Grid">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Details" border={false} />
        <p>Page grid is in progress...</p>
      </Card>
    </Column>
  </Row>
</Section>
