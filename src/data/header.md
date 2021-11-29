---
component: header
---

```js
import { Header } from "bubbles-ui";

 const props = {
    title: "Page Title",
    breadcrumbs: false,
    buttons: [
      {
        icon: "add" //use one of the bundled icons or pass in your own svg
        onclick: () => someFunction(), //you can all a function on click, like opening a moda;
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
            onclick: () => someFunction() //can use onclick instead of href
          }
        ]
      }
    ]
  }
```
