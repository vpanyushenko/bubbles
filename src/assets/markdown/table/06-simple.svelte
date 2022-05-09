<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";

  import CardFooter from "$lib/components/card/CardFooter.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Pagination from "$lib/components/pagination/Pagination.svelte";
</script>

<Row>
  <Column>
    <Card height100={true}>
      <CardHeader title="Settings Table Example" border={false} />
      <Table>
        <TableRow href="#table">
          <TableCell text="Profile" large={true} bold={true} caption="Edit your profile and update your photo" />
          <TableCell tag={{ label: "coming soon" }} align="right" width="min" />
          <TableCell button={{ icon: "arrowRight" }} width="min" />
        </TableRow>
        <TableRow href="#table">
          <TableCell text="Notifications" large={true} caption="Select how and went we message you" />
          <TableCell empty={true} />
          <TableCell button={{ icon: "arrowRight" }} />
        </TableRow>
        <TableRow href="#table">
          <TableCell
            text="Billing"
            large={true}
            bold={true}
            caption="Edit your payment methods and see past transactions"
          />
          <TableCell empty={true} />
          <TableCell button={{ icon: "arrowRight" }} />
        </TableRow>
      </Table>
    </Card>
  </Column>
</Row>
