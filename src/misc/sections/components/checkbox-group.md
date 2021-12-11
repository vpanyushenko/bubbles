---
component: checkbox-group
---

```svelte
<script>
  import { CheckboxGroup } from "bubbles-ui";

  const props = {
    id: "toppings",
    options: [
      {
        label: "Pepperoni",
        value: "pepperoni",
      },
      {
        label: "Cheddar Cheese",
        value: "cheese",
      },
      {
        label: "Small Mushrooms",
        value: "mushrooms",
      },
    ],
    value: ["pepperoni"],
    label: "Select Toppings",
    desc: `You may select as many toppings as you would like.`,
    error: "Something went wrong",
    validation: "array",
  };
</script>

<CheckboxGroup {...props} />
```
