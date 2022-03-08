<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./overlay.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";
  import Center from "$lib/layouts/Center.svelte";

  import Overlay from "$lib/components/overlay/Overlay.svelte";
  import Spinner from "$lib/components/spinner/Spinner.svelte";
  import Button from "$lib/components/button/Button.svelte";

  let overlayToggle = false;
</script>

<Section id="overlay" title="Overlay">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The overlay puts a page overtop of the whole page. It's useful if you want to temporarily block the current
          page content without navigating to a new page.
        </p>

        <p>
          For example, the <code>Error</code> and <code>Modal</code> components use overlays to show content without navigating
          to a new page.
        </p>

        <p>
          You'll want to include functionality to hide an show the Overlay, otherwise it will block all content on the
          screen.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">solid</span></TableCell>
            <TableCell
              >Normally the overlay is a transparent black background, but you can force it to be a solid background by
              passing in <code>true</code> to this field.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">transition_duration</span></TableCell>
            <TableCell>Add the time in milliseconds that you want the overlay to fade in.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell>An function that will be fired when the overlay is clicked on</TableCell>
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
      <Card>
        <CardHeader title="Overlay Demo" border={false} />

        {#if overlayToggle}
          <Overlay solid={true} transition_duration={500} onclick={() => (overlayToggle = false)}>
            <Center>
              <Spinner size={5} color="primary" />
              <p>Loading Your Data (Click anywhere to close the overlay)</p>
            </Center>
          </Overlay>
        {/if}

        <Button
          label="Show Overlay"
          wide={true}
          mb={true}
          onclick={() => {
            overlayToggle = true;
          }}
        />
      </Card>
    </Column50>
  </Row>
</Section>
