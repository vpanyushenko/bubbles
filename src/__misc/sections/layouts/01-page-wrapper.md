---
component: page-wrapper
---

```svelte
<script>
  // __layout.svelte

  // First import the global css styles
  import "bubbles-ui/css/app.css";

  // Import the components
  import { SidebarPageWrapper, Sidebar, Modal, ToastContainer } from "bubbles-ui";

  // Import the stores, just separated for cleaner code
  import { toastStore } from "bubbles-ui";

  // Create a sidebar config, more on that in the sidebar section
  const sidebarConfig = {
    logo: logo,
    sections: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "Settings",
        href: "/settings",
      },
    ],
  };
</script>

<!-- Toasts can occur between page transitions, because of forms, or other reasons.
     It's easier to add them to the __layout.svelte file and add them to the DOM from
     The store. More on that in the Toast section -->
<ToastContainer />

<!-- The sidebar can get added the layout. The SidebarPageWrapper will make sure your content
     will look nice with the Sidebar. The rest of your content will be loaded in the <slot/> -->
<Sidebar {...sidebarConfig} />
<SidebarPageWrapper>
  <slot />
</SidebarPageWrapper>

<!-- Modals usually are on top of everything. It's easy to add them here and then add content to
     then and toggle them through included utility functions. More on this in the modal section -->
<Modal />
```
