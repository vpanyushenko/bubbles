<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/page.store";
  import LabeledSwitch from "$lib/components/switch/LabeledSwitch.svelte";
  import { navigating } from "$app/stores";
  import arrowLeft from "./arrow-left.svg";
  import arrowRight from "./arrow-right.svg";
  import more from "./more.svg";
  import add from "./add.svg";
  import close from "./close.svg";
  import search from "./search.svg";
  import edit from "./edit.svg";
  import trash from "./trash.svg";
  import filter from "./filter.svg";

  const icons = {
    arrowLeft: arrowLeft,
    arrowRight: arrowRight,
    more: more,
    add: add,
    close: close,
    search: search,
    edit: edit,
    trash: trash,
    filter: filter,
  };

  export let icon;
  export let onclick = null;
  export let options = [];
  export let href = "";

  const dropdown = options.length ? true : false;

  let src = icons[icon] ? icons[icon] : more;
  let id = uuid();

  $: active = $pageStore.dropdown === id && $pageStore.dropdown !== null ? true : false;
  $: loading = ($pageStore.clicked === id && $navigating) || ($pageStore.clicked === id && $pageStore.is_fetching);

  function iconClick(event) {
    let iconElement = event.currentTarget;

    //we want to show the loading loading icon if we clicked on a href in a dropdown
    //as a result, we need to check if we are on the icon, otherwise we need to go up
    //the DOM tree to find it
    if (!event.currentTarget.classList.contains("icon__btn")) {
      iconElement = iconElement.closest(".icon__btn");
    }
    id = iconElement.id;
    $pageStore.clicked = id;

    if (dropdown && active) {
      active = false;
      $pageStore.dropdown = null;
    } else if (dropdown) {
      active = true;
      $pageStore.dropdown = event.currentTarget.id;
    } else {
      active = true;
      $pageStore.dropdown = event.currentTarget.id;
    }
  }

  function back(event) {
    id = event.currentTarget.id;
    $pageStore.clicked = id;
  }

  function dropdownSelect(event) {
    const option = event.currentTarget;

    // title = option.querySelector(".title").textContent;
    // value = option.querySelector("input").value;
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
  <a class="icon__btn" {id} sveltekit:prefetch {href} on:click={back}>
    <button>
      <span class="spinner" class:hidden={!loading} />
      <img class="icon icon-main" {src} class:hidden={loading} alt="icon" />
    </button>
  </a>
{:else}
  <div class="icon__btn" {id} class:active={dropdown && active} on:click={iconClick} on:click={onclick}>
    <button>
      <span class="spinner" class:hidden={!loading} />
      <img class="icon icon-main" {src} class:hidden={loading} alt="icon" />
    </button>
    {#if dropdown}
      <div class="icon__btn__dropdown">
        <div class="icon__btn__options">
          {#each options as option}
            {#if option.type === "switch"}
              <LabeledSwitch {...option} />
            {:else if option.href}
              <a
                class="icon__btn__item"
                on:click|stopPropagation={dropdownSelect}
                href={option.href}
                sveltekit:prefetch
                on:click={iconClick}
                on:click={() => ($pageStore.is_fetching = true)}
              >
                <div class="icon__btn__details">
                  <h6 class="">{option.label}</h6>
                  {#if option.caption}
                    <p class="icon__btn__text caption-sm">{option.caption}</p>
                  {/if}
                </div>
                <img src={arrowRight} alt="Arrow Right" />
              </a>
            {:else}
              <div
                class="icon__btn__item"
                on:click|stopPropagation={dropdownSelect}
                on:click={option.onclick}
                on:click={iconClick}
              >
                <div class="icon__btn__details">
                  <h6 class="">{option.label}</h6>
                  {#if option.caption}
                    <p class="icon__btn__text caption-sm">{option.caption}</p>
                  {/if}
                </div>
                <img src={arrowRight} alt="Arrow Right" />
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    content: "";
    box-sizing: border-box;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #fff;
    animation: spinner 0.6s linear infinite;
  }

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
    font-size: 0;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    display: flex;
    place-content: center;
    align-items: center;
    justify-items: center;
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

  .icon__btn__counter {
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
  }

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

  .icon__btn__info {
    margin-bottom: 0px;
    padding: 0 1.5rem;
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
    padding: 1rem 28px 1rem 1.25rem;
    border-radius: 12px;
    background: transparent;
    cursor: pointer;
    -webkit-transition: background 0.25s;
    -o-transition: background 0.25s;
    transition: background 0.25s;
  }

  .icon__btn__table__row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 1rem 1rem 1rem 1.25rem;
    background: transparent;
    flex-grow: 1;
  }

  .icon__btn__table__row .table__cell {
    padding-top: 1rem;
    padding-bottom: 1rem;
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

  .icon__btn__line {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    /* margin-bottom: 6px; */
  }

  .icon__btn__title {
    font-size: 17px;
    margin-right: auto;
    padding-left: 1.25rem;
    color: var(--black);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .icon__btn__options .icon__btn__title:not(:first-child) {
    margin-top: 2rem;
  }

  .icon__btn__header {
    font-size: 17px;
    margin-right: auto;
    color: var(--black);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .icon__btn__time,
  .icon__btn__text {
    color: #b2b3bd;
    text-align: left;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .icon__btn__text {
    margin-top: 6px;
    padding-right: 0.625rem;
  }

  .icon__btn__time {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    margin-left: 1.25rem;
  }

  .icon__btn__btns {
    text-align: center;
  }

  .icon__btn__btn {
    min-width: 230px;
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
    .icon__btn__counter {
      top: 5px;
      right: 5px;
      min-width: 12px;
      height: 12px;
      font-size: 0;
    }
    .icon__btn__dropdown {
      /* top: calc(100% + 1px); */
      right: 0;
      left: 0;
      width: auto;
      padding: 1.5rem 1rem;
      -webkit-box-shadow: 0px 30px 30px rgba(27, 29, 33, 0.3);
      box-shadow: 0px 30px 30px rgba(27, 29, 33, 0.3);
    }
    .icon__btn__info {
      margin-bottom: 1rem;
      padding: 0;
    }
    /* .icon__btn__options {
    margin-bottom: 1.5rem;
  } */
    .icon__btn__item {
      padding: 8px 1rem;
    }

    .icon__btn__item:hover {
      background: none;
    }
    .icon__btn__item:not(:last-child) {
      margin-bottom: 1.25rem;
    }
    .icon__btn__ava {
      margin-right: 1rem;
    }
  }
</style>
