---
component: form-image
---

```svelte
<script>
  import { FormImage } from "bubbles-ui";

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
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png",
  };
</script>

<FormImage {...options} />
```
