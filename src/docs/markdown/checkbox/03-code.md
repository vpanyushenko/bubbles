---
width: 50
height: 100
type: code
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
