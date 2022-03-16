<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./show-toast.md";

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

<Section id="showToast" title="showToast">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The toast is used to notify a user that some action took place. It's shown above all content and will persist
          a page navigation.
        </p>

        <p>The toasts can be dismissed by the user or will just gracefully fade away.</p>

        <p>
          Because toast messages can be initiated from just about any page or component, Bubbles recommends adding the <code
            >ToastContainer</code
          >
          component on the <code>__layout.svelte</code> page, and adding new toasts using the <code>showToast</code> utility
          function.
        </p>

        <p>The function will take two properties, the message you want to display and the color of the toast.</p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Default" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">message</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell>The messages you want the toast to display</TableCell>
            <TableCell>"An error occurred"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>string</code></span></TableCell>
            <TableCell
              >The color of the message you want to show. For best results, use "success" and "error".</TableCell
            >
            <TableCell>"error"</TableCell>
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
