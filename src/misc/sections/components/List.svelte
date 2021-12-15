<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./list.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import List from "$lib/components/list/List.svelte";
</script>

<Section id="list" title="List">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A list is a great way to display information one line at a time. Think of a list as a vertical table. You can
          create a list by either passing in an array on items into the <code>items</code> property, or importing the
          <code>ListItem</code>
          or <code>ListItemTimeline</code> components and adding them into the List.
        </p>

        <p>
          As a general rule of thumb for dashboard, it's easier to just pass in the list of items as a prop, since you
          are most likely fetching this data from a server.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">type</span></TableCell>
            <TableCell
              >The type of list that you want to show. There are currently two types of lists that are supported. <code
                >standard</code
              >is the default list, and <code>timeline</code> if you want a timeline list.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">items</span></TableCell>
            <TableCell>An array items items that list list will have. Each item is an object</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.label</span></TableCell>
            <TableCell
              >This is the label at the top of the list. It should describe what the text is that the user is seeing.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.text</span></TableCell>
            <TableCell>This is the main content of of list</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.href</span></TableCell>
            <TableCell>If you want the list item to be a link, pass in the href</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.new_page</span></TableCell>
            <TableCell
              >If the item is an href, pass <code>false</code> if you don't want the href to be opened in a new tab.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.icon</span></TableCell>
            <TableCell
              >You can include an icon on the right side of the list. You can pass an imported icon, or use the bundled
              common icons for the list which include <code>copy</code>, <code>download</code>, <code>edit</code>, and
              <code>trash</code>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.onclick</span></TableCell>
            <TableCell
              >If you have an icon, you can pass a function that will run when a user clicks on an icon. Useful for
              downloading some content or copying the text that's in the List.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.active</span></TableCell>
            <TableCell>
              If the list <code>type</code> is a timeline, you can set the timeline bubble to be active, which will change
              it's color to green
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">item.pulse</span></TableCell>
            <TableCell>
              If the list <code>type</code> is a timeline, and the item is active, it will be pulsing. You can turn this
              off by passing <code>false</code> to this attribute.
            </TableCell>
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
        <CardHeader title="Standard List" border={false} />
        <List
          items={[
            {
              label: "Label",
              text: "Simple List Item",
            },
            {
              label: "Label",
              text: "Example with href",
              href: "https://google.com",
              new_page: true,
            },
            {
              label: "Download",
              text: "Icon Example",
              icon: "download",
              onclick: () => {
                alert("List clicked");
              },
            },
            {
              label: "copy",
              text: "Icon Example",
              icon: "copy",
              onclick: () => {
                alert("List clicked");
              },
            },
            {
              label: "edit",
              text: "Icon Example",
              icon: "edit",
              onclick: () => {
                alert("List clicked");
              },
            },
            {
              label: "trash",
              text: "Icon Example",
              icon: "trash",
              onclick: () => {
                alert("List clicked");
              },
            },
            {
              label: "Tag Label",
              tag: {
                label: "Tag Example",
                color: "primary",
              },
            },
            {
              tag: {
                label: "Tags Can Be Used Without Labels",
                color: "error",
              },
            },
          ]}
        />
      </Card>

      <Card>
        <CardHeader title="Timeline List" border={false} />
        <List
          type="timeline"
          items={[
            {
              label: "Label",
              text: "List test",
              href: "https://google.com",
              new_page: true,
              active: false,
            },
            {
              label: "Label",
              text: "List test",
              icon: "edit",
              active: true,
              pulse: false, //no pulsing
              color: "dark", //changed color
            },
            {
              label: "Label",
              text: "List test",
              icon: "edit",
              active: true,
            },
            {
              label: "Label",
              text: "List test",
              active: true,
              color: "primary",
            },
            {
              label: "Label",
              text: "List test",
              active: true,
              color: "error",
            },
          ]}
        />
      </Card>
    </Column50>
  </Row>
</Section>
