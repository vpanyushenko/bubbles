---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { Switch } from "bubbles-ui";
</script>

<Switch
  value={false}
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
