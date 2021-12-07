<script>
  import "$lib/css/app.css";
  import "../../code.css";

  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import SidebarPageWrapper from "$lib/layouts/SidebarPageWrapper.svelte";
  import Modal from "$lib/components/modal/Modal.svelte";
  import ToastContainer from "$lib/components/toast/ToastContainer.svelte";

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
