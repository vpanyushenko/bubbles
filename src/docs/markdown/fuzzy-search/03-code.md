---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { Input, fuzzySearch } from "bubbles-ui";

  const states = [
      {
        name: "Alabama",
        abbreviation: "AL",
      },
      {
        name: "Alaska",
        abbreviation: "AK",
      },
      ...,
      {
        name: "Wyoming",
        abbreviation: "WY",
      },
    ];

  const filtered = fuzzySearch("Califo", states, { keys: ["name", "abbreviation"], sort: true };
</script>
```
