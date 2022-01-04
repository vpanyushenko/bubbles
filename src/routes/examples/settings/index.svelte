<script context="module">
  export const prerender = true;
</script>

<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import Table from "$lib/components/table/Table.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Header from "$lib/components/header/Header.svelte";
  import Row from "$lib/layouts/Row.svelte";
  import Center from "$lib/layouts/Center.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import CardFooter from "$lib/components/card/CardFooter.svelte";
  import Pagination from "$lib/components/pagination/Pagination.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
  import ListItem from "$lib/components/list/ListItem.svelte";
  import ListItemTimeline from "$lib/components/list/ListItemTimeline.svelte";
  import { pageStore } from "$lib/stores/stores";
</script>

<Header title="Settings" breadcrumbs={false} />

<Row>
  <Column100>
    <Card>
      <Table>
        <TableRow href="/examples/pokedex">
          <TableCell text="Profile" large={true} bold={true} caption="Edit your profile and update your photo" />
          <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex" }} />
        </TableRow>
        <TableRow href="/examples/pokedex">
          <TableCell text="Notifications" large={true} caption="Select how and went we message you" />
          <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex" }} />
        </TableRow>
        <TableRow href="/examples/pokedex">
          <TableCell
            text="Billing"
            large={true}
            bold={true}
            caption="Edit your payment methods and see past transactions"
          />
          <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex" }} />
        </TableRow>
      </Table>
    </Card>
  </Column100>
</Row>
