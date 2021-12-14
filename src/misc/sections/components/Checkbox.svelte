<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./checkbox.md";
  import CodeCard2 from "./checkbox-labeled.md";
  import CodeCard3 from "./checkbox-group.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Checkbox from "$lib/components/checkbox/Checkbox.svelte";
  import LabeledCheckbox from "$lib/components/checkbox/LabeledCheckbox.svelte";
  import CheckboxGroup from "$lib/components/checkbox/CheckboxGroup.svelte";

  const labeledCheckbox = {
    id: "tos",
    value: null,
    label: "Terms of Service",
    desc: `You can view more details about our terms of service and privacy policy <a href="https://google.com">at this link</a>.`,
    error: "You have not accepted the terms of service.",
    validation: "required|boolean",
  };

  const checkboxGroup = {
    id: "toppings",
    options: [
      {
        label: "Pepperoni",
        value: "pepperoni",
      },
      {
        label: "Cheddar Cheese",
        value: "cheese",
      },
      {
        label: "Small Mushrooms",
        value: "mushrooms",
      },
    ],
    value: ["pepperoni"],
    label: "Select Toppings",
    desc: `You may select as many toppings as you would like.`,
    error: "Something went wrong",
    validation: "array",
  };
</script>

<Section id="checkbox" title="Checkbox">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Checkbox" border={false} />
        <p>
          The single checkbox is best used in a Table. If you're making a Form with some options for a user to select
          from, use the <code>CheckboxGroup</code> component.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>add a boolean value, either <code>true</code>true or <code>false</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onchange</span></TableCell>
            <TableCell>You can add a function when the value of the checkbox changes.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <CodeCard1 />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Checkbox Demo" border={false} />
        <div>
          <Checkbox
            value={true}
            onchange={() => {
              alert("Value Changed");
            }}
          />
        </div>
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Labeled Checkbox" border={false} />
        <p>
          This is usually a component you would want to include inside a form if you wanted the user to agree to
          something like terms and conditions. The labeled checkbox includes a label, description field, and validation.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >If you're using this inside of the form, you'll want to include the id value, which will be the property
              value in JSON data when the form is submitted.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>add a boolean value, either <code>true</code>true or <code>false</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label you want explaining what the checkbox is</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The option to add more text to explain the option the user is selecting in more detail. This element
              allows you to include html elements, so you can add an outbound link with an anchor tag.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text you want to show if this item fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string you want to use for this form. See the validation article in the Utils section for
              more info.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">form_indent</span></TableCell>
            <TableCell>By default this is <code>true</code> which will cause this element to be indented.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <CodeCard2 />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <LabeledCheckbox {...labeledCheckbox} />
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Checkbox Group" border={false} />
        <p>
          This is a component to include in a form when you want to user to select one or more options. If you want the
          user to only select one options, look into a <code>RadioGroup</code> instead.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >If you're using this inside of the form, you'll want to include the id value, which will be the property
              value in JSON data when the form is submitted.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell
              >An array that will contain the options the user can select. Each option can have a label, that the user
              will see, and a value, which is not shown to the user but will be added to the Form JSON.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell
              >The value is an <code>array</code> because you can have multiple selected. The array will be the labels for
              each of the options that are selected</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label you want explaining what the checkbox is</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The option to add more text to explain the option the user is selecting in more detail. This element
              allows you to include html elements, so you can add an outbound link with an anchor tag.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text you want to show if this item fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string you want to use for this form. See the validation article in the Utils section for
              more info.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">form_indent</span></TableCell>
            <TableCell>By default this is <code>true</code> which will cause this element to be indented.</TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <CodeCard3 />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Demo" border={false} />
        <CheckboxGroup {...checkboxGroup} />
      </Card>
    </Column50>
  </Row>
</Section>
