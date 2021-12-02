---
component: radio-group
---

```js
import { RadioGroup } from "bubbles-ui";

<RadioGroup
  id="sandwich.type"
  value="burger"
  error="Please select an option"
  label="Choose sandwich"
  validation="required|string"
  desc="This is the longer description for the RadioGroup if you think it needs more explanation. You can add html elements like <a href='https://google.com' target='blank'>links</a>."
  options={[
    {
      label: "Burger",
      value: "burger",
    },
    {
      label: "Hot Dog",
      value: "hd",
    },
    {
      label: "Grilled Cheese",
      value: "gc",
    },
  ]}
/>;
```
