<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./segmented-controller.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import SegmentedController from "$lib/components/segmented-controller/SegmentedController.svelte";

  let active = "1";
</script>

<Section id="segmented-controller" title="Segmented Controller">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>The segmented controller is a series of buttons for dividing elements on the same page.</p>
        <p>
          The segment will automatically transform into a select element when the screen is too small to support the
          full width bar.
        </p>
        <p>
          This relies on binding the the <code>innerWidth</code> of the window. If you are using the device toggle in your
          browser dev tools, the segmented controller will not respond correctly
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">segments</span></TableCell>
            <TableCell>This is an array of options for all of the buttons to include</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">segment.label</span></TableCell>
            <TableCell>This is the label that the user will see</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">segment.onclick</span></TableCell>
            <TableCell
              >This is the function that will fire that will determine the logic for your segment. Typically you will
              want to hide some sections and show others</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard1 />
      </Card>
    </Column>
    <Column>
      <SegmentedController
        segments={[
          {
            label: "Section 1",
            onclick: (event) => {
              active = "1";
            },
          },
          {
            label: "Section 2",
            onclick: () => {
              active = "2";
            },
          },
          {
            label: "Section 3",
            onclick: () => {
              active = "3";
            },
          },
        ]}
      />
      <div class:hidden={active !== "1"}>
        <Card>
          <CardHeader title="Section 1" border={false} />
        </Card>
      </div>

      <div class:hidden={active !== "2"}>
        <Card>
          <CardHeader title="Section 2" border={false} />
        </Card>
      </div>

      <div class:hidden={active !== "3"}>
        <Card>
          <CardHeader title="Section 3" border={false} />
        </Card>
      </div>
    </Column>
  </Row>
</Section>
