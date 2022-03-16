---
component: card-header
---

```svelte
<script>
  import { Card, CardHeader, showModal } from "bubbles-ui";
</script>

<Card color="dark" px={0} py={0} height100={true}>
  <CodeCard2 />
</Card>

<Card>
  <CardHeader title="Title" caption="Learn more <a href='https://google.com'>here</a>." />
  <div class="d-flex">This is a card header</div>
</Card>

<Card>
  <CardHeader
    title="Header With Buttons"
    buttons={[
      {
        icon: "edit",
        href: "/#cards",
      },
      {
        icon: "more",
        options: [
          {
            label: "Contact Support",
            href: "/#cards",
          },
          {
            label: "Delete Account",
            onclick: () => {
              showModal("Delete Account");
            },
          },
        ],
      },
    ]}
  />
  <div class="d-flex">This is a card header with buttons</div>
</Card>

<Card>
  <CardHeader
    filters={[
      {
        id: "filter",
        label: "Filter",
        options: [
          {
            label: "Filter 1",
            value: "filter1",
            caption: "Most popular",
          },
          "break",
          {
            label: "Filter 2",
            value: "filter2",
          },
          {
            label: "Filter 3",
            value: "filter3",
          },
        ],
      },
    ]}
  />
  <span class="d-flex">
    This is a card header with filters. The filters will update page query params which will make Svelte fetch new data.
    You can also pass your own logic for the filter by adding a function to the onselect property for the filter
    options.
  </span>
</Card>
```
