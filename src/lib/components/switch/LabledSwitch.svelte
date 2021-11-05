<script>
  import Switch from "./Switch.svelte";

  export let id = "";
  export let desc = "";
  export let isError = false;
  export let error = "An error occured";
  export let label = "Label";
  export let disabled = false;
  export let loading = false;
  export let onclick = null;
  export let value = true;
</script>

<div class="js-form-field-container" {id}>
  <div class="field js-field">
    <span>
      <p class="error" class:hidden={!isError}>{error}</p>
      <p class="label">{label}</p>
    </span>

    <Switch {disabled} {loading} {onclick} bind:value />
  </div>
  {#if desc}
    <p class="field__desc">{desc}</p>
  {/if}
</div>

<style>
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
    color: var(--red);
    transition: transform 0.2s;
    margin-bottom: 0px !important;
  }
</style>
