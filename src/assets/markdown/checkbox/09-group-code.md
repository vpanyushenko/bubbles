---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { LabeledCheckbox } from "bubbles-ui";

  const props = {
    id: "tos",
    value: null,
    label: "Terms of Service",
    desc: `You can view more details about our terms of service and privacy policy <a href="https://google.com">at this link</a>.`,
    error: "You have not accepted the terms of service.",
    validation: "required|boolean",
    background: false,
  };
</script>

<LabeledCheckbox {...props} />
```
