<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./radio.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import RadioGroup from "$lib/components/radio/RadioGroup.svelte";
</script>

<Section id="radio" title="Radio">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Like a <code>Checkbox</code> a radio let's a user chose from one of multiple options. Fundamentally you get the
          same results using Bubbles with the radio and select elements.
        </p>

        <p>The best practice if to use the radio in forms and times when the user has less options to choose from.</p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >You can assign an id to the radio group. When used in a form, the ID will be the name of the property in
              the data object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>If you want one of the options to pre pre-selected</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text to show if this element fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label that describes what the user is selecting</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >A longer, detailed explanation of the options that this user has. Supports parsing html elements in the
              string.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell>Add the required validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell>An array of options the user can chose from</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.value</span></TableCell>
            <TableCell>The value of the option. This is the value that will be passed to the form data</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.label</span></TableCell>
            <TableCell>This is what the user see's while selecting the option</TableCell>
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
        <CardHeader title="Radio Group" border={false} />

        <RadioGroup
          id="sandwich.type"
          value="burger"
          error="Please select an option"
          label="Choose sandwich"
          validation="required|string"
          desc="This is the longer description for the RadioGroup if you think it needs more explanation. You can add html elements like <a href='https://google.com' target='blank'>links</a>."
          options={[
            {
              label: "Burger",
              value: "burger",
            },
            {
              label: "Hot Dog",
              value: "hd",
            },
            {
              label: "Grilled Cheese",
              value: "gc",
            },
          ]}
        />
      </Card>
    </Column50>
  </Row>
</Section>
