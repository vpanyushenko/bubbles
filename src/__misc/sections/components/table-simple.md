---
component: table-simple
---

```svelte
<script>
  import { Table, TableRow, TableCell, pageStore } from "bubbles-ui";
</script>

<Table>
  <TableRow href="#table" onclick={() => ($pageStore.clicked = "icon_1")}>
    <TableCell text="Profile" large={true} bold={true} caption="Edit your profile and update your photo" />
    <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex", id: "icon_1" }} />
  </TableRow>
  <TableRow href="#table" onclick={() => ($pageStore.clicked = "icon_2")}>
    <TableCell text="Notifications" large={true} caption="Select how and went we message you" />
    <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex", id: "icon_2" }} />
  </TableRow>
  <TableRow href="#table" onclick={() => ($pageStore.clicked = "icon_3")}>
    <TableCell text="Billing" large={true} bold={true} caption="Edit your payment methods and see past transactions" />
    <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex", id: "icon_3" }} />
  </TableRow>
</Table>
```
