<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./spinner.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Spinner from "$lib/components/spinner/Spinner.svelte";
</script>

<Section id="spinner" title="Spinner">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A Spinner shows that something is loading when you do not know how long th last will take to complete, or when
          the task will take a short enough time where a progress bar would be distracting.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">size</span></TableCell>
            <TableCell>Will set the length and width of the spinner in <code>REMs</code>. Defaults to 1.25</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >The default color for the spinner is a light gray, but you can change this by passing in one of your
              color variables</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">style</span></TableCell>
            <TableCell>Add any valid inline <code>CSS</code></TableCell>
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
        <CardHeader title="Spinner Demo" border={false} />

        <div>
          <Spinner />
          <Spinner size={2} color="primary" />
          <Spinner size={3} color="error" />
          <Spinner size={4} color="success" />
          <Spinner size={5} color="info" />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>
