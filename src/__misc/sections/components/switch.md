---
component: switch
---

```svelte
<script>
  import { Switch } from "bubbles-ui";
</script>

<Switch
  value={true}
  onclick={(event) => {
    const value = event.currentTarget.value;

    document.getElementById("switch-example").textContent = value;
  }}
/>
<div>
  The value of the switch is now:
  <span id="switch-example" />
</div>
```
