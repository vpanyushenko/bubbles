---
component: icon-buttons
---

```svelte
<script>
  import { IconButton } from "bubbles-ui";

  const propsForDropdown = {
    icon: "more", //select pre made icon or add your own svg
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

  const singleActionButton = {
    icon: "add",
    href: "/new",
    // onclick: () => {
    //custom logic here like:
    //showModal() ...
    // },
  };
</script>


<IconButton {...propsForDropdown}>
<IconButton {...singleActionButton}>
```
