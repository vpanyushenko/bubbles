<script>
  import { createEventDispatcher } from "svelte";
  import Fuse from "$lib/utils/fuze";
  import icon_arrowRight from "./arrow-right.svg";
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/utils/stores";
  import { onMount } from "svelte";

  const id = `dropdown-${uuid()}`;
  const search_input_id = uuid();

  const dispatch = createEventDispatcher();

  export let value = null;
  export let options = [];
  export let search = options.length > 5 ? true : false;
  export let search_threshold = 0.3;
  export let type = null;
  export let align = "left";

  $: search_value = "";
  $: filtered_options = !search_value ? options : fuse.search(search_value).map((obj) => obj.item);
  $: is_list_open = options ? true : false;

  let height, y; //window bindings

  let is_focused = false;
  let selected_index = 0;
  let is_search_focused = false;
  let is_using_pointer_device = true;

  $: if (search_value) {
    is_using_pointer_device = false;
  }

  $: if (is_list_open) {
    is_search_focused = false;
    search_value = "";
    selected_index = 0;
  } else {
    filtered_options = [];
  }

  const fuse = new Fuse(options, {
    shouldSort: false,
    keys: ["label", "caption"],
    minMatchCharLength: 2,
    threshold: search_threshold ?? 0.3,
  });

  function selectOption(event) {
    const option = event.currentTarget;

    if (type === "select-number") {
      value = Number(option.querySelector("input").value);
    } else {
      value = option.querySelector("input").value || null;
    }

    if (!value) {
      //There was no value, so the value could have been anything falsy, we want find it by the title
      let title = option.querySelector(".title").innerText;
      selected_index = options.findIndex((item) => item.label === title);
      value = filtered_options[selected_index].value;
    }

    if (value === undefined) {
      value = null;
    }

    is_focused = true;
    is_list_open = false;
    $pageStore.clicked = null;
    $pageStore.dropdown = null;

    dispatch("select", {
      value: value,
      index: selected_index,
    });
  }

  function hoverOption(event) {
    if (is_using_pointer_device) {
      const option = event.currentTarget;
      let _value = option.querySelector("input").value;
      if (type === "select-number") {
        _value = Number(_value);
      }

      if (value) {
        selected_index = options.findIndex((item) => item.value === _value);
      } else {
        //There was no value, so the value could have been anything falsy, we want find it by the title
        let title = option.querySelector(".title").innerText;
        selected_index = options.findIndex((item) => item.label === title);
      }
    }
  }

  function mousemove(event) {
    is_using_pointer_device = true;
  }

  function keydown(event) {
    if (is_list_open) {
      if (event.key.toLowerCase() === "a" && event.metaKey === true) {
        event.preventDefault();
        event.stopPropagation();
        const input = document.getElementById(search_input_id);
        input.focus();
        input.select();
        return;
      }

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();

          if (is_using_pointer_device) {
            //the first arrow should select the first option. Even though the first index is already selected, it's not clear to the user
            //So on this first moment, if the index is 0, we'll leave it at zero.
          }

          if (selected_index === options.length - 1) {
            selected_index = 0;
          } else {
            if (is_using_pointer_device) {
              //the first arrow should select the first option. Even though the first index is already selected, it's not clear to the user
              //So on this first moment, if the index is 0, we'll leave it at zero.

              if (selected_index === 0) {
                selected_index = 0;
              }
            } else {
              selected_index++;
            }

            if (filtered_options[selected_index] === "break" || filtered_options[selected_index]?.break === true) {
              selected_index++;
            }
          }

          is_using_pointer_device = false;

          if (id) {
            const option = document.getElementById(id).querySelectorAll(".option")[selected_index];
            if (option) {
              option.parentNode.scrollTop = option.offsetTop - 200;
            }
          }

          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          is_using_pointer_device = false;

          if (selected_index === 0) {
            selected_index = options.length - 1;
          } else {
            selected_index--;

            if (filtered_options[selected_index] === "break") {
              selected_index--;
            }
          }

          if (id) {
            const option = document.getElementById(id).querySelectorAll(".option")[selected_index];
            if (option) {
              option.parentNode.scrollTop = option.offsetTop - 200;
            }
          }

          break;
        }
        case "Enter": {
          event.preventDefault();
          const option = filtered_options[selected_index];
          value = option?.value;

          if (option.href) {
            window.open(option.href, option.new_page ? "_blank" : "_self");
          }

          if (option.onclick) {
            option.onclick(event);
          }

          if (option.onselect) {
            option.onselect(event);
          }

          is_list_open = false;

          break;
        }

        case "Escape": {
          is_list_open = false;
          break;
        }
        case "Backspace": {
          if (type && search) {
            if (!is_search_focused && search_value) {
              search_value = search_value.slice(0, -1);
            }
            break;
          }
        }
        case "Tab": {
          if (type) {
            if (is_search_focused) {
              is_list_open = false;
              is_focused = false;
            }
            break;
          }
        }

        default: {
          if (type && search) {
            if (!is_search_focused && event.key.length === 1) {
              selected_index = 0;
              search_value += event.key;
              event.preventDefault();
            }
          }
        }
      }
    } else {
      //Open a select if it's not in focus
      if (is_focused && type) {
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

  onMount(() => {
    //check to see if inside of a model
    //if we are, we should adjust the dropdown so it's visible in the modal
    const dropdown = document.getElementById(id);
    const modal = dropdown ? dropdown.closest(".js-bubbles-modal") : null;
    const rect = dropdown ? dropdown.getBoundingClientRect() : null;

    //TODO: Not sure why scrollintoView not working
    //dropdown.scrollIntoView({ behavior: "smooth", block: "end" });

    if (!modal) {
      if (rect.bottom + y + 100 > height + y) {
        let diff = rect.bottom + 100 - height;

        y += diff;
      }
    } else if (rect) {
      const modal_rect = modal.querySelector("main").getBoundingClientRect();

      let scroll = rect.bottom - modal_rect.bottom;

      if (scroll > 25) {
        modal.querySelector("main").scroll({ top: scroll + rect.height, behavior: "smooth" });
      }
    }
  });
</script>

<svelte:body on:keydown={keydown} />
<svelte:window bind:innerHeight={height} bind:scrollY={y} />

{#if (filtered_options && filtered_options.length) || is_list_open}
  <div class="options" class:left={align === "left"} class:right={align === "right"} {id} on:mousemove={mousemove}>
    {#if search}
      <input
        id={search_input_id}
        class="search"
        type="text"
        placeholder="Start typing to search..."
        bind:value={search_value}
        on:focus|preventDefault|stopPropagation={(event) => {
          is_search_focused = true;
        }}
        on:blur|preventDefault|stopPropagation={(event) => {
          is_search_focused = false;
        }}
      />
    {/if}

    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    {#each filtered_options as option, index}
      {#if option.hidden !== true}
        {#if option === "break" || option.break === true}
          <hr tabindex="-1" />
        {:else if option.href}
          <a
            class="option"
            class:selected={option.value === value}
            class:focused={selected_index === index && !is_using_pointer_device}
            href={option.href}
            target={option.new_page ? "_blank" : ""}
            sveltekit:prefetch
            on:mousedown={() => ($pageStore.is_fetching = true)}
            on:mousedown={option.onselect}
            on:mouseover={hoverOption}
          >
            <div class="option__content">
              {#if option.img}
                <img class="option__img" src={option.img} alt={option.label} />
              {/if}

              <div class="text">
                <div class="title">{option.label}</div>
                <input class="hidden" type="hidden" value={option.value} />
                {#if option.caption}
                  <div class="select__info caption">{option.caption}</div>
                {/if}
              </div>
            </div>

            {#if option.icon !== null}
              <img class="icon" src={option.icon || icon_arrowRight} alt="Option Indicator" />
            {/if}
          </a>
        {:else}
          <div
            class="option"
            on:mousedown={option.onclick}
            on:mousedown={option.onselect}
            on:mousedown={selectOption}
            on:mouseover={hoverOption}
            class:selected={option.value === value}
            class:focused={selected_index === index && !is_using_pointer_device}
          >
            <div class="option__content">
              {#if option.img}
                <img class="option__img" src={option.img} alt={option.label} />
              {/if}

              <div class="text">
                <div class="title">{option.label}</div>
                <input class="hidden" type="hidden" value={option.value} />
                {#if option.caption}
                  <div class="select__info caption">{option.caption}</div>
                {/if}
              </div>
            </div>

            {#if option.icon !== null}
              <img class="icon" src={option.icon || icon_arrowRight} alt="Option Indicator" />
            {/if}
          </div>
        {/if}
      {/if}
    {/each}
  </div>
{/if}

<style>
  .options {
    position: absolute;
    /* left: 0; */
    z-index: 9999;
    width: 100%;
    margin: auto;
    margin-top: 8px;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border: 1px solid var(--gray-light);
    background: #ffffff;
    border-radius: 1.5rem;
    cursor: pointer;
    -webkit-box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    max-height: 400px;
    overflow-y: auto;
    min-width: 22rem;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .search {
    width: 100%;
    border-radius: 8px;
    background: rgba(228, 228, 228, 0.3);
    border: 2px solid transparent;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    height: 56px;
    padding: 0 23px;
    height: 60px;
    padding: 0rem 1rem !important;
    margin-bottom: 1.5rem;
  }

  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .option__content {
    display: flex;
    align-items: center;
  }

  img.option__img {
    height: 1rem;
    margin-right: 1rem;
  }

  img.icon {
    height: 0.75rem;
    margin-left: 1rem;
    transition: transform 0.25s;
  }

  .option:focus img.icon,
  .option:hover img.icon {
    transform: translateX(5px);
  }

  .text {
    display: block;
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
    /* margin-bottom: 3px; */
    padding-right: 30px;
    color: var(--black);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    line-height: 1.1875;
    font-weight: 600;
  }

  /* .title:before {
    content: "";
    position: absolute;
    top: 5px;
    right: 8px;
    width: 6px;
    height: 0.625rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10'%3E%3Cpath fill='%2311142d' d='M.293.293A1 1 0 0 1 1.613.21l.094.083 4 4a1 1 0 0 1 .083 1.32l-.083.094-4 4A1 1 0 0 1 .21 8.387l.083-.094L3.585 5 .293 1.707A1 1 0 0 1 .21.387L.293.293z'/%3E%3C/svg%3E")
      no-repeat 50% 50%/100% auto;
    -webkit-transition: -webkit-transform 0.25s;
    transition: -webkit-transform 0.25s;
    -o-transition: transform 0.25s;
    transition: transform 0.25s;
    transition: transform 0.25s, -webkit-transform 0.25s;
  } */

  .caption {
    color: var(--gray);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    margin-top: 3px;
  }

  /* .option:hover .title:before,
  .option.focused .title:before {
    -webkit-transform: translateX(5px);
    -ms-transform: translateX(5px);
    transform: translateX(5px);
  } */
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

  .option.selected {
    /* background-color: var(--dark-lightest); */
    border-radius: 12px;
  }

  :global(html.dark) .options {
    border: 1px solid var(--dark);
    background: var(--dark-darker);
    -webkit-box-shadow: 0 1.25rem 1rem rgba(0, 0, 0, 0);
    box-shadow: 0 1.25rem 1rem rgba(0, 0, 0, 0);
  }

  :global(html.dark) hr {
    color: var(--dark-light);
    background-color: var(--dark-light);
  }
  :global(html.dark) .title {
    color: var(--gray-lighter);
  }
  :global(html.dark) .caption {
    color: var(--gray);
  }
  :global(html.dark) .search {
    background: var(--dark);
    color: var(--white);
  }
  :global(html.dark) .option.focused {
    background-color: var(--dark);
  }
  :global(html.dark) img {
    filter: invert();
  }
</style>
