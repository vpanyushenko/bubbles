<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./tag.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Tag from "$lib/components/tag/Tag.svelte";
</script>

<Section id="tag" title="Tag">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>The tag is a good way to accent what would be a text element. For example the status of something.</p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>The text inside of that tag that the user will see</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >Select one of the color variables to color the tag. Like buttons you can pass a "-light" to use a light
              version of the tag or a "-border" for a tag with a border.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">small</span></TableCell>
            <TableCell
              >A boolean to make the tag small. By default this is false but is helpful if you are using it inline with
              text like in a Table.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">min_width</span></TableCell>
            <TableCell
              >Will make sure the tag maintains a minimum width value since cause the contents of the tag are very sort.
              You can pass a value in <code>rem</code> values. The default is 3.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">margin</span></TableCell>
            <TableCell
              >You can set margins for the tag using the css shorthand method. By default the top, right, bottom, and
              left values are set to <code>0 0 0 0</code>.</TableCell
            >
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
        <CardHeader title="Regular Colors" border={false} />

        <Tag color="primary" margin="1rem 0 1rem 0">primary</Tag>
        <Tag color="secondary" margin="1rem 0 1rem 0">secondary</Tag>
        <Tag color="error" margin="1rem 0 1rem 0">error</Tag>
        <Tag color="warning" margin="1rem 0 1rem 0">warning</Tag>
        <Tag color="success" margin="1rem 0 1rem 0">success</Tag>
        <Tag color="info" margin="1rem 0 1rem 0">info</Tag>
        <Tag color="gray" margin="1rem 0 1rem 0">gray</Tag>
        <Tag color="dark" margin="1rem 0 1rem 0">dark</Tag>
      </Card>

      <Card>
        <CardHeader title="Light Colors" border={false} />

        <Tag color="primary-light" label="primary-light" margin="1rem 0 1rem 0" />
        <Tag color="secondary-light" label="secondary-light" margin="1rem 0 1rem 0" />
        <Tag color="error-light" label="error-light" margin="1rem 0 1rem 0" />
        <Tag color="warning-light" label="warning-light" margin="1rem 0 1rem 0" />
        <Tag color="success-light" label="success-light" margin="1rem 0 1rem 0" />
        <Tag color="info-light" label="info-light" margin="1rem 0 1rem 0" />
        <Tag color="gray-light" label="gray-light" margin="1rem 0 1rem 0" />
        <Tag color="dark-light" label="dark-light" margin="1rem 0 1rem 0" />
      </Card>

      <Card>
        <CardHeader title="Border Colors" border={false} />

        <Tag color="primary-border" label="primary-border" margin="1rem 0 1rem 0" />
        <Tag color="secondary-border" label="secondary-border" margin="1rem 0 1rem 0" />
        <Tag color="error-border" label="error-border" margin="1rem 0 1rem 0" />
        <Tag color="warning-border" label="warning-border" margin="1rem 0 1rem 0" />
        <Tag color="success-border" label="success-border" margin="1rem 0 1rem 0" />
        <Tag color="info-border" label="info-border" margin="1rem 0 1rem 0" />
        <Tag color="gray-border" label="gray-border" margin="1rem 0 1rem 0" />
        <Tag color="dark-border" label="dark-border" margin="1rem 0 1rem 0" />
      </Card>
    </Column50>
  </Row>
</Section>
