<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/page.store";
  import LabeledSwitch from "$lib/components/switch/LabeledSwitch.svelte";
  import { navigating } from "$app/stores";
  import arrowLeft from "./arrow-left.svg";
  import arrowLeftDouble from "./arrow-left-double.svg";
  import arrowRight from "./arrow-right.svg";
  import arrowRightDouble from "./arrow-right-double.svg";
  import more from "./more.svg";
  import add from "./add.svg";
  import close from "./close.svg";
  import search from "./search.svg";
  import edit from "./edit.svg";
  import trash from "./trash.svg";
  import filter from "./filter.svg";
  import Spinner from "$lib/components/spinner/Spinner.svelte";
  import { showLoading } from "$lib/utils/loading";

  const icons = {
    arrowLeft: arrowLeft,
    arrowLeftDouble: arrowLeftDouble,
    arrowRight: arrowRight,
    arrowRightDouble: arrowRightDouble,
    more: more,
    add: add,
    close: close,
    search: search,
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
  export let transparent = true;

  const dropdown = options.length ? true : false;

  let src = icons[icon] ? icons[icon] : more;

  $: active = $pageStore.dropdown === id && $pageStore.dropdown !== null ? true : false;
  $: is_loading = ($pageStore.clicked === id && $navigating) || $pageStore.loading.includes(id);

  function iconClick(event) {
    $pageStore.clicked = id;

    let iconElement = event.currentTarget;

    if (!event.currentTarget.classList.contains("icon__btn")) {
      iconElement = iconElement.closest(".icon__btn");
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

  function dropdownSelect(event) {
    active = false;
    $pageStore.dropdown = null;
  }

  function windowClick(event) {
    //if you click outside of the select, we want to close it
    if (!event.target.closest(`.icon__btn`)) {
      active = false;
      $pageStore.dropdown = null;
    }
  }
</script>

<svelte:window on:click={windowClick} />

{#if href}
  <a class="icon__btn" {id} sveltekit:prefetch target={new_page ? "_blank" : ""} {href} on:click={iconClick}>
    <button class:disabled={is_loading} class:background={!transparent}>
      {#if is_loading}
        <Spinner />
      {/if}
      {#if icon}
        <img class="icon icon-main" {src} class:hidden={is_loading} alt="icon" />
      {:else}
        <span class:hidden={is_loading}>
          <slot />
        </span>
      {/if}
    </button>
  </a>
{:else}
  <div class="icon__btn" {id} class:active={dropdown && active}>
    <button class:background={!transparent} on:click={iconClick} on:click={onclick}>
      {#if is_loading}
        <Spinner />
      {/if}
      <span class:hidden={is_loading}>
        <slot>
          <img class="icon icon-main" {src} class:hidden={is_loading} alt="icon" />
        </slot>
      </span>
    </button>
    {#if dropdown}
      <div class="icon__btn__dropdown">
        <div class="icon__btn__options">
          {#each options as option}
            {#if option === "break"}
              <hr />
            {:else if option.type === "switch"}
              <LabeledSwitch {...option} />
            {:else if option.href}
              <a
                class="icon__btn__item"
                on:click|stopPropagation={dropdownSelect}
                href={option.href}
                target={option.new_page ? "_blank" : ""}
                sveltekit:prefetch
                on:click={iconClick}
                on:click={() => ($pageStore.is_fetching = true)}
              >
                <div class="icon__btn__details">
                  <p class="font-lg font-bold label">{option.label}</p>
                  {#if option.caption}
                    <p class="icon__btn__text caption">{option.caption}</p>
                  {/if}
                </div>
                <img class="dropdown__arrow" src={arrowRight} alt="Arrow Right" />
              </a>
            {:else}
              <div
                class="icon__btn__item"
                on:click|stopPropagation={dropdownSelect}
                on:click={option.onclick}
                on:click={iconClick}
              >
                <div class="icon__btn__details">
                  <p class="font-lg font-bold label">{option.label}</p>
                  {#if option.caption}
                    <p class="icon__btn__text caption">{option.caption}</p>
                  {/if}
                </div>
                <img class="dropdown__arrow" src={arrowRight} alt="Arrow Right" />
              </div>
            {/if}
          {/each}
        </div>
      </div>
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

  .background {
    /* border: 2px solid transparent; */
    background: rgba(228, 228, 228, 0.3);
    border-radius: 50%;
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

  .icon__btn__dropdown {
    position: absolute;
    text-align: initial;
    right: -12px;
    width: 360px;
    padding: 1.5rem 12px;
    -webkit-box-shadow: 0 0.625rem 36px rgba(227, 230, 236, 0.8);
    box-shadow: 0 0.625rem 36px rgba(227, 230, 236, 0.8);
    background: #ffffff;
    border-radius: 1.5rem;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    z-index: 100;
    margin-top: 1rem;
    border: 1px solid rgba(227, 230, 236, 0.8);
    max-height: 600px;
    overflow-y: auto;
  }

  .dropdown__arrow {
    width: 1rem;
  }

  .icon__btn__options {
    margin-bottom: 0px;
  }

  .icon__btn__item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 1rem 1.75rem 1rem 1.25rem;
    border-radius: 12px;
    background: transparent;
    cursor: pointer;
    -webkit-transition: background 0.25s;
    -o-transition: background 0.25s;
    transition: background 0.25s;
  }

  .icon__btn__item:hover {
    background: var(--input-bg);
  }

  .icon__btn__details {
    /* display: flex; */
    justify-content: space-between;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    align-items: center;
  }

  .icon__btn__details > * {
    width: 100%;
  }

  .icon__btn__text {
    color: #b2b3bd;
    text-align: left;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .icon__btn__text {
    /* margin-top: 6px; */
    padding-right: 0.625rem;
  }

  .icon__btn.active button {
    background: #6c5dd3;
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  .icon__btn.active button img {
    filter: invert(1);
  }

  .icon__btn.active .icon__btn__dropdown {
    visibility: visible;
    opacity: 1;
  }

  p {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .label {
    color: var(--black);
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: var(--black);
  }

  hr {
    border: none;
    height: 1px;
    color: var(--gray-light);
    background-color: var(--gray-light);
    margin: 1rem;
  }

  @media only screen and (max-width: 767px) {
    .icon__btn {
      position: static;
    }
    button {
      width: 2.5rem;
      height: 2.5rem;
      -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
      box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
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
    .icon__btn__dropdown {
      right: 0;
      left: 0;
      width: auto;
      padding: 1.5rem 1rem;
      -webkit-box-shadow: 0px 30px 30px rgba(27, 29, 33, 0.3);
      box-shadow: 0px 30px 30px rgba(27, 29, 33, 0.3);
    }

    .icon__btn__item {
      padding: 8px 1rem;
    }

    .icon__btn__item:hover {
      background: none;
    }
    .icon__btn__item:not(:last-child) {
      margin-bottom: 1.25rem;
    }
  }
</style>
