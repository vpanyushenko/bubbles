<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./select.md";

  import icon_circle from "$misc/img/circle.svg";
  import icon_square from "$misc/img/square.svg";
  import icon_triangle from "$misc/img/triangle.svg";
  import icon_pentagon from "$misc/img/pentagon.svg";
  import icon_star from "$misc/img/star.svg";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Select from "$lib/components/select/Select.svelte";
</script>

<Section id="select" title="Select">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>The select element lets the user select from one of multiple options.</p>
        <p>
          While there are multi select elements, Bubbles currently does not support multi-select <code>Select</code>
          elements. Many arguments can be made that this is incorrect, but the current thinking is that a
          <code>CheckboxGroup</code> is a better user experience.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >The ID for the select. When used in a <code>Form</code> the id will be the name of the property in the data
              object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell
              >If you want to set a default value for the select. This value will need to match one of the values of
              your <code>options</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label shown to the user that will describe what the user is selecting</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text that will be displayed if this element fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The option to add more text to explain the option the user is selecting in more detail. This element
              allows you to include html elements, so you can add an outbound link with an anchor tag.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">type</span></TableCell>
            <TableCell
              >The default type is <code>select</code> but if it's really important for you to have values that are
              numbers, you can change the type to <code>select-number</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell>The validation string. See the utils section for all of the validation fields.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validate_on_blur</span></TableCell>
            <TableCell>Will run validation when the element loses focus</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">vob</span></TableCell>
            <TableCell
              >An alias for <code>validate_on_blur</code> for those who want to type less. You can use either option.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">search</span></TableCell>
            <TableCell
              >If you want the select element to be searchable. By default, if you have more than 5 options, the search
              will be turned on. You can override this behavior by settings the value to a boolean.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell>An array of options for the user to choose from</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.img</span></TableCell>
            <TableCell>An image that will be displayed on the left of the text</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.label</span></TableCell>
            <TableCell>The label that the user will see when select the option</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.caption</span></TableCell>
            <TableCell>A second line to give more detail about the option</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.value</span></TableCell>
            <TableCell>The actual value that will be selected.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.icon</span></TableCell>
            <TableCell
              >An icon to display on the right. Defaults to an arrow. You can remove this by setting this value to <code
                >null</code
              ></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.onselect</span></TableCell>
            <TableCell>A function that can be run if this option is selected</TableCell>
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
        <Select
          id="select_example"
          value={null}
          label="Select a shape"
          error="Please select a shape"
          desc="This is the description that will be below the select element. Any description field can render inline html elements."
          type="select"
          validation="required|string"
          vob={true}
          options={[
            {
              label: "Circle",
              value: "circle",
              caption: "No corners!",
              img: icon_circle,
            },
            "break",
            {
              label: "Square",
              value: "square",
              img: icon_square,
            },
            {
              label: "Pentagon",
              value: "pent",
              img: icon_pentagon,
              onselect: () => {
                console.log("Whoa, you like pentagons?");
              },
            },
            {
              label: "Triangle",
              value: "tri",
              img: icon_triangle,
            },
            {
              label: "Star",
              value: "star",
              img: icon_star,
            },
            {
              label: "No Icon Shape",
              value: null,
            },
            {
              label: "Empty String Value",
              value: "",
            },
          ]}
        />
      </Card>
    </Column50>
  </Row>
</Section>
