<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./04-page-grid.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Grid from "$lib/layouts/Grid.svelte";
  import GridItem from "$lib/layouts/GridItem.svelte";

  import img from "./app_icon.png";
</script>

<Section id="grid" title="Page Grid">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Description" border={false} />
        <p>
          This is an easy to use wrapper for CSS Grid with some transitions built in. If you need something more custom,
          you should just make your own grid.
        </p>

        <p>This comes in two components, <code>Grid</code> and <code>GridItem</code>.</p>

        <p>
          The <code>Grid</code> is the main component and will take accept properties to customize is responsiveness and
          layout. The <code>GridItem</code> is just a wrapper for each of your items which will give it some nice animations
          but is completely optional.
        </p>
      </Card>
    </Column>
  </Row>
  <Row>
    <Column50>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Grid" border={false} />
        <p>
          These are the properties for the Grid. The grid will be responsive to the screen size by entering values for
          max_columns and min_columns.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">max_columns</span></TableCell>
            <TableCell>The maximum amount of columns to include on large screens. Defaults to 6.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">min_columns</span></TableCell>
            <TableCell>The minimum amount of columns to include on small screens. Defaults to 3.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">row_gap</span></TableCell>
            <TableCell
              >The vertical space between each row of grids in <code>REM</code> values. Defaults to 2.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">column_gap</span></TableCell>
            <TableCell
              >The horizontal space between each column of grids in <code>REM</code> values. Defaults to 2.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">style</span></TableCell>
            <TableCell>You can pass a string of css values to further customize the grid.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">ignore_root_styles</span></TableCell>
            <TableCell
              ><strong>This is an experimental feature.</strong> Basically the initial <code>app.css</code> are some
              global styles to normalize css, add color variables, and let the layout components know how to be styled.
              However, perhaps you want to use your <code>Grid</code> component inside of another component instead of
              as a layout. By setting this value to <code>true</code>, the grid will be stripped of all classes that it
              has that get affected by the css you imported.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="GridItem" border={false} />
        <p>
          This component does not take any props. It's an optional wrapper for each of your grid items that will add
          some nice animations to the page when you load it in.
        </p>
      </Card>
    </Column50>

    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard1 />
      </Card>
    </Column50>
  </Row>

  <Row>
    <Grid>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
      <GridItem>
        <img src={img} alt="logo" />
      </GridItem>
    </Grid>
  </Row>
</Section>

<style>
  img {
    filter: drop-shadow(0 0 1rem rgb(0 0 0 / 0.2));
    transition: all 0.4s ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
</style>
