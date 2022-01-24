<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./header.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";
</script>

<Section id="header" title="Header">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Header" border={false} />
        <p>
          The Header is the element that is at the top of the page. This is typically have a large title, a back buttons
          if needed, and breadcrumbs. If you need any action items, you can add those too.
        </p>

        <p>
          Bubbles will calculate the labels from the breadcrumbs using the path if you set <code>breadcrumbs</code>
          to <code>true</code>. For the last breadcrumb it will use the page title that you set in the Header. For
          example, a settings page path of <code>/settings/profile</code> would give breadcrumbs of "Settings /
          Profile". Sometimes it's common to add the ID of an element in the href, such as
          <code>/invoices/inv_0938487984654</code>. In this case, the breadcrumb will look for the title for the last
          element and show something like "Invoices / 23" (or whatever the title of the page is in the Header.). In an
          scenario where your page has two dynamic links such as <code>/pokedex/[pokemon_id]/[move_id]</code> you may
          want to pass in more human readable labels to the breadcrumbs using the <code>breadcrumb_labels</code>
          property.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell
              >This is the main title for the page. You can either pass it as a prop to the header component, or update
              the <code>pageStore.title</code> property which will do the same thing.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">subtitle</span></TableCell>
            <TableCell
              >You can add a subtitle to the page. This accepts html so you can add anchor tags. If you add a subtitle
              and are on a nested page, you will not see any breadcrumbs.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">breadcrumbs</span></TableCell>
            <TableCell
              >Pass in <code>false</code> if you do not want to display breadcrumbs. If you want to override the
              automatic breadcrumbs, you can pass in an array of objects with the <code>label</code> and
              <code>href</code> of the breadcrumb you want to add.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">breadcrumb_labels</span></TableCell>
            <TableCell>An array of string to overwrite the just labels for breadcrumbs</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">buttons</span></TableCell>
            <TableCell
              >Buttons are an array of <code>IconButton</code>s that will show up on the right side of the header.</TableCell
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
  </Row>
</Section>
