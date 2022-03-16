---
component: select
---

```svelte
<script>
  import { Select } from "bubbles-ui";
</script>

<Select
  id="select_example"
  value={null}
  label="Select a shape"
  error="Please select a shape"
  desc="This is the description that will be below the select element. Any description field can render inline html elements."
  type="select"
  validation="required|string"
  vob={true}
  options={[
    {
      label: "Circle",
      value: "circle",
      caption: "No corners!",
    },
    "break",
    {
      label: "Square",
      value: "square",
    },
    {
      label: "Polygon",
      value: "poly",
      onselect: () => {
        console.log("Whoa, you like polygons?");
      },
    },
    {
      label: "Triangle",
      value: "tri",
    },
    {
      label: "Hexagon",
      value: "hex",
    },
  ]}
/>
```
