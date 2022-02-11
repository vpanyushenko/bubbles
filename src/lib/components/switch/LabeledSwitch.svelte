<script>
  import Switch from "./Switch.svelte";
  import { configStore, pageStore } from "$lib/stores/stores";

  export let id = "";
  export let desc = "";
  export let error = "An error occurred";
  export let label = "";
  export let disabled = false;
  export let onclick = null;
  export let onselect = null;
  export let onchange = null;
  export let validation = null;
  export let value = false;
  export let form_indent = true;

  const _label =
    $configStore.show_required && validation && validation.split("|").includes("required") ? `${label}*` : label;

  $: is_error = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  $: if (is_error) {
    setTimeout(() => {
      $pageStore.errors = $pageStore.errors.filter((a) => a !== id);
      is_error = false;
    }, $configStore.error_delay);
  }

  $: is_loading = false;
</script>

<div class="form__field__container" {id}>
  <div class="field" class:style__indent={form_indent}>
    <span>
      <p class="error" class:hidden={!is_error}>{error}</p>
      <p class="label" class:hidden={is_error}>{_label}</p>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </span>

    <Switch {disabled} {onclick} {onselect} {onchange} {id} bind:value />
  </div>
</div>

<style>
  .form__field__container {
    width: 100%;
  }

  .field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    height: 5rem;
    /* padding-left: 1.375rem;
    padding-right: 1.375rem; */
    /* border-radius: 8px;
    border: 1px solid var(--gray-light); */
  }

  .error {
    color: var(--error);
    transition: transform 0.2s;
  }

  .field__desc {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  p {
    margin: 0px;
  }
</style>
