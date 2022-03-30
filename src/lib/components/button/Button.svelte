<script>
  import { pageStore } from "$lib/stores/page.store";
  import { v4 as uuid } from "@lukeed/uuid";
  import { navigating } from "$app/stores";
  import Spinner from "$lib/components/spinner/Spinner.svelte";

  export let id = uuid();
  export let label = "Submit";
  export let onclick = null;
  export let onsubmit = null;
  export let color = "primary";
  export let mt = false;
  export let mb = false;
  export let wide = true;
  export let new_page = false;
  export let href;
  export let style;
  export let disabled = false;

  $: is_loading = ($pageStore.clicked === id && $navigating) || $pageStore.loading.includes(id);
</script>

{#if href}
  <a
    class:wide
    {href}
    sveltekit:prefetch
    target={new_page ? "_blank" : ""}
    on:click={() => {
      $pageStore.clicked = id;
    }}
    on:click={onclick}
    on:click={onsubmit}
  >
    <button
      {id}
      class="btn"
      class:primary={color === "primary"}
      class:secondary={color === "secondary"}
      class:error={color === "error"}
      class:warning={color === "warning"}
      class:success={color === "success"}
      class:info={color === "info"}
      class:gray={color === "gray"}
      class:dark={color === "dark"}
      class:primary-light={color === "primary-light"}
      class:secondary-light={color === "secondary-light"}
      class:error-light={color === "error-light"}
      class:warning-light={color === "warning-light"}
      class:success-light={color === "success-light"}
      class:info-light={color === "info-light"}
      class:gray-light={color === "gray-light"}
      class:dark-light={color === "dark-light"}
      class:primary-border={color === "primary-border"}
      class:secondary-border={color === "secondary-border"}
      class:error-border={color === "error-border"}
      class:warning-border={color === "warning-border"}
      class:success-border={color === "success-border"}
      class:info-border={color === "info-border"}
      class:gray-border={color === "gray-border"}
      class:dark-border={color === "dark-border"}
      class:mb
      class:mt
      class:wide
      {style}
      disabled={is_loading || disabled}
    >
      <div class="flex">
        <span class="loading" class:hidden={!is_loading}><Spinner /></span>
        <span>{label}</span>
      </div>
    </button>
  </a>
{:else}
  <button
    on:click={() => {
      $pageStore.clicked = id;
    }}
    on:click={onclick}
    on:click={onsubmit}
    {id}
    class="btn"
    class:primary={color === "primary"}
    class:secondary={color === "secondary"}
    class:error={color === "error"}
    class:warning={color === "warning"}
    class:success={color === "success"}
    class:info={color === "info"}
    class:gray={color === "gray"}
    class:dark={color === "dark"}
    class:primary-light={color === "primary-light"}
    class:secondary-light={color === "secondary-light"}
    class:error-light={color === "error-light"}
    class:warning-light={color === "warning-light"}
    class:success-light={color === "success-light"}
    class:info-light={color === "info-light"}
    class:gray-light={color === "gray-light"}
    class:dark-light={color === "dark-light"}
    class:primary-border={color === "primary-border"}
    class:secondary-border={color === "secondary-border"}
    class:error-border={color === "error-border"}
    class:warning-border={color === "warning-border"}
    class:success-border={color === "success-border"}
    class:info-border={color === "info-border"}
    class:gray-border={color === "gray-border"}
    class:dark-border={color === "dark-border"}
    class:mb
    class:mt
    class:wide
    {style}
    {disabled}
  >
    <div class="flex">
      <span class="loading" class:hidden={!is_loading}><Spinner style="margin: 0 0.5rem 0 0" /></span>
      <span>{label}</span>
    </div>
  </button>
{/if}

<style>
  .mb {
    margin-bottom: 1rem;
  }

  .mt {
    margin-top: 1rem;
  }

  .btn {
    min-width: 10rem;
    height: 3.5rem;
    padding: 0 1.25rem;
    border-radius: 1rem/1rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: 700;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5rem;
  }

  .primary {
    background: var(--primary);
    color: var(--white);
  }

  .primary:focus,
  .primary:hover {
    background: var(--primary-dark);
  }

  .primary-light {
    background: var(--primary-lightest);
    color: var(--primary-darkest);
  }

  .primary-light:focus,
  .primary-light:hover {
    background: var(--primary-lighter);
  }

  .primary-border {
    border: 3px solid var(--primary);
    color: var(--primary);
  }

  .primary-border:focus,
  .primary-border:hover {
    background: var(--primary-lightest);
  }

  .secondary {
    background: var(--secondary);
    color: var(--white);
  }

  .secondary:focus,
  .secondary:hover {
    background: var(--secondary-dark);
  }

  .secondary-light {
    background: var(--secondary-lightest);
    color: var(--secondary-darkest);
  }

  .secondary-light:focus,
  .secondary-light:hover {
    background: var(--secondary-lighter);
  }

  .secondary-border {
    border: 3px solid var(--secondary);
    color: var(--secondary);
  }

  .secondary-border:focus,
  .secondary-border:hover {
    background: var(--secondary-lightest);
  }

  .error {
    background: var(--error);
    color: var(--white);
  }

  .error:focus,
  .error:hover {
    background: var(--error-dark);
  }

  .error-light {
    background: var(--error-lightest);
    color: var(--error-darkest);
  }

  .error-light:focus,
  .error-light:hover {
    background: var(--error-lighter);
  }

  .error-border {
    border: 3px solid var(--error);
    color: var(--error);
  }

  .error-border:focus,
  .error-border:hover {
    background: var(--error-lightest);
  }

  .warning {
    background: var(--warning);
    color: var(--white);
  }

  .warning:focus,
  .warning:hover {
    background: var(--warning-dark);
  }

  .warning-light {
    background: var(--warning-lightest);
    color: var(--warning-darkest);
  }

  .warning-light:focus,
  .warning-light:hover {
    background: var(--warning-lighter);
  }

  .warning-border {
    border: 3px solid var(--warning);
    color: var(--warning);
  }

  .warning-border:focus,
  .warning-border:hover {
    background: var(--warning-lightest);
  }

  .success {
    background: var(--success);
    color: var(--white);
  }

  .success:focus,
  .success:hover {
    background: var(--success-dark);
  }

  .success-light {
    background: var(--success-lightest);
    color: var(--success-darkest);
  }

  .success-light:focus,
  .success-light:hover {
    background: var(--success-lighter);
  }

  .success-border {
    border: 3px solid var(--success);
    color: var(--success);
  }

  .success-border:focus,
  .success-border:hover {
    background: var(--success-lightest);
  }

  .info {
    background: var(--info);
    color: var(--white);
  }

  .info:focus,
  .info:hover {
    background: var(--info-dark);
  }

  .info-light {
    background: var(--info-lightest);
    color: var(--info-darkest);
  }

  .info-light:focus,
  .info-light:hover {
    background: var(--info-lighter);
  }

  .info-border {
    border: 3px solid var(--info);
    color: var(--info);
  }

  .info-border:focus,
  .info-border:hover {
    background: var(--info-lightest);
  }

  .dark {
    background: var(--dark);
    color: var(--white);
  }

  .dark:focus,
  .dark:hover {
    background: var(--dark-light);
  }

  .dark-light {
    background: var(--dark-lightest);
    color: var(--dark-darkest);
  }

  .dark-light:focus,
  .dark-light:hover {
    background: var(--dark-light);
    color: var(--white);
  }

  .dark-border {
    border: 3px solid var(--dark);
    color: var(--dark);
  }

  .dark-border:focus,
  .dark-border:hover {
    background: var(--dark-lightest);
  }

  .gray {
    background: var(--gray);
    color: var(--gray-lightest);
  }

  .gray:focus,
  .gray:hover {
    background: var(--gray-dark);
  }

  .gray-light {
    background: var(--gray-lightest);
    color: var(--gray-grayest);
  }

  .gray-light:focus,
  .gray-light:hover {
    background: var(--gray-light);
  }

  .gray-border {
    border: 3px solid var(--gray);
    color: var(--gray);
  }

  .gray-border:focus,
  .gray-border:hover {
    background: var(--gray-lightest);
  }

  .wide {
    min-width: 100%;
  }

  .btn:disabled {
    cursor: not-allowed;
    background: var(--gray-light);
    color: var(--gray-dark);
  }
</style>
