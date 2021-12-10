<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./sidebar.md";
  import CodeCard2 from "./sidebar-notifications.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Button from "$lib/components/button/Button.svelte";
  import { pageStore } from "$lib/stores/stores";
</script>

<Section id="sidebar" title="Sidebar">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The Sidebar is located on the left side of the screen and lets users access different sections of your
          application.
        </p>

        <p>
          On mobile devices, the sidebar will collapse into a hamburger button, which can be opened by the user to
          reveal the sections
        </p>

        <p>
          It's best to load this component in <code>__layout.svelte</code> since the Sidebar will remain rendered on
          each page. You'll also generally want to use the <code>PageSidebarWrapper</code> to slot the rest of your content
          with the proper paddings
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">logo</span></TableCell>
            <TableCell>Pass a reference in for your logo that will be included at the top of the sidebar</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">sections</span></TableCell>
            <TableCell>An array of Objects that will be the sections you want to include in your Sidebar.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.icon</span></TableCell>
            <TableCell
              >If you want your section to have an icon, pass an <code>svg</code> or <code>png</code> icon. This icon should
              be black (#000000) as Bubbles will calculate the correct color filters for it automatically.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.label</span></TableCell>
            <TableCell>This is the text that will be displayed for the user</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.section</span></TableCell>
            <TableCell
              >If you want to divide your sidebar into groups, you can add a section property. In this example, the
              sidebar is divided into four sections, "Getting Started", "Layouts", "Components", and "Utils"</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.id</span></TableCell>
            <TableCell
              >An id that you can pass to the section to make a reference of it. If you'll be adding notifications
              counts next to any of the sidebar items, it's useful to know the ID so that you can update the
              notification counter easily. If you don't set an ID, Bubbles will set one for you.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.href</span></TableCell>
            <TableCell
              >This is the page where the user will be routed. Bubbles will automatically highlight the active section
              and show loading indicators if the page is taking a while to load.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.href_aliases</span></TableCell>
            <TableCell
              >There can be times when you have pages with multiple href values. For example, it's common that <code
                >/</code
              >
              and <code>/dashboard</code> might be the same page. As a result, if the initial href is set to
              <code>/dashboard</code>
              and the user navigates to <code>/</code>, the correct section will not be shown as active. Add an array of
              string here that share that href here to correct this behavior.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">section.notifications</span></TableCell>
            <TableCell
              >If you want to set an initial value for notifications when the component mounts you can do so here.
              Otherwise, you'll update notifications counts using the <code>pageStore</code></TableCell
            >
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
  <Row>
    <Column50>
      <Card color="dark" px={0} py={0}>
        <CodeCard2 />
      </Card>
    </Column50>
    <Column50>
      <Card height100={true}>
        <CardHeader title="Updating Sidebar Notifications" wide={true} border={null} />
        <Button
          label="Increment Notifications"
          mb={true}
          wide={true}
          color="success"
          onclick={() => {
            $pageStore.sidebar.notifications.sidebar++;
          }}
        />
        <Button
          label="Decrement Notifications"
          mb={true}
          wide={true}
          color="error"
          onclick={() => {
            if ($pageStore.sidebar.notifications.sidebar > 0) {
              $pageStore.sidebar.notifications.sidebar--;
            }
          }}
        />
      </Card>
    </Column50>
  </Row>
</Section>
