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
    vob={true}
    options={[
      {
        label: "Circle",
        value: "circle",
        caption: "No corners!",
        img: icon_circle,
      },
      "break", //add a horizontal line
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
        label: "No Icon Shape",
        value: null,
      },
      {
        label: "Empty String Value",
        value: "",
      },
    ]}
  />
</Card>
```
