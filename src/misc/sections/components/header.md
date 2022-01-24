---
component: header
---

```svelte
<script>
import { Header } from "bubbles-ui";

const props = {
  title: "Page Title", //This will automatically set the page title for you unless you overwrite it with svelte:head
  breadcrumb_labels: ["Hello", "World"] //pass labels if you want to set your breadcrumbs manually. Generally only required if you have two dynamic IDs in your URLs next to each other
  buttons: [
    {
      icon: "add" //use one of the bundled icons or pass in your own svg
      onclick: (event) => {
        someFunction(), //you can all a function on click, like opening a modal;
      }
      href: null, //if you want this button to bring you to a different page. The benefit of href instead of onclick here is that the page will prefetch on hover for a faster load
      dropdown: [] //if you want to open a menu of options, you can pass them in here
    },
    {
      icon: "more" //use one of the bundled icons or pass in your own svg
      onclick: null,
      href: null,
      dropdown: [
        {
          label: "Option 1",
          caption: "This is an option caption"
          href: "/about"
        },
        {
          label: "Option 2",
          caption: "This is an example with onclick",
          onclick: (event) => { //can use onclick instead of href
            someFunction()
          }
        }
      ]
    }
  ]
}

const custom_breadcrumbs = {
  title: "Page Title",
  breadcrumbs: [
    {
      label: "Home",
      href: "/index"
    },
    {
      label: "Nested Route",
      href: "/index/nested-route"
    }
  ]
}
</script>

<Header {...props} />
```
