---
type: code
---

```svelte
<!-- __layout.svelte -->
<script>
  import { Sidebar, SidebarPageWrapper, Modal, ToastContainer } from "$lib/stores/stores";

  const sidebarConfig = {
    logo: "/logo.svg",
    sections: [
      {
        label: "Welcome",
        id: "welcome",
        href: "/",
        section: "Getting Started",
        //icon: "" add your icons if you'll be using them
      },
      {
        label: "Installation",
        id: "installation",
        href: "#installation",
        section: "Getting Started",
      },
      {
        label: "Usage",
        id: "usage",
        href: "#usage",
        section: "Getting Started",
      },
      {
        label: "Colors",
        id: "colors",
        href: "#colors",
        section: "Getting Started",
      },
      {
        label: "Page Wrappers",
        id: "page-wrappers",
        href: "#page-wrappers",
        section: "Layouts",
      },
      {
        label: "Page Rows",
        id: "page-rows",
        href: "#page-rows",
        section: "Layouts",
      },
      {
        label: "Page Columns",
        id: "page-columns",
        href: "#page-columns",
        section: "Layouts",
      },
      {
        label: "Page Grids",
        id: "page-grids",
        href: "#page-grids",
        section: "Layouts",
      },
      {
        label: "Page Center",
        id: "page-center",
        href: "#page-center",
        section: "Layouts",
      },
    ],
  };
</script>

<ToastContainer />

<Sidebar {...sidebarConfig} />
<SidebarPageWrapper>
  <slot />
</SidebarPageWrapper>

<Modal />
```
