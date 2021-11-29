---
component: card-header
---

```js
import { Card, CardHeader, CardFooter, showModal } from "bubbles-ui";

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
          onclick: showModal(), //add modal options
        },
      ],
    },
  ],
};

const headerWithFilters = {
  filters: [
    {
      //TODO:
    },
  ],
};

<Card>
  <CardHeader {...header1} />
</Card>;
```
