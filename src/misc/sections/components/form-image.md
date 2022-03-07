---
component: form-image
---

```svelte
<script>
  import { ImageForm, FileForm } from "bubbles-ui";

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
    extensions: [".csv"],
    label: "Select File",
  };
</script>

<ImageForm {...options} />
<FileForm {...options} />
```
