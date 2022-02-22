<script>
  import "$lib/css/app.css";

  import { goto } from "$app/navigation";
  import PageWrapper from "$lib/layouts/PageWrapper.svelte";
  import Modal from "$lib/components/modal/Modal.svelte";
  import ToastContainer from "$lib/components/toast/ToastContainer.svelte";
  import { pageStore, configStore } from "$lib/stores/stores";

  $configStore.goto = goto;
</script>

<ToastContainer />

<PageWrapper>
  <slot />
</PageWrapper>

<Modal />
