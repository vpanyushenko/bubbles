---
component: icon-buttons
---

```js
import { IconButton } from "bubbles-ui";

const props = {
  icon: "more", //select premade icon or add your own svg
  options: [
    {
      label: "Option 1",
      caption: "onclick example",
      onclick: () => {
        alert("Option 1 clicked");
      },
    },
    {
      label: "Option 2",
      caption: "href example",
      href: "/#buttons",
    },
  ],
};
```
