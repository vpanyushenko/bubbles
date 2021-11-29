---
component: checkbox-group
---

```js
import { CheckboxGroup } from "bubbles-ui";

const props = {
  id: "toppings",
  options: [
    {
      label: "Pepperoni",
      value: "pepperoni",
    },
    {
      label: "Chedder Cheese",
      value: "cheese",
    },
    {
      label: "Small Mushrooms",
      value: "mushroons",
    },
  ],
  value: ["pepperoni"],
  label: "Select Toppings",
  desc: `You may select as many toppings as you would like.`,
  error: "Something went wrong",
  validation: "array",
};
```
