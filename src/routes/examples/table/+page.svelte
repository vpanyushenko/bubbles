<script>
  import { Row, Card, Column100, Table, TableRow, TableCell } from "$lib/index";
</script>

<Row>
  <Column100>
    <Card>
      <Table>
        <TableRow href="/table">
          <TableCell text="Test" bold={true} />
          <TableCell text="Hello World" caption="caption" />
          <TableCell button />
        </TableRow>

        <TableRow>
          <TableCell text="Test" bold={true} href="/table" />
          <TableCell caption="Only Caption" />
          <TableCell button />
        </TableRow>

        <TableRow>
          <TableCell text="Test" bold={true} />
          <TableCell caption="Only Caption" />
          <TableCell button={{ href: "/table" }} />
        </TableRow>
      </Table>
    </Card>
  </Column100>
</Row>
