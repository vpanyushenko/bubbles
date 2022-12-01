---
width: 100
height: 100
type: code
---

```svelte
<script>
  //This is the example for adding the icon buttons into the Header or CardHeader component.

  import { Header, fuzzySearch } from "bubbles-ui";
  import sections from "$docs/utils/sidebar-sections"; //Just for the demo, since there is a search element here

  const props = {
    title: "IconButton", //This will automatically set the page title for you unless you overwrite it with svelte:head
    buttons: [
      {
        icon: "search",
        color: "gray-lighter",
        search: true,
        typeahead: (input) => {
          const filtered = fuzzySearch(input, sections, { keys: ["id"], sort: true });

          return Promise.resolve(
            filtered.map((obj) => {
              return { label: obj.label, value: obj.id, href: `/${obj.id}`, new_page: false }; //Returns a dropdown component like a select with a label and value props
            })
          );
        },
      },
      {
        icon: "more",
        color: "gray-lighter",
        options: [
          {
            label: "Option 1",
            caption: "This is an option caption",
          },
          {
            label: "Option 2",
            caption: "This is an example with onclick",
          },
        ],
      },
    ],
  };
</script>

<Header {...props} />
```
