---
type: code
---

```svelte
<script>
  import { Table, TableRow, TableCell, pageStore } from "bubbles-ui";
</script>

<Table>
  <TableRow href="#table">
    <TableCell text="Profile" large={true} bold={true} caption="Edit your profile and update your photo" />
    <TableCell button={{ icon: "arrowRight" }} />
  </TableRow>
  <TableRow href="#table">
    <TableCell text="Notifications" large={true} caption="Select how and went we message you" />
    <TableCell button={{ icon: "arrowRight" }} />
  </TableRow>
  <TableRow href="#table">
    <TableCell text="Billing" large={true} bold={true} caption="Edit your payment methods and see past transactions" />
    <TableCell button={{ icon: "arrowRight" }} />
  </TableRow>
</Table>
```
