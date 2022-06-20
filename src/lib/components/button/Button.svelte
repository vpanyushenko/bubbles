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
  export let background = "__default";
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
    min-width: 10rem;
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

  /* COLORS */

  /* Primary */
  .bg-primary-lightest {
    background: var(--primary-lightest);
    color: var(--primary-darkest);
  }

  .bg-primary-lighter {
    background: var(--primary-lighter);
    color: var(--primary-darkest);
  }

  .bg-primary-light {
    background: var(--primary-light);
    color: var(--primary-darkest);
  }

  .bg-primary {
    background: var(--primary);
    color: var(--primary-lightest);
  }

  .bg-primary-dark {
    background: var(--primary-dark);
    color: var(--primary-lightest);
  }

  .bg-primary-darker {
    background: var(--primary-darker);
    color: var(--primary-lightest);
  }

  .bg-primary-darkest {
    background: var(--primary-darkest);
    color: var(--primary-lightest);
  }

  /* Secondary */
  .bg-secondary-lightest {
    background: var(--secondary-lightest);
    color: var(--secondary-darkest);
  }

  .bg-secondary-lighter {
    background: var(--secondary-lighter);
    color: var(--secondary-darkest);
  }

  .bg-secondary-light {
    background: var(--secondary-light);
    color: var(--secondary-darkest);
  }

  .bg-secondary {
    background: var(--secondary);
    color: var(--secondary-darkest);
  }

  .bg-secondary-dark {
    background: var(--secondary-dark);
    color: var(--secondary-lightest);
  }

  .bg-secondary-darker {
    background: var(--secondary-darker);
    color: var(--secondary-lightest);
  }

  .bg-secondary-darkest {
    background: var(--secondary-darkest);
    color: var(--secondary-lightest);
  }

  /* error */
  .bg-error-lightest {
    background: var(--error-lightest);
    color: var(--error-darkest);
  }

  .bg-error-lighter {
    background: var(--error-lighter);
    color: var(--error-darkest);
  }

  .bg-error-light {
    background: var(--error-light);
    color: var(--error-darkest);
  }

  .bg-error {
    background: var(--error);
    color: var(--error-lightest);
  }

  .bg-error-dark {
    background: var(--error-dark);
    color: var(--error-lightest);
  }

  .bg-error-darker {
    background: var(--error-darker);
    color: var(--error-lightest);
  }

  .bg-error-darkest {
    background: var(--error-darkest);
    color: var(--error-lightest);
  }

  /* warning */
  .bg-warning-lightest {
    background: var(--warning-lightest);
    color: var(--warning-darkest);
  }

  .bg-warning-lighter {
    background: var(--warning-lighter);
    color: var(--warning-darkest);
  }

  .bg-warning-light {
    background: var(--warning-light);
    color: var(--warning-darkest);
  }

  .bg-warning {
    background: var(--warning);
    color: var(--warning-darkest);
  }

  .bg-warning-dark {
    background: var(--warning-dark);
    color: var(--warning-lightest);
  }

  .bg-warning-darker {
    background: var(--warning-darker);
    color: var(--warning-lightest);
  }

  .bg-warning-darkest {
    background: var(--warning-darkest);
    color: var(--warning-lightest);
  }

  /* success */
  .bg-success-lightest {
    background: var(--success-lightest);
    color: var(--success-darkest);
  }

  .bg-success-lighter {
    background: var(--success-lighter);
    color: var(--success-darkest);
  }

  .bg-success-light {
    background: var(--success-light);
    color: var(--success-darkest);
  }

  .bg-success {
    background: var(--success);
    color: var(--success-darkest);
  }

  .bg-success-dark {
    background: var(--success-dark);
    color: var(--success-lightest);
  }

  .bg-success-darker {
    background: var(--success-darker);
    color: var(--success-lightest);
  }

  .bg-success-darkest {
    background: var(--success-darkest);
    color: var(--success-lightest);
  }

  /* info */
  .bg-info-lightest {
    background: var(--info-lightest);
    color: var(--info-darkest);
  }

  .bg-info-lighter {
    background: var(--info-lighter);
    color: var(--info-darkest);
  }

  .bg-info-light {
    background: var(--info-light);
    color: var(--info-darkest);
  }

  .bg-info {
    background: var(--info);
    color: var(--info-lightest);
  }

  .bg-info-dark {
    background: var(--info-dark);
    color: var(--info-lightest);
  }

  .bg-info-darker {
    background: var(--info-darker);
    color: var(--info-lightest);
  }

  .bg-info-darkest {
    background: var(--info-darkest);
    color: var(--info-lightest);
  }

  /* gray */
  .bg-gray-lightest {
    background: var(--gray-lightest);
    color: var(--gray-darkest);
  }

  .bg-gray-lighter {
    background: var(--gray-lighter);
    color: var(--gray-darkest);
  }

  .bg-gray-light {
    background: var(--gray-light);
    color: var(--gray-darkest);
  }

  .bg-gray {
    background: var(--gray);
    color: var(--gray-lightest);
  }

  .bg-gray-dark {
    background: var(--gray-dark);
    color: var(--gray-lightest);
  }

  .bg-gray-darker {
    background: var(--gray-darker);
    color: var(--gray-lightest);
  }

  .bg-gray-darkest {
    background: var(--gray-darkest);
    color: var(--gray-lightest);
  }

  /* dark */
  .bg-dark-lightest {
    background: var(--dark-lightest);
    color: var(--dark-darkest);
  }

  .bg-dark-lighter {
    background: var(--dark-lighter);
    color: var(--dark-dark);
  }

  .bg-dark-light {
    background: var(--dark-light);
    color: var(--dark-lightest);
  }

  .bg-dark {
    background: var(--dark);
    color: var(--dark-lightest);
  }

  .bg-dark-dark {
    background: var(--dark-dark);
    color: var(--dark-lightest);
  }

  .bg-dark-darker {
    background: var(--dark-darker);
    color: var(--dark-lightest);
  }

  .bg-dark-darkest {
    background: var(--dark-darkest);
    color: var(--dark-lightest);
  }

  /* Dark Mode Primary */
  :global(html.dark) .dark_mode_invert.bg-primary-lightest {
    background: var(--primary-darkest);
    color: var(--primary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-lighter {
    background: var(--primary-darker);
    color: var(--primary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-light {
    background: var(--primary-dark);
    color: var(--primary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-dark {
    background: var(--primary-light);
    color: var(--primary-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-darker {
    background: var(--primary-lighter);
    color: var(--primary-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-darkest {
    background: var(--primary-lightest);
    color: var(--primary-darkest);
  }

  /* Dark Mode secondary */
  :global(html.dark) .dark_mode_invert.bg-secondary-lightest {
    background: var(--secondary-darkest);
    color: var(--secondary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-lighter {
    background: var(--secondary-darker);
    color: var(--secondary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-light {
    background: var(--secondary-dark);
    color: var(--secondary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-dark {
    background: var(--secondary-light);
    color: var(--secondary-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-darker {
    background: var(--secondary-lighter);
    color: var(--secondary-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-darkest {
    background: var(--secondary-lightest);
    color: var(--secondary-darkest);
  }

  /* Dark Mode error */
  :global(html.dark) .dark_mode_invert.bg-error-lightest {
    background: var(--error-darkest);
    color: var(--error-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-error-lighter {
    background: var(--error-darker);
    color: var(--error-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-error-light {
    background: var(--error-dark);
    color: var(--error-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-error-dark {
    background: var(--error-light);
    color: var(--error-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-error-darker {
    background: var(--error-lighter);
    color: var(--error-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-error-darkest {
    background: var(--error-lightest);
    color: var(--error-darkest);
  }

  /* Dark Mode warning */
  :global(html.dark) .dark_mode_invert.bg-warning-lightest {
    background: var(--warning-darkest);
    color: var(--warning-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-lighter {
    background: var(--warning-darker);
    color: var(--warning-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-light {
    background: var(--warning-dark);
    color: var(--warning-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-dark {
    background: var(--warning-light);
    color: var(--warning-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-darker {
    background: var(--warning-lighter);
    color: var(--warning-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-darkest {
    background: var(--warning-lightest);
    color: var(--warning-darkest);
  }

  /* Dark Mode success */
  :global(html.dark) .dark_mode_invert.bg-success-lightest {
    background: var(--success-darkest);
    color: var(--success-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-success-lighter {
    background: var(--success-darker);
    color: var(--success-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-success-light {
    background: var(--success-dark);
    color: var(--success-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-success-dark {
    background: var(--success-light);
    color: var(--success-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-success-darker {
    background: var(--success-lighter);
    color: var(--success-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-success-darkest {
    background: var(--success-lightest);
    color: var(--success-darkest);
  }

  /* Dark Mode info */
  :global(html.dark) .dark_mode_invert.bg-info-lightest {
    background: var(--info-darkest);
    color: var(--info-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-info-lighter {
    background: var(--info-darker);
    color: var(--info-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-info-light {
    background: var(--info-dark);
    color: var(--info-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-info-dark {
    background: var(--info-light);
    color: var(--info-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-info-darker {
    background: var(--info-lighter);
    color: var(--info-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-info-darkest {
    background: var(--info-lightest);
    color: var(--info-darkest);
  }

  /* Dark Mode gray */
  :global(html.dark) .dark_mode_invert.bg-gray-lightest {
    background: var(--gray-darkest);
    color: var(--gray-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-lighter {
    background: var(--gray-darker);
    color: var(--gray-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-light {
    background: var(--gray-dark);
    color: var(--gray-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-dark {
    background: var(--gray-light);
    color: var(--gray-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-darker {
    background: var(--gray-lighter);
    color: var(--gray-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-darkest {
    background: var(--gray-lightest);
    color: var(--gray-darkest);
  }

  /* Dark Mode dark */
  :global(html.dark) .dark_mode_invert.bg-dark-lightest {
    background: var(--dark-darkest);
    color: var(--dark-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-lighter {
    background: var(--dark-darker);
    color: var(--dark-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-light {
    background: var(--dark-dark);
    color: var(--dark-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-dark {
    background: var(--dark-light);
    color: var(--dark-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-darker {
    background: var(--dark-lighter);
    color: var(--dark-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-darkest {
    background: var(--dark-lightest);
    color: var(--dark-darkest);
  }
</style>
