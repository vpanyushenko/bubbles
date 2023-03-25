<script>
  import { pageStore, configStore } from "../../utils/stores";
  import { v4 as uuid } from "@lukeed/uuid";
  import { navigating } from "$app/stores";
  import Spinner from "../spinner/Spinner.svelte";
  import IconButton from "./IconButton.svelte";

  /** @type {?String} id */
  export let id = uuid();

  /**@type {?String} label - This is the text that will be shown on the button */
  export let label = null;

  /**@type {?Function} onclick - The function to run when this button is clicked */
  export let onclick = null;

  /**@type {?Function} onsubmit - This is the same as on click but should be used in a form so that the use can press enter to submit the details. */
  export let onsubmit = null;

  /**@type {String} color - The CSS color variable */
  export let color = "__default";

  /**@type {Boolean} [mt=false] - If you want to add margin to the top of this button */
  export let mt = false;

  /**@type {Boolean} [mb=false] - If you want to add margin to the bottom of this button */
  export let mb = false;

  /**@type {Boolean} [wide=true] - If you want the button to take the full width of the container */
  export let wide = true;

  /**@type {Boolean} [new_page=false] - If you want this button to open a new page. You should only use this if you're also using the href value. */
  export let new_page = false;

  /**@type {?String} [href=null] - If you want this button to link to another web page. You should use href instead of onclick because you'll get link prefetching which will make the UX faster. */
  export let href;

  /**@type {"hover"|"tap"|"off"} [href=null] - If you want this button to link to another web page. You should use href instead of onclick because you'll get link prefetching which will make the UX faster. */
  export let preload = "hover";

  //TODO: Types. Maybe we should update this to style props
  export let style;

  /**@type {?Boolean} [disabled=false] - if this button should be disabled */
  export let disabled = false;

  /**@type {?"arrowLeft"|"arrowLeftDouble"|"arrowRight"|"arrowRightDouble"|"more"|"add"|"close"|"search"|"edit"|"trash"|"filter"|String} [icon=null] - The icon to add to this button. */
  export let icon = null;

  /**@type {?Boolean} [dark_mode_invert=$configStore?.dark_mode_invert] - If the button colors should be inverted if the theme changes to dark mode */
  export let dark_mode_invert = $configStore?.dark_mode_invert;

  //IconButton exclusive
  //TODO: Do we need this? Should the button be aligned or the container it's in. Are we using a naked button
  export let align = "right";

  //TODO: I think we don't have this property anymore
  export let border = null;

  //TODO: I think this happens automatically now.
  export let invert_icon = false;

  /**@type {?Boolean} [shadow=false] - Applies to buttons without labels only! If the icon button should have a shadow */
  export let shadow = false;

  /**@type {?Function} [typeahead=null] - Applies to buttons without labels only! A function that will take in the value of a search input and give users options to choose from. This  can only be used if `search` is set to true. */
  export let typeahead = null;

  /**@type {?Number} [debounce=350] - Applies to buttons without labels only! Duration in milliseconds. If using typeahead, this will allow you to only trigger the function after a certain amount if time. */
  export let debounce = 350;

  /**@type {Boolean} [search=false] - Applies to buttons without labels only! If this button will transform into a search input when clicked. */
  export let search = false;

  export let __search_id = null;
  export let __search_width_100 = false;

  /**@type {"blocky"|"rounded"} [radius="blocky"] - Applies to buttons without labels only! If the radius of the button will be blocky or rounded. This will only apply to a button without a label. */
  export let radius = "blocky"; //or rounded

  /**@type {Boolean} [larger=true] - Applies to buttons without labels only! Will ensure that the button without a label has the same height as the button with a label */
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
    transition: all 0.25s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  button:hover {
    opacity: 0.8;
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
  }</style>
