<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./get-form-data.md";

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

<Section id="getFormData" title="getFormData">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          After running <code>validateInputs</code> you will most likely want to get the data to end to and endpoint.
          <code>getFormData</code>
          will make an object with the same inputs that you passed into <code>validateInputs</code>.
        </p>

        <p>
          The properties of the object will be the ID's that you passed into the input. If you separated any ID's with a
          period, like <code>name.first</code> the property will be nested for you.
        </p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Response" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">inputs</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >The array of inputs you passed into the Form. You'll be calling with function within the <code
                >onsubmit</code
              > function of a button in the form.</TableCell
            >
            <TableCell><span style="font-weight: 700"><code>Object</code></span></TableCell>
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
