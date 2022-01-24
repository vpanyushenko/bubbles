<script>
  import "$lib/css/app.css";
  import "../../../code.css";

  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import SidebarPageWrapper from "$lib/layouts/SidebarPageWrapper.svelte";
  import PageWrapper from "$lib/layouts/PageWrapper.svelte";
  import Modal from "$lib/components/modal/Modal.svelte";
  import ToastContainer from "$lib/components/toast/ToastContainer.svelte";

  import { goto } from "$app/navigation";
  import { configStore } from "$lib/stores/stores";
  $configStore.goto = goto;
</script>

<ToastContainer />

<!-- <Sidebar {...sidebarConfig} /> -->
<PageWrapper>
  <slot />
</PageWrapper>

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
