---
width: 50
height: 100
type: code
---

```svelte
<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import CheckboxGroup from "$lib/components/checkbox/CheckboxGroup.svelte";

  const checkboxGroup = {
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
    validation: "array", //The data will be an array
  };
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <CheckboxGroup {...checkboxGroup} />
</Card>
```
