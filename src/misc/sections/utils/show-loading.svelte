<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./show-loading.md";

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

<Section id="showLoading" title="showLoading">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Whenever you use an <code>href</code> property, Bubbles will automatically show and hide loading states for
          you. However when you use <code>onclick</code>, <code>onselect</code>, <code>onchange</code>, etc properties,
          you need to tell bubbles what needs to show loading animations.
        </p>
        <p>
          Bubbles makes loading states imperative, meaning you control when to start and stop the loading animation.
          This is most commonly done because you are waiting for a promise, like when submitting a form.
        </p>

        <p>
          Every element that the user can interact with can accept an ID property. Use the <code>showLoading</code> function
          and pass in the ID of the element that needs to show a loading state.
        </p>

        <p>
          When your promise resolves, use <code>hideLoading</code> to stop the loading state by passing in the ID for the
          item that's loading.
        </p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Response" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The ID of the component that needs to show a loading state</TableCell>
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
