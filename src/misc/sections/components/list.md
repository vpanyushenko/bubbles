---
component: list
---

```svelte
<script>
  import { List } from "bubbles-ui";

  // If you want a more complicated ListItem, you can slot your own UI
  //import { List, ListItem } from "bubbles-ui";

  // <List>
  //   <ListItem>
  //     <div>
  //       add content here
  //     </div>
  //   </ListItem>
  // </List>
</script>

<List
  items={[
    {
      label: "Label",
      text: "Simple List Item",
    },
    {
      label: "Label",
      text: "Example with href",
      href: "https://google.com",
      new_page: true,
    },
    {
      label: "Download",
      text: "Icon Example",
      icon: "download",
      onclick: () => {
        alert("List clicked");
      },
    },
    {
      label: "copy",
      text: "Icon Example",
      icon: "copy",
      onclick: () => {
        alert("List clicked");
      },
    },
    {
      label: "edit",
      text: "Icon Example",
      icon: "edit",
      onclick: () => {
        alert("List clicked");
      },
    },
    {
      label: "trash",
      text: "Icon Example",
      icon: "trash",
      onclick: () => {
        alert("List clicked");
      },
    },
  ]}
/>

<List
  type="timeline"
  items={[
    {
      label: "Label",
      text: "List test",
      href: "https://google.com",
      new_page: true,
      active: false,
    },
    {
      label: "Label",
      text: "List test",
      icon: "edit",
      active: true,
    },
  ]}
/>
```
