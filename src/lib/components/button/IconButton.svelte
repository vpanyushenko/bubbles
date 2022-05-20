<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/page.store";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { addQueryParam, deleteQueryParam } from "$lib/utils/url";
  import { navigating, page, session } from "$app/stores";
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
  import Spinner from "$lib/components/spinner/Spinner.svelte";
  import Dropdown from "$lib/components/dropdown/Dropdown.svelte";

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
  export let icon = more;
  export let onclick = null;
  export let options = [];
  export let href = "";
  export let new_page = false;
  export let align = "right";

  export let color = null;
  export let border = null;
  export let invert_icon = false;

  export let mobile_shadow = false;

  export let typeahead = null;
  export let debounce = 350;
  export let search = false;
  export let __search_id = null;
  export let __search_width_100 = false;

  export let transparent = true; //TODO: deprecated

  if (!transparent) {
    console.info("[bubbles-ui]: transparent on IconButton is deprecated, add an color property instead");

    if (!color) {
      color = "gray-lighter";
    }
  }

  const dropdown = options.length ? true : false;

  let src = icons[icon] ? icons[icon] : icon;

  let search_active = false;
  let search_input, search_value, search_focused;

  $: $pageStore.search = search_active === true ? __search_id : null;
  $: active = $pageStore.dropdown === id && $pageStore.dropdown !== null ? true : false;
  $: is_loading = ($pageStore.clicked === id && $navigating) || $pageStore.loading.includes(id);
  $: typeahead_options = [];

  function iconClick(event) {
    $pageStore.clicked = id;

    let iconElement = event.currentTarget;

    if (!event.currentTarget.classList.contains("icon__btn")) {
      iconElement = iconElement.closest(".icon__btn");
    }

    if (search === true && !search_active) {
      $pageStore.search = __search_id;
      search_active = true;

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

  // function dropdownSelect(event) {
  //   active = false;
  //   $pageStore.dropdown = null;
  // }

  function windowClick(event) {
    //if you click outside of the select, we want to close it
    if (!event.target.closest(".icon__btn")) {
      active = false;
      search_active = false;
      typeahead_options = [];
      $pageStore.dropdown = null;
    }
  }

  function onsearch(event) {
    typeahead_options = [];

    if (event.currentTarget.value) {
      addQueryParam("search", event.currentTarget.value);
      showLoading(id);
      $session.timestamp = Date.now();
    } else {
      deleteQueryParam("search");
      $session.timestamp = Date.now();
    }
  }

  async function typeaheadOnInput(event) {
    const typeahead_value = event.target.value;

    await new Promise((resolve) => setTimeout(resolve, debounce));

    if (typeahead && typeahead_value === search_value && search_value) {
      is_loading = true;
      typeahead(typeahead_value)
        .then((options) => {
          is_loading = false;
          if (options && options.length) {
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
  <a class="icon__btn" sveltekit:prefetch target={new_page ? "_blank" : ""} {href} on:click={iconClick}>
    <button
      disabled={is_loading}
      class:disabled={is_loading}
      {id}
      style:background-color={color ? `var(--${color})` : null}
      style:outline={border ? `2px solid var(--${border})` : null}
      style:outline-offset={border ? `-2px` : null}
      class:mobile_shadow
    >
      {#if is_loading}
        <Spinner />
      {/if}
      {#if icon}
        <img
          class="icon icon-main"
          {src}
          class:hidden={is_loading}
          alt="icon"
          style:filter={invert_icon ? "invert(1)" : null}
        />
      {:else}
        <span class:hidden={is_loading}>
          <slot />
        </span>
      {/if}
    </button>
  </a>
{:else}
  <div class="icon__btn" class:active={dropdown && active}>
    <button
      on:click={iconClick}
      on:click={onclick}
      class:search_active
      {id}
      disabled={is_loading}
      style:background-color={dropdown && active ? `var(--primary)` : color ? `var(--${color})` : null}
      style:outline={dropdown && active ? "" : border ? `2px solid var(--${border})` : null}
      style:outline-offset={dropdown && active ? "" : border ? `-2px` : null}
      class:mobile_shadow
      class:search={search_active}
      class:w-100={search_active && __search_width_100}
    >
      {#if search_active}
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

          {#if search_active}
            {#if is_loading}
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
              <img
                class="icon icon-main icon-close"
                src={close}
                alt="close"
                style:filter={invert_icon ? "invert(1)" : null}
                on:click={() => {
                  if (search_value) {
                    search_value = "";
                    typeahead_options = [];
                  } else {
                    search_active = false;
                    deleteQueryParam("search");
                    $session.timestamp = Date.now();
                    typeahead_options = [];
                  }
                }}
              />
            </span>

            {#if typeahead_options && typeahead_options.length > 0}
              <div class="typeahead">
                <Dropdown bind:options={typeahead_options} search={false} bind:value={search_value} />
              </div>
            {/if}
          {/if}
        </div>
      {/if}

      {#if is_loading && !search_active}
        <Spinner />
      {/if}

      <span class:hidden={is_loading || search_active}>
        <slot>
          <img
            class="icon icon-main"
            {src}
            class:hidden={is_loading}
            alt="icon"
            style:filter={invert_icon ? "invert(1)" : null}
          />
        </slot>
      </span>
    </button>
    {#if active && dropdown}
      <Dropdown {options} {align} {search} />
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

  button {
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    display: flex;
    place-content: center;
    align-items: center;
    justify-items: center;
  }

  .disabled {
    cursor: not-allowed;
  }

  button .icon {
    /* font-size: 1.5rem; */
    font-size: 17px;
    fill: #1b1d21;
    -webkit-transition: fill 0.25s;
    -o-transition: fill 0.25s;
    transition: fill 0.25s;
  }

  button:hover {
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  :global(.table__cell button) {
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
  }

  :global(.table__row:hover button) {
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6) !important;
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6) !important;
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
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
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

    .mobile_shadow {
      -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
      box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    }

    /* .icon__btn__counter {
      top: 5px;
      right: 5px;
      min-width: 12px;
      height: 12px;
      font-size: 0;
    } */
  }
</style>
