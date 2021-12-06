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
        label: "Pokedex (Table Example)",
        href: "/pokedex",
        href_aliases: ["/examples/pokedex"],
      },
      {
        label: "Settings Page Example",
        href: "/settings",
      },
      {
        label: "Auth Page Example",
        href: "/auth",
      },
      {
        label: "Error",
        href: "/error",
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
