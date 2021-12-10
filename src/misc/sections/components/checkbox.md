---
component: checkbox
---

```svelte
<script>
  import { Checkbox } from "bubbles-ui";
</script>

<Checkbox
  value={true}
  onchange={() => {
    alert("Value Changed");
  }}
/>
```
