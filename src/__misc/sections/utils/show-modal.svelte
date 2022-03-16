<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./modal.md";

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

<Section id="showModal" title="showModal">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A Modal is basically a card that will sit on top of all content. It should only be used for actions that to
          user needs to take right now.
        </p>

        <p>
          Modals are set programmatically. Add the <code>Modal</code> component to your <code>__layout.svelte</code>
          file, and then use the helper functions <code>showModal</code> to bring up the modal. The
          <code>showModal</code> function will add the required components to a the <code>modalStore</code>. You can
          also programmatically hide the modal using the <code>hideModal</code> function.
        </p>

        <p>Generally, your modal will display a form or a message to the user with some buttons.</p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Default" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The title of the modal</TableCell>
            <TableCell><code>null</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>Object</code></span></TableCell>
            <TableCell>Options that the user can add to their modal</TableCell>
            <TableCell>--</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options.height</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>number</code></span></TableCell>
            <TableCell>The height in <code>vh</code> values that you want the modal to be.</TableCell>
            <TableCell><code>null</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options.message</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The message you want the modal to display if any</TableCell>
            <TableCell><code>null</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options.form</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >An array of inputs that you want the modal to have it the user is meant to add data to a form.</TableCell
            >
            <TableCell><code>[ ]</code></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options.footer</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >You may want to add buttons to your modal that will be locked to the bottom of your modal. You can add an
              array of buttons here, either for the form or non form related buttons like ones to dismiss the modal.</TableCell
            >
            <TableCell><code>[ ]</code></TableCell>
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
