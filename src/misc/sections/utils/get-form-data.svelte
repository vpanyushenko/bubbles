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
          <TableHeader cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }]} />
          <TableRow>
            <TableCell mobile_width={100}><span style="font-weight: 700">inputs</span></TableCell>
            <!-- <TableCell mobile_width={100}><span style="font-weight: 700"><code>array</code></span></TableCell> -->
            <TableCell mobile_width={100}
              >The array of inputs you passed into the Form. You'll be calling with function within the <code
                >onsubmit</code
              > function of a button in the form.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell mobile_width={100}><span style="font-weight: 700">options?</span></TableCell>
            <!-- <TableCell mobile_width={100}><span style="font-weight: 700"><code>Object</code></span></TableCell> -->
            <TableCell mobile_width={100}>Options you can pass to this function. All are optional.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell mobile_width={100}><span style="font-weight: 700">option.include_hidden_props</span></TableCell>
            <!-- <TableCell mobile_width={100}><span style="font-weight: 700"><code>Boolean</code></span></TableCell> -->
            <TableCell mobile_width={100}>
              Defaults to <code>false</code>. If you want to include hidden inputs in the form data. Hidden inputs are
              only those that were removed from the DOM using the <code>hidden_if</code> property on the
              <code>Form</code></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell mobile_width={100}><span style="font-weight: 700">option.hidden_prop_values</span></TableCell>
            <!-- <TableCell mobile_width={100}
              ><span style="font-weight: 700"><code>String|Number|Boolean</code></span></TableCell
            > -->
            <TableCell mobile_width={100}>
              Defaults to <code>null</code>. If you do want to include hidden inputs in your data (which you normally
              should not since your backend would normally take care of those cases) you can specify what value you want
              the input to have.
              <br />
              <br />
              By default, the value will be <code>null</code> but you can change it to whatever you'd like. If you want
              to value to be set to whatever value the input currently has (not recommended), you can set this property
              to <code>"**"</code>.
            </TableCell>
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
