<script>
  import { modalStore } from "$lib/stores/modal.store";
  import IconButton from "$lib/components/button/IconButton.svelte";

  function hideModal() {
    $modalStore = {};
  }
</script>

<header>
  <h6 class="title">{$modalStore.title}</h6>
  <IconButton icon="close" onclick={hideModal} />
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 13px;
    line-height: 1.38462;
    font-weight: 500;
    color: #b2b3bd;
  }

  .title {
    font-family: "Poppins", sans-serif;
    font-size: 1.125rem;
    line-height: 1.33333;
    color: var(--black);
  }
</style>
