---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { FileForm } from "bubbles-ui";

  const options = {
    button: {
      label: "Upload Image",
      color: "primary",
    },
    endpoint: "https://bubbles-ui/api/logos",
    fetch_options: {
      method: "POST",
      credentials: "include",
    },
    toast: true,
    src: "",
  };
</script>

<FileForm {...options} />
```
