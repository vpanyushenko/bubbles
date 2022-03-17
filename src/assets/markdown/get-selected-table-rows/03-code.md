---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { Table, TableHeader, TableRow, getSelectedTableRows } from "bubbles-ui";

  <Table id="table-id">
    <TableHeader
      cells={[
        {
          checkbox: true,
          options: [
            {
              label: "Print Selected Rows To Console",
              value: "label1",
              onselect: (event) => {
                const ids = getSelectedTableRows("table-id");
                deselectTableRows("table-id");
              },
            },
          ],
        },
        { label: "Name" },
        { label: "Weight" },
        { label: "Type(s)" },
      ]}
    >
       <!-- Your table rows would go here -->
    </TableHeader>
  </Table>;
</script>
```
