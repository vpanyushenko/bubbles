<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./divider.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Divider from "$lib/components/divider/Divider.svelte";
</script>

<Section id="divider" title="Divider">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Divider" border={false} />
        <p>
          The divider is just a horizontal line the divides content. This component also allows you to add text to the
          line.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>If you add a label, text will show up nicely in the middle of the line.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard1 />
      </Card>
    </Column50>

    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <div class="d-flex">
          <Divider label="TEXT IN THE MIDDLE" />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>
