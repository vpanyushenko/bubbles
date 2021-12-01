---
component: select
---

```js
import { Select } from "bubbles-ui";

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
    "break", //you can just add a "break" string to add a horizontal rule between options
    {
      label: "Square",
      value: "square",
    },
    {
      label: "Polygon",
      value: "polygon",
      onselect: () => {
        alert("Whoa, you like polygons?");
      },
    },
  ]}
/>;
```
