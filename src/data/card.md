---
component: card
---

```js
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
```
