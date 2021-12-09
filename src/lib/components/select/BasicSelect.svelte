<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/page.store";

  const _uuid = uuid();

  export let value = null;
  export let options = [];
  export let id = _uuid;

  let timestamp = 0;
  let selected_index = 0;
  let is_focused = false;
  let is_list_open = false;
  let title = 10;

  $: is_loading = $pageStore.loading.includes(id);

  $: if (value !== null || value !== undefined) {
    const option = options.find((item) => item.value.toString() === value.toString());

    if (option?.label) {
      title = option.label.toString();
    }
  }

  $: if (is_list_open) {
    selected_index = 0;
  }

  $: _title = title;

  function toggleSelectWithClick(event) {
    event.preventDefault();

    if (!is_focused) {
      is_focused = true;
    }

    //the focus event fires before the click event
    //check to make sure the focus event didn't open

    if (event.timeStamp - timestamp > 200) {
      if (!is_list_open) {
        is_list_open = true;
      } else {
        is_list_open = false;
      }
    }
  }

  function selectFocused(event) {
    timestamp = event.timeStamp;
    is_focused = true;
    $pageStore.clicked = _uuid;

    //if the search was open, the focus would be lost but we force the list open
    //so when we focus back, we want to close the list
    if (event?.relatedTarget && event?.relatedTarget?.classList.contains("search")) {
      is_list_open = false;
    } else {
      is_list_open = true;
    }
  }

  function selectBlurred(event) {
    if (event.relatedTarget && event.relatedTarget.classList.contains("search")) {
      return;
    }

    is_focused = false;
    is_list_open = false;
  }

  function selectOption(event) {
    const option = event.currentTarget;
    value = option.querySelector("input").value;

    is_focused = true;
    is_list_open = false;
  }

  function hoverOption(event) {
    const option = event.currentTarget;
    let _value = option.querySelector("input").value;
    const index = options.findIndex((item) => item.value === _value);
    selected_index = index;
  }

  function windowClick(event) {
    //if you click outside of the select, we want to close it
    if (!event.target.closest(`.select`)) {
      is_focused = false;
      is_list_open = false;
    }
  }

  function keydown(event) {
    if (is_list_open) {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();

          if (selected_index === options.length - 1) {
            selected_index = 0;
          } else {
            selected_index++;

            if (filteredOptions[selected_index] === "break") {
              selected_index++;
            }
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();

          if (selected_index === 0) {
            selected_index = options.length - 1;
          } else {
            selected_index--;

            if (filteredOptions[selected_index] === "break") {
              selected_index--;
            }
          }
          break;
        }
        case "Enter": {
          event.preventDefault();
          const option = options[selected_index];

          value = option.value;

          //select the option for the element
          if (option.onselect) {
            setTimeout(() => {
              option.onselect();
            }, 10);
          }

          is_list_open = false;

          break;
        }
        case "Tab": {
          if (is_search_focused) {
            is_list_open = false;
            is_focused = false;
          }
          break;
        }
      }

      if (id) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      if (is_focused) {
        switch (event.key) {
          case "Enter": {
            event.preventDefault();
            is_list_open = true;
            break;
          }
        }
      }
    }
  }
</script>

<svelte:window on:click={windowClick} />
<svelte:body on:keydown={keydown} />

<div class="select" class:is_list_open {id} tabindex="0" on:focus={selectFocused} on:blur={selectBlurred}>
  <!-- <div> -->
  <div class="head" class:is_loading on:click={toggleSelectWithClick}>
    <span class="value">{_title}</span>
  </div>

  <div class="options">
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    {#each options as option, index}
      {#if option === "break"}
        <hr />
      {:else}
        <div
          class="option"
          on:mousedown={selectOption}
          on:click={option.onselect}
          on:mouseover={hoverOption}
          tabindex="-1"
          class:selected={option.value === value}
          class:focused={selected_index === index}
        >
          <div class="title">{option.label}</div>
          <input class="hidden" type="hidden" value={option.value} />
          {#if option.caption}
            <div class="select__info caption">{option.caption}</div>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .select {
    position: relative;
    cursor: pointer;
    min-width: 6rem;
  }

  .select:focus .head {
    border-color: var(--primary);
  }

  .head {
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    display: flex;
    align-items: center;
    height: 3.5rem;
    padding: 0 2.875rem 0 1.25rem;
    border: 2px solid transparent;
    background: rgba(228, 228, 228, 0.3);
    border-radius: 1rem;
    font-weight: 600;
    color: var(--gray);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .head:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 1.25rem;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 0.875rem;
    height: 8px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8'%3E%3Cpath fill='%231b1d21' d='M.293.293A1 1 0 0 1 1.613.21l.094.083L7 5.585 12.293.293a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-6 6a1 1 0 0 1-1.32.083l-.094-.083-6-6a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E")
      no-repeat 50% 50%/100% auto;
    -webkit-transition: -webkit-transform 0.25s;
    transition: -webkit-transform 0.25s;
    -o-transition: transform 0.25s;
    transition: transform 0.25s;
    transition: transform 0.25s, -webkit-transform 0.25s;
  }

  .head.is_loading:before {
    content: "";
    background: none;
    transition: none;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    position: absolute;
    top: 35%;
    right: 1.25rem;
    box-sizing: border-box;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #fff;
    animation: spinner 0.6s linear infinite;
  }
  /* 
  .head.disabled {
    cursor: not-allowed;
  }

  .head.disabled:before {
    content: none;
  } */

  .value {
    color: var(--black);
  }

  .options {
    position: absolute;
    left: 0;
    z-index: 20;
    width: 100%;
    margin: auto;
    margin-top: 8px;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border: 1px solid var(--gray-light);
    background: #ffffff;
    border-radius: 1.5rem;
    visibility: hidden;
    opacity: 0;
    -webkit-box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    max-height: 400px;
    overflow-y: auto;
  }

  .option {
    display: block;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  hr {
    border: none;
    height: 1px;
    color: var(--gray-light);
    background-color: var(--gray-light);
    margin: 1rem;
  }

  .title {
    position: relative;
    margin-bottom: 3px;
    padding-right: 30px;
    color: var(--black);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    line-height: 1.1875;
    font-weight: 600;
  }

  .title:before {
    content: "";
    position: absolute;
    top: 5px;
    right: 8px;
    width: 6px;
    height: 0.625rem;
    /* background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10'%3E%3Cpath fill='%2311142d' d='M.293.293A1 1 0 0 1 1.613.21l.094.083 4 4a1 1 0 0 1 .083 1.32l-.083.094-4 4A1 1 0 0 1 .21 8.387l.083-.094L3.585 5 .293 1.707A1 1 0 0 1 .21.387L.293.293z'/%3E%3C/svg%3E")
      no-repeat 50% 50%/100% auto; */
    -webkit-transition: -webkit-transform 0.25s;
    transition: -webkit-transform 0.25s;
    -o-transition: transform 0.25s;
    transition: transform 0.25s;
    transition: transform 0.25s, -webkit-transform 0.25s;
  }

  .caption {
    color: var(--gray);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .option:hover .title:before,
  .option.focused .title:before {
    -webkit-transform: translateX(5px);
    -ms-transform: translateX(5px);
    transform: translateX(5px);
  }
  .option.selected .title,
  .option.selected .title,
  .option:hover .title,
  .option.focused .title,
  .option:hover .select__info {
    color: #6c5dd3;
  }

  /* .border .option:hover, */
  .option.focused {
    background-color: var(--gray-lightest);
    border-radius: 12px;
  }

  /* .option.border-bottom {
    padding: 0px;
  } */

  .select.is_list_open .head {
    border-color: var(--primary);
    background: #ffffff;
    color: var(--black);
  }

  .select.is_list_open .head:before {
    -webkit-transform: translateY(-50%) rotate(180deg);
    -ms-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
  }

  .select.is_list_open .options {
    visibility: visible;
    opacity: 1;
  }

  .value {
    color: var(--black);
  }

  /* .search {
    height: 60px;
    padding: 0rem 1rem !important;
    margin-bottom: 1.5rem;
  } */

  /* .field__desc {
    padding: 0.625rem 1.375rem 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  } */

  @media only screen and (max-width: 1179px) {
    .options {
      right: 0;
      width: auto;
      padding: 1.5rem 1.25rem;
    }
  }
</style>
