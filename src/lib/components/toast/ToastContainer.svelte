<script>
  import { toastStore } from "$lib/stores/stores";
  import Toast from "$lib/components/toast/Toast.svelte";
</script>

<div>
  {#each $toastStore as toast}
    <Toast {...toast} />
  {/each}
</div>

<style>
  div {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 2147483647;
    max-width: calc(50% - 1.25rem);
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 1179px) {
    div {
      max-width: calc(100% - 1.25rem);
    }
  }
</style>
