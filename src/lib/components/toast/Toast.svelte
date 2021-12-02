<script>
  import { fly, fade } from "svelte/transition";
  import close from "./close.svg";
  import { configStore, toastStore } from "$lib/stores/stores";

  export let active = false;
  export let color = "success";
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
      const filteredToasts = toasts
        .map((toast) => {
          if (Date.now() - toast.timestamp + 50 < $configStore.toast_delay) {
            return toast;
          } else {
            return null;
          }
        })
        .filter(Boolean);
      return filteredToasts;
    });
  }, $configStore.toast_delay);
</script>

{#if active}
  <div
    class="toast"
    class:primary={color === "primary"}
    class:secondary={color === "secondary"}
    class:error={color === "error"}
    class:warning={color === "warning"}
    class:success={color === "success"}
    class:info={color === "info"}
    class:gray={color === "gray"}
    class:dark={color === "dark"}
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

  .primary {
    background: var(--primary);
    color: var(--white);
  }

  .primary:hover {
    background: var(--primary-dark);
  }

  .secondary {
    background: var(--secondary);
    color: var(--white);
  }

  .secondary:hover {
    background: var(--secondary-dark);
  }

  .error {
    background: var(--error);
    color: var(--white);
  }

  .error:hover {
    background: var(--error-dark);
  }

  .warning {
    background: var(--warning);
    color: var(--white);
  }

  .warning:hover {
    background: var(--warning-dark);
  }

  .success {
    background: var(--success);
    color: var(--white);
  }

  .success:hover {
    background: var(--success-dark);
  }

  .success-light {
    background: var(--success-lightest);
    color: var(--success-darkest);
  }

  .info {
    background: var(--info);
    color: var(--white);
  }

  .info:hover {
    background: var(--info-dark);
  }

  .dark {
    background: var(--dark);
    color: var(--white);
  }

  .dark:hover {
    background: var(--dark-light);
  }
  .gray {
    background: var(--gray);
    color: var(--gray-lightest);
  }

  .gray:hover {
    background: var(--gray-dark);
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
