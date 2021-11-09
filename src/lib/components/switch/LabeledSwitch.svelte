<script>
  import Switch from "./Switch.svelte";

  export let id = "";
  export let desc = "";
  export let error = "An error occured";
  export let label = "";
  export let disabled = false;
  export let onclick = null;

  export let value = true;

  $: is_error = false; //TODO:
  $: is_loading = false;
</script>

<div class="form__field__container" {id}>
  <div class="field js-field">
    <span>
      <p class="error" class:hidden={!is_error}>{error}</p>
      <p class="label" class:hidden={is_error}>{label}</p>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </span>

    <Switch {disabled} {onclick} bind:value bind:is_loading />
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
    color: #11142d;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    height: 5rem;
    padding-left: 22px;
    padding-right: 22px;
    /* border-radius: 8px;
    border: 1px solid var(--gray-light); */
  }

  .error {
    pointer-events: none;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--error);
    transition: transform 0.2s;
    margin-bottom: 0px !important;
  }

  .field__desc {
    padding: 0.625rem 0 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }
</style>
