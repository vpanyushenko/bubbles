---
width: 50
height: 100
type: code
---

```js
import { sort } from "bubbles-ui";

const data = [
  {
    id: 1,
    deeply: {
      nested: "a",
    },
  },
  {
    id: "2", //Doesn't matter if number is a string
    deeply: {
      nested: "b",
    },
  },
  {
    id: 3,
    deeply: {
      nested: "c",
    },
  },
];

const sorted = sort(data, "id", "descending");
const nested_sort = sort(data, "deeply.nested", "descending");
```
