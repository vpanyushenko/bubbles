---
component: segmented-controller
---

```js
import { SegmentedController, Card, CardHeader } from "bubbles-ui";

  $: segments = [true, false, false];

  <SegmentedController
    segments={[
      {
        label: "Section 1",
        onclick: () => {
          segments[0] = true;
          segments[1] = false;
          segments[2] = false;
        },
      },
      {
        label: "Section 2",
        onclick: () => {
          segments[0] = false;
          segments[1] = true;
          segments[2] = false;
        },
      },
      {
        label: "Section 3",
        onclick: () => {
          segments[0] = false;
          segments[1] = false;
          segments[2] = true;
        },
      },
    ]}
  />


  <div class:hidden={!segments[0]}>
    <Card>
      <CardHeader title="Section 1" border={false} />
    </Card>
  </div>

  <div class:hidden={!segments[1]}>
    <Card>
      <CardHeader title="Section 2" border={false} />
    </Card>
  </div>

  <div class:hidden={!segments[2]}>
    <Card>
      <CardHeader title="Section 3" border={false} />
    </Card>
  </div>

```
