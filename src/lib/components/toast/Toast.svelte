<script>
  import { fly, fade } from "svelte/transition";
  import close from "./close.svg";
  import { toastStore } from "$lib/utils/toast";

  export let active = false;
  export let type = "success";
  export let message;
  export let id;

  function closeToast(event) {
    toastStore.update((toasts) => {
      toasts.splice(index, 1);
      return toasts;
    });
  }

  $: index = $toastStore.findIndex((toast) => toast.id === id);
  $: top = `${20 + 60 * index}px`;

  setTimeout(() => {
    toastStore.update((toasts) => {
      toasts.splice(index, 1);
      return toasts;
    });
  }, 5500);
</script>

{#if active}
  <div
    class="toast"
    class:success={type === "success"}
    class:error={type === "error"}
    {id}
    style="top: {top}"
    in:fly={{ duration: 300, y: -100 }}
    out:fade={{ duration: 300 }}
  >
    <span>{message}</span>
    <img src={close} alt="Close Button" on:click={closeToast} />
  </div>
{/if}

<style>
  .toast {
    padding: 12px 1.25rem;
    color: #ffffff;
    display: inline-block;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: fixed;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    max-width: calc(50% - 1.25rem);
    z-index: 2147483647;
    right: 15px;
    /* top: 30px; */
    display: flex;
    border-radius: 8px;
  }

  .toast.success {
    background-color: var(--green);
  }

  .toast.error {
    background-color: var(--red);
  }

  img {
    opacity: 0.4;
    padding: 0 5px;
    margin-left: 0.625rem;
  }

  .toast-rounded {
    border-radius: 25px;
  }

  .toast-avatar {
    width: 1.5em;
    height: 1.5em;
    margin: 0 5px;
    border-radius: 2px;
  }

  .toast-center {
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    max-width: fit-content;
  }

  @media only screen and (max-width: 500px) {
    .toast {
      margin-left: auto;
      margin-right: 0.625rem;
      left: 0;
      right: 0;
      max-width: fit-content;
    }
  }
</style>
