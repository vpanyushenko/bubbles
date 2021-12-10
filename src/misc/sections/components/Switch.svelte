<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./switch.md";
  import CodeCard2 from "./switch-labeled.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Switch from "$lib/components/switch/Switch.svelte";
  import LabeledSwitch from "$lib/components/switch/LabeledSwitch.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";
</script>

<Section id="switch" title="Switch">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="User Experience" border={false} />
        <p>
          The Switch is fundamentally the same element as the checkbox, but a better user experience for settings and
          preferences that a user should set.
        </p>
        <p>
          Switches also have a loading state, so they are a good option for togging a settings in a database without
          needing to click a save button.
        </p>
      </Card>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Switch" border={false} />
        <p>
          This is a basic switch that you might user to create your own component or in an Table Row. If you're looking
          for a switch for a form, you're better off using a <code>LabeledSwitch</code>
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >The ID for the switch. When used in a <code>Form</code> the id will be the name of the property in the data
              object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">disabled</span></TableCell>
            <TableCell>A boolean if this switch should be disabled or not</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick, onselect, onchange</span></TableCell>
            <TableCell
              >Bubbles will treat all of these the same. Write the function you want to occur when the switch is
              clicked.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>The value of the switch, add true for on or false for off</TableCell>
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
        <Switch
          value={true}
          onclick={(event) => {
            const value = event.currentTarget.value;

            document.getElementById("switch-example").textContent = value;
          }}
        />
        <div>
          The value of the switch is now:
          <span id="switch-example" />
        </div>
      </Card>
    </Column50>
  </Row>

  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="LabeledSwitch" border={false} />
        <p>
          The <code>LabeledSwitch</code> is best used in a Form because it provides some attributes to explain what the switch
          is for.
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >The ID for the switch. When used in a <code>Form</code> the id will be the name of the property in the data
              object.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">disabled</span></TableCell>
            <TableCell>A boolean if this switch should be disabled or not</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick, onselect, onchange</span></TableCell>
            <TableCell
              >Bubbles will treat all of these the same. Write the function you want to occur when the switch is
              clicked.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>The value of the switch, add true for on or false for off</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The label explains what the switch is for</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >The description can be added to provide more context about this element. It can render inline html
              elements like anchor tags.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell>The error text to display if this field fails validation</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string needed for this element. For better user experience, the switch should generally
              not be required.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard2 />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Demo" border={false} />
        <LabeledSwitch
          label="Marketing Notifications"
          desc="We'll only send you notifications when something important happens."
          id="notifications.marketing"
          validation="boolean"
          value={true}
          onclick={(event) => {
            const value = event.currentTarget.value;
            const id = event.currentTarget.id;

            showLoading(id);

            setTimeout(() => {
              hideLoading(id);
            }, 2000);
          }}
        />
      </Card>
    </Column50>
  </Row>
</Section>
