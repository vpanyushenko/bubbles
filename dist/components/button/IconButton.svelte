<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore, configStore } from "../../utils/stores";
  import { showLoading, hideLoading } from "../../utils/loading";
  import { addQueryParam, deleteQueryParam } from "../../utils/url";

  import { onMount } from "svelte";
  import { navigating, page } from "$app/stores";
  import { browser } from "$app/environment";

  import arrowLeft from "./arrow-left.svg";
  import arrowLeftDouble from "./arrow-left-double.svg";
  import arrowRight from "./arrow-right.svg";
  import arrowRightDouble from "./arrow-right-double.svg";
  import more from "./more.svg";
  import add from "./add.svg";
  import close from "./close.svg";
  import search_icon from "./search.svg";
  import edit from "./edit.svg";
  import trash from "./trash.svg";
  import filter from "./filter.svg";
  import Spinner from "../spinner/Spinner.svelte";
  import Dropdown from "../dropdown/Dropdown.svelte";

  const icons = {
    arrowLeft: arrowLeft,
    arrowLeftDouble: arrowLeftDouble,
    arrowRight: arrowRight,
    arrowRightDouble: arrowRightDouble,
    more: more,
    add: add,
    close: close,
    search: search_icon,
    edit: edit,
    trash: trash,
    filter: filter,
  };

  export let id = uuid();
  export let icon = "more";
  export let onclick = null;
  export let options = [];
  export let href = "";
  export let new_page = false;
  export let align = "right";
  export let radius = "rounded"; //or blocky
  export let larger = false;

  export let color = null;
  export let dark_mode_invert = $configStore?.dark_mode_invert;

  export let shadow = false;

  export let typeahead = null;
  export let onselect = null;
  export let debounce = 350;
  export let search = false;
  export let reset_on_select = true;
  export let __search_id = null;
  export let __search_width_100 = false;
  export let dom_component_width;
  export let href_listener = null;

  let dom_ref;

  $: is_list_open = options.length ? true : false;
  $: is_list_open_typeahead = typeahead_options.length ? true : false;

  const dropdown = options.length ? true : false;

  let is_search_active = false;
  let search_input, search_value, search_focused;

  $: src = icons[icon] || icon || icons.more;
  $: $pageStore.search = is_search_active === true ? __search_id : null;
  $: active = $pageStore.dropdown === id && $pageStore.dropdown !== null ? true : false;
  $: is_loading =
    ($pageStore.clicked === id && $navigating) ||
    $pageStore.loading.includes(id) ||
    (href_listener && href_listener.endsWith($navigating?.to?.url?.pathname));
  //$: navigating_to_new_page = $navigating?.from?.url?.href === $navigating?.to?.url?.href ? false : true;

  $: typeahead_options = [];
  let was_typeahead_options_selected = false;

  //Stop the loading animation fo search
  $: if ($pageStore.loading.includes(id) && browser) {
    if (search && window.location.href === $page.url.href) {
      $pageStore.loading = [...$pageStore.loading.filter((id) => id !== id)];
    }
  }

  onMount(() => {
    if (search) {
      if ($page.url.searchParams.get("search")) {
        is_search_active = true;
      }

      const value = $page.url.searchParams.get("search");

      if (value) {
        search_value = value;
        is_search_active = true;
        $pageStore.search = __search_id;
      }
    }

    //If the button is inside of a TableCell and the TableRow parent has an href, the button needs to respond when that href is pressed

    if (dom_ref.parentElement.classList.contains("cell")) {
      href_listener = dom_ref.parentElement.closest(".js-bubbles-table-row").href;
    }
  });

  let __icon_inverted = true; //We want to invest initially to make the icon white
  let __shadow_on_hover = false;

  if (color) {
    const array = color.split("-");

    if (array.length === 2 && array[1].startsWith("lightest")) {
      __icon_inverted = false;
    }
  } else {
    __icon_inverted = false;
    __shadow_on_hover = true;
  }

  function iconClick(event) {
    $pageStore.clicked = id;

    let iconElement = event.currentTarget;

    if (!event.currentTarget.classList.contains("icon__btn")) {
      iconElement = iconElement.closest(".icon__btn");
    }

    if (search === true && !is_search_active) {
      $pageStore.search = __search_id;
      is_search_active = true;

      setTimeout(() => {
        if (search_input) {
          search_input.focus();
        }
      }, 250);
    }

    if (dropdown && active) {
      active = false;
      $pageStore.dropdown = null;
    } else if (dropdown) {
      active = true;
      $pageStore.dropdown = id;
    } else {
      active = true;
      $pageStore.dropdown = id;
    }
  }

  function windowClick(event) {
    //if you click outside of the select, we want to close it

    if (!event.target.closest(".js-bubbles-icon-button")) {
      active = false;
      typeahead_options = [];
      $pageStore.dropdown = null;

      if (!search_value && search) {
        is_search_active = false;
        if ($page.url.searchParams.get("search")) {
          $page.url.searchParams.get("search");
          deleteQueryParam("search");
          showLoading(id);
        }
      }
    }
  }

  function onsearch(event) {
    //We only need to search globally when not presenting options
    if (typeahead) return;

    if (event.currentTarget.value) {
      addQueryParam("search", event.currentTarget.value);
      showLoading(id);
    } else {
      deleteQueryParam("search");
    }
  }

  async function typeaheadOnInput(event) {
    const typeahead_value = event.target.value;
    was_typeahead_options_selected = false;

    await new Promise((resolve) => setTimeout(resolve, debounce));

    if (typeahead && typeahead_value === search_value && search_value) {
      is_loading = true;
      typeahead(typeahead_value)
        .then((options) => {
          is_loading = false;

          if (options && options.length && was_typeahead_options_selected === false) {
            //check if the typeahead options that were passed were strings and format them correctly
            typeahead_options = options.map((option) => {
              if (typeof option === "string") {
                const obj = {
                  label: option,
                  value: option,
                };

                return obj;
              } else {
                return option;
              }
            });
          } else {
            typeahead_options = [];
          }
        })
        .catch((err) => {
          console.error(err);
          is_loading = false;
          typeahead_options = [];
        });
    }

    if (!search_value) {
      is_loading = false;
      typeahead_options = [];
    }
  }
</script>

<svelte:window on:click={windowClick} />

{#if href}
  <a
    class="icon__btn js-bubbles-icon-button"
    data-sveltekit-preload-data="hover"
    target={new_page ? "_blank" : ""}
    {href}
    on:click={iconClick}
    bind:this={dom_ref}
  >
    <button
      disabled={is_loading}
      class:disabled={is_loading}
      {id}
      class:shadow
      class:shadow_on_hover={__shadow_on_hover}
      class:blocky={radius === "blocky"}
      class:larger
      class:dark_mode_invert
      class:bg-transparent={!color}
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
      {#if is_loading}
        <Spinner />
      {/if}
      {#if icon}
        <img class="icon icon-main" class:invert_icon={__icon_inverted} {src} class:hidden={is_loading} alt="icon" />
      {:else}
        <span class:hidden={is_loading}>
          <slot />
        </span>
      {/if}
    </button>
  </a>
{:else}
  <div class="icon__btn js-bubbles-icon-button" class:active={dropdown && active} bind:this={dom_ref}>
    <button
      on:click={iconClick}
      on:click={onclick}
      class:search_active={is_search_active}
      {id}
      disabled={is_loading}
      class:shadow
      class:shadow_on_hover={__shadow_on_hover}
      class:search={is_search_active}
      class:w-100={is_search_active && __search_width_100}
      class:blocky={radius === "blocky"}
      class:larger
      class:dark_mode_invert
      class:bg-transparent={!color}
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
      {#if is_search_active}
        <div class="field__wrapper" class:focused={search_focused}>
          <input
            bind:this={search_input}
            bind:value={search_value}
            class="field__input"
            type="search"
            placeholder="Press Enter to search"
            on:search={onsearch}
            on:input={typeaheadOnInput}
            on:focus={() => (search_focused = true)}
            on:blur={() => (search_focused = false)}
          />

          {#if is_loading}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span
              style="margin-right: 1rem;"
              on:click|stopPropagation={() => {
                hideLoading(id);
                search_value = "";
                search_input.focus();
              }}
            >
              <Spinner />
            </span>
          {/if}

          <span class:hidden={is_loading}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
              class="icon icon-main icon-close"
              src={close}
              alt="close"
              on:click={() => {
                if (search_value) {
                  search_value = "";
                  typeahead_options = [];
                } else {
                  is_search_active = false;
                  deleteQueryParam("search");
                  typeahead_options = [];
                }
              }}
            />
          </span>

          {#if typeahead_options && typeahead_options.length > 0}
            <div class="typeahead">
              <Dropdown
                bind:options={typeahead_options}
                search={false}
                bind:value={search_value}
                bind:is_list_open={is_list_open_typeahead}
                on:select={(event) => {
                  was_typeahead_options_selected = true;
                  is_list_open_typeahead = false;
                  if (onselect) {
                    if (reset_on_select) {
                      setTimeout(() => {
                        search_value = "";
                        is_search_active = false;
                        typeahead_options = [];
                        $pageStore.dropdown = null;
                      }, 0);
                    }

                    onselect(event?.detail?.value, event);
                  }
                }}
              />
            </div>
          {/if}
        </div>
      {/if}

      {#if is_loading && !is_search_active}
        <Spinner />
      {/if}

      <span class:hidden={is_loading || is_search_active}>
        <slot>
          <img class="icon icon-main" class:invert_icon={__icon_inverted} {src} class:hidden={is_loading} alt="icon" />
        </slot>
      </span>
    </button>

    {#if is_list_open && active}
      <Dropdown
        {options}
        {align}
        {search}
        bind:is_list_open
        on:select={() => {
          is_list_open = false;
          active = false;
          $pageStore.dropdown = null;
        }}
      />
    {/if}
  </div>
{/if}

<style>
  .icon-main {
    width: 0.92em;
    height: 1em;
    fill: var(--black);
    font-size: 17px;
  }

  .icon__btn {
    position: relative;
  }

  .icon-close {
    margin-right: 1rem;
  }

  .shadow {
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  button {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transition: all 0.25s;
    display: flex;
    place-content: center;
    align-items: center;
    justify-items: center;
  }

  .larger {
    width: 3.5rem;
    height: 3.5rem;
  }

  .blocky {
    border-radius: 1rem;
  }

  .disabled {
    cursor: not-allowed;
  }

  button .icon {
    /* font-size: 1.5rem; */
    font-size: 17px;
    fill: #1b1d21;
    transition: fill 0.25s;
  }

  /* FIXME */
  /* FIXME */
  /* FIXME */
  /* FIXME */
  /* FIXME */
  /* FIXME */
  /* FIXME */
  /* button:hover {
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  } */

  button:hover {
    opacity: 0.8;
    transition: all 350ms ease;
  }

  button.search_active:hover {
    opacity: 1;
  }

  button.shadow_on_hover:hover {
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  :global(.table__cell button) {
    box-shadow: none !important;
  }

  :global(.table__row:hover button) {
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  :global(.button__group) > .icon__btn > button {
    width: 3rem;
    height: 3rem;
  }
  :global(.button__group) > .icon__btn > button.larger {
    width: 3.5rem;
    height: 3.5rem;
  }

  /* .icon__btn__counter {
    position: absolute;
    top: 0;
    right: -12px;
    display: inline-block;
    min-width: 1.5rem;
    line-height: 1.5rem;
    border-radius: 50%;
    background: var(--error);
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
  } */

  .icon__btn.active button {
    background: #6c5dd3;
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  .icon__btn.active button img {
    filter: invert(1);
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: var(--black);
  }

  .search {
    width: 23rem;
  }

  .w-100 {
    width: 100%;
  }

  .field__wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    border: 2px solid transparent;
    border-radius: 100rem;
  }

  .field__input {
    width: 100%;
    height: 3rem;
    padding-left: 1.125rem;
    padding-right: 1.125rem;
    border: 2px solid transparent;
    background: none;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    transition: all 0.2s;
  }

  .field__wrapper.focused {
    border-color: var(--primary);
    background: var(--white);
  }

  button.search_active {
    border-radius: 100rem;
  }

  .typeahead {
    margin-top: 3rem;
  }

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    border-radius: 50em;
    background: none;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
  }

  @media only screen and (max-width: 767px) {
    .icon__btn {
      position: static;
    }

    button {
      width: 2.5rem;
      height: 2.5rem;
    }

    button .icon {
      font-size: 1.25rem;
    }

    /* .icon__btn__counter {
      top: 5px;
      right: 5px;
      min-width: 12px;
      height: 12px;
      font-size: 0;
    } */
  }

  :global(html.dark) button.shadow_on_hover:hover {
    box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.6);
  }

  :global(html.dark) .icon__btn.active button {
    background: #6c5dd3;
    box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.6);
  }

  :global(html.dark) .field__input {
    color: var(--gray-lightest);
  }

  :global(html.dark) .field__wrapper.focused {
    border-color: var(--primary);
    background: var(--dark);
  }

  /* COLORS */

  img.icon {
    filter: invert();
  }

  .dark_mode_invert.bg-transparent img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-transparent img.icon {
    filter: invert();
  }

  /* Primary */
  .bg-primary-lightest img.icon {
    filter: none;
  }

  /* Secondary */
  .bg-secondary-lightest img.icon {
    filter: none;
  }

  .bg-secondary-lighter img.icon {
    filter: none;
  }

  .bg-secondary-light img.icon {
    filter: none;
  }

  .bg-secondary img.icon {
    filter: none;
  }

  /* error */

  .bg-error-lightest img.icon {
    filter: none;
  }

  .bg-error-lighter img.icon {
    filter: none;
  }

  .bg-error-light img.icon {
    filter: none;
  }

  /* warning */

  .bg-warning-lightest img.icon {
    filter: none;
  }

  .bg-warning-lighter img.icon {
    filter: none;
  }

  .bg-warning-light img.icon {
    filter: none;
  }

  /* success */

  .bg-success-lightest img.icon {
    filter: none;
  }

  .bg-success-lighter img.icon {
    filter: none;
  }

  /* info */

  .bg-info-lightest img.icon {
    filter: none;
  }

  /* gray */
  .bg-gray-lightest img.icon {
    filter: none;
  }

  .bg-gray-lighter img.icon {
    filter: none;
  }

  .bg-gray-light img.icon {
    filter: none;
  }

  /* dark */
  .bg-dark-lightest img.icon {
    filter: none;
  }

  /* Dark Mode Primary */

  :global(html.dark) .dark_mode_invert.bg-primary-lightest {
    background: var(--primary-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-primary-lighter {
    background: var(--primary-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-light {
    background: var(--primary-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-dark {
    background: var(--primary-light);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-darker {
    background: var(--primary-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-darkest {
    background: var(--primary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-primary-darkest img.icon {
    filter: none;
  }

  /* Dark Mode secondary */
  :global(html.dark) .dark_mode_invert.bg-secondary-lightest {
    background: var(--secondary-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-lighter {
    background: var(--secondary-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-lighter img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-light {
    background: var(--secondary-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-light img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-dark {
    background: var(--secondary-light);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-dark img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-darker {
    background: var(--secondary-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-darker img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-darkest {
    background: var(--secondary-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-secondary-darkest img.icon {
    filter: none;
  }

  /* Dark Mode error */
  :global(html.dark) .dark_mode_invert.bg-error-lightest {
    background: var(--error-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-error-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-error-lighter {
    background: var(--error-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-error-lighter img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-error-light {
    background: var(--error-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-error-light img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-error-dark {
    background: var(--error-light);
  }
  :global(html.dark) .dark_mode_invert.bg-error-dark img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-error-darker {
    background: var(--error-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-error-darker img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-error-darkest {
    background: var(--error-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-error-darkest img.icon {
    filter: none;
  }

  /* Dark Mode warning */
  :global(html.dark) .dark_mode_invert.bg-warning-lightest {
    background: var(--warning-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-warning-lighter {
    background: var(--warning-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-lighter img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-warning-light {
    background: var(--warning-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-light img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-warning-dark {
    background: var(--warning-light);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-dark img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-warning-darker {
    background: var(--warning-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-darker img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-warning-darkest {
    background: var(--warning-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-warning-darkest img.icon {
    filter: none;
  }

  /* Dark Mode success */
  :global(html.dark) .dark_mode_invert.bg-success-lightest {
    background: var(--success-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-success-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-success-lighter {
    background: var(--success-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-success-lighter img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-success-light {
    background: var(--success-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-success-dark {
    background: var(--success-light);
  }
  :global(html.dark) .dark_mode_invert.bg-success-dark img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-success-darker {
    background: var(--success-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-success-darker img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-success-darkest {
    background: var(--success-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-success-darkest img.icon {
    filter: none;
  }

  /* Dark Mode info */
  :global(html.dark) .dark_mode_invert.bg-info-lightest {
    background: var(--info-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-info-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-info-lighter {
    background: var(--info-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-info-light {
    background: var(--info-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-info-dark {
    background: var(--info-light);
  }
  :global(html.dark) .dark_mode_invert.bg-info-darker {
    background: var(--info-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-info-darker img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-info-darkest {
    background: var(--info-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-info-darkest img.icon {
    filter: none;
  }

  /* Dark Mode gray */
  :global(html.dark) .dark_mode_invert.bg-gray-lightest {
    background: var(--gray-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-gray-lighter {
    background: var(--gray-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-lighter img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-gray-light {
    background: var(--gray-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-light img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-gray-dark {
    background: var(--gray-light);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-dark img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-gray-darker {
    background: var(--gray-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-darker img.icon {
    filter: none;
  }
  :global(html.dark) .dark_mode_invert.bg-gray-darkest {
    background: var(--gray-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-gray-darkest img.icon {
    filter: none;
  }

  /* Dark Mode dark */
  :global(html.dark) .dark_mode_invert.bg-dark-lightest {
    background: var(--dark-darkest);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-lightest img.icon {
    filter: invert();
  }
  :global(html.dark) .dark_mode_invert.bg-dark-lighter {
    background: var(--dark-darker);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-light {
    background: var(--dark-dark);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-dark {
    background: var(--dark-light);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-darker {
    background: var(--dark-lighter);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-darkest {
    background: var(--dark-lightest);
  }
  :global(html.dark) .dark_mode_invert.bg-dark-darkest img.icon {
    filter: none;
  }</style>
