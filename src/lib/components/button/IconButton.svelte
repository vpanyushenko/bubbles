<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/page.store";
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
  import Dropdown from "$lib/components/dropdown/Dropdown.svelte";

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
  export let align = "right";
  
  export let color = null; 
  export let border = null; 
  export let invert_icon = false 

  export let mobile_shadow = false
  
  export let transparent = true; //TODO: deprecated
  
  

  if (!transparent) {
    console.info("[bubbles-ui]: transparent on IconButton is deprecated, add an color property instead")
    
    if (!color) {
      color = "gray-lighter"
    }

  }

  // let opacity = 1

  // if (color && color.split("--").length === 2) {
  //   opacity = Number(color.split("--")[1])
  //   color = color.split("--")[0]

  //   if (opacity > 1) {
  //     opacity = opacity / 100
  //   }
  // }

  const dropdown = options.length ? true : false;

  let src = icons[icon] ? icons[icon] : icon;

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

  // function dropdownSelect(event) {
  //   active = false;
  //   $pageStore.dropdown = null;
  // }

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
  <a class="icon__btn" sveltekit:prefetch target={new_page ? "_blank" : ""} {href} on:click={iconClick}>
    <button
      class:disabled={is_loading}
      {id}
      style:background-color={color ? `var(--${color})` : null}
      style:outline={border ? `2px solid var(--${border})` : null}
      style:outline-offset={border ? `-2px` : null}
      class:mobile_shadow={mobile_shadow}
    >
      {#if is_loading}
        <Spinner />
      {/if}
      {#if icon}
        <img class="icon icon-main" {src} class:hidden={is_loading} alt="icon" style:filter={invert_icon ? "invert(1)" : null}/>
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
      {id}
      style:background-color={dropdown && active ? `var(--primary)` : color ? `var(--${color})` : null}
      style:outline={dropdown && active ? "" : border ? `2px solid var(--${border})` : null}
      style:outline-offset={dropdown && active ? "" : border ? `-2px` : null}
      class:mobile_shadow={mobile_shadow}

    >
      {#if is_loading}
        <Spinner />
      {/if}
      <span class:hidden={is_loading} >
        <slot>
          <img class="icon icon-main" {src} class:hidden={is_loading} alt="icon" style:filter={invert_icon ? "invert(1)" : null}/>
        </slot>
      </span>
    </button>
    {#if active && dropdown}
      <Dropdown {options} {align} />
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
