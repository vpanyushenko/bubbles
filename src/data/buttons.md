---
component: button
---

```js
import { Button, pageStore } from "bubbles-ui";

const props = {
  id: "123",
  label: "Complete",
  color: "secondary", //secondary-light for light button or secondary-border for border button
  onclick: (event) => {
    const id = event.currentTarget.id;

    console.log(`Button ${id} clicked`);

    $pageStore.loading.push(id);
  },
  wide: true,
};
```
