<script>
  import "$lib/css/app.css";

  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import SidebarPageWrapper from "$lib/layouts/SidebarPageWrapper.svelte";
  import Modal from "$lib/components/modal/Modal.svelte";
  import Toast from "$lib/components/toast/Toast.svelte";
  import { toastStore } from "$lib/stores/stores";

  const sidebarConfig = {
    logo: "/logo.svg",
    sections: [
      {
        title: "Welcome",
        href: "/",
        section: "Getting Started",
      },
      {
        title: "Installation",
        href: "#installation",
        section: "Getting Started",
      },
      {
        title: "Usage",
        href: "#usage",
        section: "Getting Started",
      },
      {
        title: "Colors",
        href: "#colors",
        section: "Getting Started",
      },
      {
        title: "Page Layouts",
        href: "#page-layouts",
        section: "Layouts",
      },
      {
        title: "Page Rows",
        href: "#page-rows",
        section: "Layouts",
      },
      {
        title: "Page Columns",
        href: "#page-columnss",
        section: "Layouts",
      },
      {
        title: "Page Grids",
        href: "#page-grids",
        section: "Layouts",
      },
      {
        title: "Page Center",
        href: "#page-center",
        section: "Layouts",
      },
      {
        title: "Buttons",
        href: "#buttons",
        section: "Components",
      },
      {
        title: "Cards",
        href: "#cards",
        section: "Components",
      },
      {
        title: "Checkboxes",
        href: "#checkboxes",
        section: "Components",
      },
    ],
  };
</script>

{#each $toastStore as toast}
  <Toast {...toast} />
{/each}

<Sidebar {...sidebarConfig} />
<SidebarPageWrapper>
  <slot />
</SidebarPageWrapper>

<Modal />

<style>
  :global(p) {
    margin-bottom: 1rem;
    color: var(--gray-darker);
  }

  :global(p) {
    font-size: 1rem;
  }

  :global(.mt-2) {
    margin-top: 2rem;
  }
</style>
