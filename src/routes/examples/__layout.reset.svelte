<script>
  import "$lib/css/app.css";
  import "../../code.css";

  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import SidebarPageWrapper from "$lib/layouts/SidebarPageWrapper.svelte";
  import PageWrapper from "$lib/layouts/PageWrapper.svelte";
  import Modal from "$lib/components/modal/Modal.svelte";
  import ToastContainer from "$lib/components/toast/ToastContainer.svelte";

  import { goto } from "$app/navigation";
  import { configStore } from "bubbles-ui";
  $configStore.goto = goto;

  const sidebarConfig = {
    logo: "/logo.svg",
    sections: [
      {
        label: "Pokedex",
        href: "/examples",
        href_aliases: ["/examples/pokedex"],
        icon: "/favicon.png",
      },
      {
        label: "Settings",
        href: "/examples/settings",
        icon: "/favicon.png",
      },
      {
        label: "Auth",
        href: "/examples/auth",
        icon: "/favicon.png",
      },
      {
        label: "Error",
        href: "/examples/error",
        icon: "/favicon.png",
      },
      {
        label: "Grid",
        href: "/examples/grid",
        icon: "/favicon.png",
      },
      {
        label: "Form",
        href: "/examples/form",
        icon: "/favicon.png",
        href_aliases: ["/examples/test"],
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

<style>
  :global(p) {
    margin-bottom: 1rem;
    color: var(--gray-darker);
  }

  :global(.mt-2) {
    margin-top: 2rem;
  }
</style>
