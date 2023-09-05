---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { Select } from "bubbles-ui";

  import icon_circle from "$lib/img/circle.svg";
  import icon_square from "$lib/img/square.svg";
  import icon_triangle from "$lib/img/triangle.svg";
  import icon_pentagon from "$lib/img/pentagon.svg";
  import icon_star from "$lib/img/star.svg";
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <Select
    id="select_example"
    value={null}
    label="Select a shape"
    error="Please select a shape"
    desc="This is the description that will be below the select element. Any description field can render inline html elements."
    type="select"
    validation="required|string"
    onselect={(value) => {
      //This will fire for every item you select with the value of the selected item
      console.log(value);
    }}
    prefix_options={[
      { label: "All Shapes", value: "all" },
      { divider: true, label: "Remaining Options" },
    ]}
    options={[
      {
        label: "Circle",
        value: "circle",
        caption: "No corners!",
        img: icon_circle,
        color: "error",
      },
      {
        label: "Square",
        value: "square",
        img: icon_square,
      },
      {
        label: "Pentagon",
        value: "pent",
        img: icon_pentagon,
        onselect: () => {
          console.log("Whoa, you like pentagons?");
        },
      },
      {
        label: "Triangle",
        value: "tri",
        img: icon_triangle,
      },
      {
        label: "Star",
        value: "star",
        img: icon_star,
      },
      {
        divider: true,
      },
      {
        label: "No Icon Shape",
        value: null,
      },
    ]}
  />
</Card>
```
