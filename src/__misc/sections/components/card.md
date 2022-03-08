---
component: card
---

```svelte
<script>
  import { Card } from "bubbles-ui";

  const props = {
    color: "white", //add any color variable
    border: false, //default value
    shadow: true, //default value
    height100: false,
    px: 0.065,
    py: 2,
    header: {
      title: "Card Title",
      border: false, //remove the bottom border from the header
    },
    footer: {
      pagination: false,
    },
  };
</script>

<Card>
  <p This is a basic card with just text inside. You can slot whatever content you want inside</p>
</Card>

<Card border={true} shadow={false}>
  <p This is a card with a border and no shadow</p>
</Card>

<Card border={true} shadow={false} color={"primary"}>
  <p style="color: white">This is a card with a color property of primary and no border.</p>
</Card>

<style>
  p {
    margin-top: 1rem;
  }
</style>
```
