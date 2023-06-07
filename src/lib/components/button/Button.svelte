<script>
  import { pageStore, configStore } from "$lib/utils/stores";
  import { v4 as uuid } from "@lukeed/uuid";
  import { navigating } from "$app/stores";
  import Spinner from "$lib/components/spinner/Spinner.svelte";
  import IconButton from "./IconButton.svelte";

  /** @type {import("$types").Button["id"]} id */
  export let id = uuid();

  /** @type {import("$types").Button["label"]} label */
  export let label;

  /** @type {import("$types").Button["type"]} label */
  export let type = "button";

  /** @type {import("$types").Button["onclick"]} onclick */
  export let onclick;

  /** @type {import("$types").Button["onsubmit"]} onsubmit */
  export let onsubmit;

  /** @type {import("$types").Button["color"]} color */
  export let color = "__default";

  /** @type {import("$types").Button["mt"]} mt */
  export let mt = false;

  /** @type {import("$types").Button["mb"]} mb */
  export let mb = false;

  /** @type {import("$types").Button["wide"]} wide */
  export let wide = true;

  /** @type {import("$types").Button["new_page"]} new_page */
  export let new_page = false;

  /** @type {import("$types").Button["href"]} href */
  export let href;

  /** @type {import("$types").Button["counter"]} counter */
  export let counter;

  /** @type {import("$types").Button["preload"]} preload */
  export let preload = "hover";

  //TODO: Types. Maybe we should update this to style props
  /** @type {import("$types").Button["style"]} style */
  export let style;

  /** @type {import("$types").Button["disabled"]} disabled */
  export let disabled = false;

  /** @type {import("$types").Button["icon"]} icon */
  export let icon;

  /** @type {import("$types").Button["dark_mode_invert"]} dark_mode_invert */
  export let dark_mode_invert = $configStore?.dark_mode_invert;

  // //IconButton exclusive
  // //TODO: Do we need this? Should the button be aligned or the container it's in. Are we using a naked button
  // export let align = "right";

  // //TODO: I think this happens automatically now.
  // export let invert_icon = false;

  /** @type {import("$types").Button["shadow"]} shadow */
  export let shadow = false;

  /** @type {import("$types").Button["typeahead"]} typeahead */
  export let typeahead;

  /** @type {import("$types").Button["debounce"]} debounce */
  export let debounce = 350;

  /** @type {import("$types").Button["search"]} search */
  export let search = false;

  /** @type {string} __search_id */
  export let __search_id;
  /** @type {string} __search_width_100*/
  export let __search_width_100;

  /** @type {import("$types").Button["radius"]} radius */
  export let radius = "blocky"; //or rounded

  /** @type {import("$types").Button["larger"]} larger */
  export let larger = true;

  if (onclick || onsubmit) {
    console.log("onclick and onsubmit are deprecated. Use the on:click and on:submit events instead.");
  }

  let component = "IconButton";

  if (label) component = "Button";
  if (component === "IconButton" && color === "__default") color = null;
  if (component === "Button" && color === "__default") color = "primary";

  $: is_loading = ($pageStore.clicked === id && $navigating) || $pageStore.loading.includes(id);
</script>

{#if !label && icon}
  <IconButton
    {type}
    {id}
    {onclick}
    {color}
    {new_page}
    {href}
    {disabled}
    {icon}
    {dark_mode_invert}
    {shadow}
    {typeahead}
    {debounce}
    {search}
    {__search_id}
    {__search_width_100}
    {radius}
    {larger}
    {counter}
    on:click
    on:keydown
  />
{:else if href}
  <a
    class:wide
    {href}
    data-sveltekit-preload-data={preload}
    target={new_page ? "_blank" : ""}
    on:click={() => {
      if (disabled) return;
      $pageStore.clicked = id;
    }}
    on:click={(event) => {
      if (disabled) return;
      if (typeof onclick === "function") onclick(event);
    }}
    on:click={(event) => {
      if (disabled) return;
      if (typeof onsubmit === "function") onsubmit(event);
    }}
  >
    <button
      {type}
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
      if (disabled) return;
      $pageStore.clicked = id;
    }}
    on:click={(event) => {
      if (disabled) return;
      if (typeof onclick === "function") onclick(event);
    }}
    on:click={(event) => {
      if (disabled) return;
      if (typeof onsubmit === "function") onsubmit(event);
    }}
    on:click
    on:submit
    {id}
    {type}
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
