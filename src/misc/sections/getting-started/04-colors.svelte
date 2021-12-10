<script>
  import Section from "$misc/components/section.svelte";

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

<Section id="colors" title="Colors">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Customize Colors" border={false} />
        <p>
          The global stylesheet that you imported from <code>bubbles-ui/css/app.css</code> added all of the supported colors
          as variables. You're able to add a stylesheet after the Bubbles stylesheet to override those styles and add your
          own.
        </p>
        <p class="">
          With the exception of black and white, every color has a base color, three lighter variations, and three
          darker variations. Below is an example for <code>primary</code>, which you should use in your css as a color
          variable: <code>color: var(--primary)</code> or <code>background: var(--primary-dark)</code>.
        </p>

        <Table>
          <TableRow>
            <TableCell>primary-lightest</TableCell>
            <TableCell><span style="color: var(--primary-lightest); font-weight: 700">#DAD6F4</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-lighter</TableCell>
            <TableCell><span style="color: var(--primary-lighter); font-weight: 700">#B5AEE9</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-light</TableCell>
            <TableCell><span style="color: var(--primary-light); font-weight: 700">#9186DE</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary</TableCell>
            <TableCell><span style="color: var(--primary); font-weight: 700">#6C5DD3</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-dark</TableCell>
            <TableCell><span style="color: var(--primary-dark); font-weight: 700">#50459E</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darker</TableCell>
            <TableCell><span style="color: var(--primary-darker); font-weight: 700">#352E69</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>primary-darkerest</TableCell>
            <TableCell><span style="color: var(--primary-darkest); font-weight: 700">#1B1734</span></TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Color Options" border={false} />
        <p>
          Like most kits, Bubbles uses descriptive words for colors that describe the action to which that color will
          apply. For example the default <span style="color: var(--error); font-weight: 700">red</span> color is called
          <code>error</code>. Below is a light of all of the color variables included with Bubbles.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Variable" }, { label: "Description" }, { label: "Default" }]} />
          <TableRow>
            <TableCell>Primary</TableCell>
            <TableCell>The main color for buttons, hover states, sidebar, etc</TableCell>
            <TableCell><span style="color: var(--primary); font-weight: 700">#DAD6F4</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Secondary</TableCell>
            <TableCell
              >Mostly used for secondary buttons, and colors. You'll need to request this in a property.</TableCell
            >
            <TableCell><span style="color: var(--secondary); font-weight: 700">#FF98E5</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Error</TableCell>
            <TableCell>Error states will show up on inputs fields that fail validation and error toasts</TableCell>
            <TableCell><span style="color: var(--error); font-weight: 700">#FF6628</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Warning</TableCell>
            <TableCell>Useful to caution a user about something. You can request warning toasts</TableCell>
            <TableCell><span style="color: var(--warning); font-weight: 700">#FF9F38</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Success</TableCell>
            <TableCell>Used by default for success toasts</TableCell>
            <TableCell><span style="color: var(--primary); font-weight: 700">#4FBF67</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Info</TableCell>
            <TableCell>Useful for highlighting links and other clickable non-button components</TableCell>
            <TableCell><span style="color: var(--info); font-weight: 700">#355DFF</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gray</TableCell>
            <TableCell>Shaded of gray are used everywhere for borders and outlines.</TableCell>
            <TableCell><span style="color: var(--gray); font-weight: 700">#808191</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dark</TableCell>
            <TableCell>If you want a dark color that isn't black, use dark.</TableCell>
            <TableCell><span style="color: var(--dark); font-weight: 700">#1B1D21</span></TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Icon Colors" border={false} />
        <p>
          In your <code>Sidebar</code> component, you have the option to include icons. Bubbles will calculate a filter
          based on your primary color to make sure the icon will hover with the same color. To make sure this filter is
          calculated correctly, the icon used should be black. While using <code>SVGs</code> is encouraged, you can use
          a
          <code>PNG</code> and get the same effect.
        </p>
      </Card>
    </Column>
  </Row>
</Section>
