---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { Button, showLoading, hideLoading } from "bubbles-ui";

  const props = {
    id: "123",
    label: "Complete",
    color: "secondary", //secondary-light for light button or secondary-border for border button
    onclick: (event) => {
      const id = event.currentTarget.id;

      console.log(`Button ${id} clicked`);

      showLoading(id); //will show the loading state

      //hide the loading button after a promise resolves
      fetch("/")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          hideLoading(id);
        });
    },
    wide: true,
  };
</script>

<Button {...props} />
```
