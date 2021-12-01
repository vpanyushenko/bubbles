---
component: card-header
---

```js
import { Card, CardHeader, showModal } from "bubbles-ui";

const header1 = {
  title: "Title",
  caption: "Learn more <a href='https://google.com'>here</a>.", //Anchor tag will render correctly
  border: false,
  center: true,
};

const headerWithActions = {
  title: "Your Information",
  border: true,
  actions: [
    {
      icon: "edit",
      href: "/profile/edit",
    },
    {
      icon: "more",
      options: [
        {
          label: "Contact Support",
          href: "/support",
        },
        {
          label: "Delete Account",
          onclick: () => {
            showModal(), //add modal options
          }
        },
      ],
    },
  ],
};

const headerWithFilters = {
  filters: [
    {
        id: "filter", //this will be the id for the query param
        label: "Filter",
        options: [
          {
            label: "Filter 1",
            value: "filter1",
            caption: "Most popular",
            onselect = (event) => {
              //you can add your own filter logic here.
              //or you can omit the onselect and Bubbles
              //will update the query params for you
            }
          },
          "break", //Add a line break if you want
          {
            label: "Filter 2",
            value: "filter2",
          },
          {
            label: "Filter 3",
            value: "filter3",
          },
        ]
    }
  ]
}

<Card>
  <CardHeader {...header1} />
</Card>;
```
