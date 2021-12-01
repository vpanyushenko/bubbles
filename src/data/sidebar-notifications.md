---
component: sidebar-notifications
---

```js
import { Button, pageStore } from "bubbles-ui";

<Card>
  <CardHeader title="Updating Sidebar Notifications" wide={true} border={null} />
  <Button
    label="Increment Notifications"
    mb={true}
    wide={true}
    color="success"
    onclick={() => {
      $pageStore.sidebar.notifications.sidebar++;
    }}
  />
  <Button
    label="Decrement Notifications"
    mb={true}
    wide={true}
    color="error"
    onclick={() => {
      if ($pageStore.sidebar.notifications.sidebar > 0) {
        $pageStore.sidebar.notifications.sidebar--;
      }
    }}
  />
</Card>;

//$pageStore.sidebar.notifications.sidebar++;
//                                   ^^ the ID of the section

//You can also override the active sidebar section by adding the ID of the section to want to the
//active_item field in the pageStore

//$pageStore.sidebar.active_item = "/dashboard"
```
