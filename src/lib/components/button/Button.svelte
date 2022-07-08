<script>
  import { pageStore, configStore } from "$lib/utils/stores";
  import { v4 as uuid } from "@lukeed/uuid";
  import { navigating } from "$app/stores";
  import Spinner from "$lib/components/spinner/Spinner.svelte";
  import IconButton from "./IconButton.svelte";

  export let id = uuid();
  export let label = null;
  export let onclick = null;
  export let onsubmit = null;
  export let color = "__default";
  export let mt = false;
  export let mb = false;
  export let wide = true;
  export let new_page = false;
  export let href;
  export let style;
  export let disabled = false;
  export let icon = null;
  export let dark_mode_invert = $configStore?.dark_mode_invert;

  //IconButton exclusive
  export let align = "right";
  export let border = null;
  export let invert_icon = false;
  export let shadow = false;
  export let typeahead = null;
  export let debounce = 350;
  export let search = false;
  export let __search_id = null;
  export let __search_width_100 = false;
  export let radius = "blocky"; //or blocky
  export let larger = true;

  let component = "IconButton";

  if (label) {
    component = "Button";
  }

  if (component === "IconButton" && color === "__default") {
    color = null;
  }

  if (component === "Button" && color === "__default") {
    color = "primary";
  }

  $: is_loading = ($pageStore.clicked === id && $navigating) || $pageStore.loading.includes(id);
</script>

{#if !label && icon}
  <IconButton
    {id}
    {onclick}
    {color}
    {new_page}
    {href}
    {disabled}
    {icon}
    {align}
    {border}
    {invert_icon}
    {dark_mode_invert}
    {shadow}
    {typeahead}
    {debounce}
    {search}
    {__search_id}
    {__search_width_100}
    {radius}
    {larger}
  />
{:else if href}
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
      class:mb
      class:mt
      class:wide
      {style}
      disabled={is_loading || disabled}
      class:larger
      class:dark_mode_invert
      class:bg-primary-lightest={color === "primary-lightest"}
      class:bg-primary-lighter={color === "primary-lighter"}
      class:bg-primary-light={color === "primary-light"}
      class:bg-primary={color === "primary"}
      class:bg-primary-dark={color === "primary-dark"}
      class:bg-primary-darker={color === "primary-darker"}
      class:bg-primary-darkest={color === "primary-darkest"}
      class:bg-secondary-lightest={color === "secondary-lightest"}
      class:bg-secondary-lighter={color === "secondary-lighter"}
      class:bg-secondary-light={color === "secondary-light"}
      class:bg-secondary={color === "secondary"}
      class:bg-secondary-dark={color === "secondary-dark"}
      class:bg-secondary-darker={color === "secondary-darker"}
      class:bg-secondary-darkest={color === "secondary-darkest"}
      class:bg-error-lightest={color === "error-lightest"}
      class:bg-error-lighter={color === "error-lighter"}
      class:bg-error-light={color === "error-light"}
      class:bg-error={color === "error"}
      class:bg-error-dark={color === "error-dark"}
      class:bg-error-darker={color === "error-darker"}
      class:bg-error-darkest={color === "error-darkest"}
      class:bg-warning-lightest={color === "warning-lightest"}
      class:bg-warning-lighter={color === "warning-lighter"}
      class:bg-warning-light={color === "warning-light"}
      class:bg-warning={color === "warning"}
      class:bg-warning-dark={color === "warning-dark"}
      class:bg-warning-darker={color === "warning-darker"}
      class:bg-warning-darkest={color === "warning-darkest"}
      class:bg-success-lightest={color === "success-lightest"}
      class:bg-success-lighter={color === "success-lighter"}
      class:bg-success-light={color === "success-light"}
      class:bg-success={color === "success"}
      class:bg-success-dark={color === "success-dark"}
      class:bg-success-darker={color === "success-darker"}
      class:bg-success-darkest={color === "success-darkest"}
      class:bg-info-lightest={color === "info-lightest"}
      class:bg-info-lighter={color === "info-lighter"}
      class:bg-info-light={color === "info-light"}
      class:bg-info={color === "info"}
      class:bg-info-dark={color === "info-dark"}
      class:bg-info-darker={color === "info-darker"}
      class:bg-info-darkest={color === "info-darkest"}
      class:bg-gray-lightest={color === "gray-lightest"}
      class:bg-gray-lighter={color === "gray-lighter"}
      class:bg-gray-light={color === "gray-light"}
      class:bg-gray={color === "gray"}
      class:bg-gray-dark={color === "gray-dark"}
      class:bg-gray-darker={color === "gray-darker"}
      class:bg-gray-darkest={color === "gray-darkest"}
      class:bg-dark-lightest={color === "dark-lightest"}
      class:bg-dark-lighter={color === "dark-lighter"}
      class:bg-dark-light={color === "dark-light"}
      class:bg-dark={color === "dark"}
      class:bg-dark-dark={color === "dark-dark"}
      class:bg-dark-darker={color === "dark-darker"}
      class:bg-dark-darkest={color === "dark-darkest"}
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
    class:mb
    class:mt
    class:wide
    {style}
    {disabled}
    class:larger
    class:dark_mode_invert
    class:bg-primary-lightest={color === "primary-lightest"}
    class:bg-primary-lighter={color === "primary-lighter"}
    class:bg-primary-light={color === "primary-light"}
    class:bg-primary={color === "primary"}
    class:bg-primary-dark={color === "primary-dark"}
    class:bg-primary-darker={color === "primary-darker"}
    class:bg-primary-darkest={color === "primary-darkest"}
    class:bg-secondary-lightest={color === "secondary-lightest"}
    class:bg-secondary-lighter={color === "secondary-lighter"}
    class:bg-secondary-light={color === "secondary-light"}
    class:bg-secondary={color === "secondary"}
    class:bg-secondary-dark={color === "secondary-dark"}
    class:bg-secondary-darker={color === "secondary-darker"}
    class:bg-secondary-darkest={color === "secondary-darkest"}
    class:bg-error-lightest={color === "error-lightest"}
    class:bg-error-lighter={color === "error-lighter"}
    class:bg-error-light={color === "error-light"}
    class:bg-error={color === "error"}
    class:bg-error-dark={color === "error-dark"}
    class:bg-error-darker={color === "error-darker"}
    class:bg-error-darkest={color === "error-darkest"}
    class:bg-warning-lightest={color === "warning-lightest"}
    class:bg-warning-lighter={color === "warning-lighter"}
    class:bg-warning-light={color === "warning-light"}
    class:bg-warning={color === "warning"}
    class:bg-warning-dark={color === "warning-dark"}
    class:bg-warning-darker={color === "warning-darker"}
    class:bg-warning-darkest={color === "warning-darkest"}
    class:bg-success-lightest={color === "success-lightest"}
    class:bg-success-lighter={color === "success-lighter"}
    class:bg-success-light={color === "success-light"}
    class:bg-success={color === "success"}
    class:bg-success-dark={color === "success-dark"}
    class:bg-success-darker={color === "success-darker"}
    class:bg-success-darkest={color === "success-darkest"}
    class:bg-info-lightest={color === "info-lightest"}
    class:bg-info-lighter={color === "info-lighter"}
    class:bg-info-light={color === "info-light"}
    class:bg-info={color === "info"}
    class:bg-info-dark={color === "info-dark"}
    class:bg-info-darker={color === "info-darker"}
    class:bg-info-darkest={color === "info-darkest"}
    class:bg-gray-lightest={color === "gray-lightest"}
    class:bg-gray-lighter={color === "gray-lighter"}
    class:bg-gray-light={color === "gray-light"}
    class:bg-gray={color === "gray"}
    class:bg-gray-dark={color === "gray-dark"}
    class:bg-gray-darker={color === "gray-darker"}
    class:bg-gray-darkest={color === "gray-darkest"}
    class:bg-dark-lightest={color === "dark-lightest"}
    class:bg-dark-lighter={color === "dark-lighter"}
    class:bg-dark-light={color === "dark-light"}
    class:bg-dark={color === "dark"}
    class:bg-dark-dark={color === "dark-dark"}
    class:bg-dark-darker={color === "dark-darker"}
    class:bg-dark-darkest={color === "dark-darkest"}
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

  button {
    /* min-width: 10rem; */
    height: 3rem;
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

  button:hover {
    opacity: 0.8;
    -webkit-transition: all 350ms ease;
    -moz-transition: all 350ms ease;
    -o-transition: all 350ms ease;
    -ms-transition: all 350ms ease;
    transition: all 350ms ease;
  }

  .larger {
    height: 3.5rem;
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

  .wide {
    width: 100%;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 50%;
  }
</style>
