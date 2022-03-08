---
component: segmented-controller
---

```svelte
<script>
  import { SegmentedController, Card, CardHeader } from "bubbles-ui";

  let active = "1";
</script>

<SegmentedController
  style="default"
  segments={[
    {
      label: "Section 1",
      onclick: () => {
        active = "1";
      },
    },
    {
      label: "Section 2",
      onclick: () => {
        active = "2";
      },
    },
    {
      label: "Section 3",
      onclick: () => {
        active = "3";
      },
    },
  ]}
/>
<div class:hidden={active !== "1"}>
  <Card>
    <CardHeader title="Section 1" border={false} />
  </Card>
</div>

<div class:hidden={active !== "2"}>
  <Card>
    <CardHeader title="Section 2" border={false} />
  </Card>
</div>

<div class:hidden={active !== "3"}>
  <Card>
    <CardHeader title="Section 3" border={false} />
  </Card>
</div>
```
