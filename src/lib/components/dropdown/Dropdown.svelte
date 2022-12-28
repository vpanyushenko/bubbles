<script>
  import { createEventDispatcher } from "svelte";
  import { Tag, pageStore, fuzzySearch, Divider } from "$lib/index";
  import icon_arrowRight from "./arrow-right.svg";
  import { v4 as uuid } from "@lukeed/uuid";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  const dispatch = createEventDispatcher();

  export let id = `dropdown-${uuid()}`;
  export let value = null;
  export let options = [];
  export let search = options.length > 5 ? true : false;
  export let placeholder = "Start typing to search...";
  export let empty = "No results found";
  export let create_option = false;
  export let search_threshold = 0.3;
  export let type = null;
  export let align = "left";
  export let parent;
  export let is_list_open = false;

  $: formatted_options = options
    .map((option) => {
      if (option.break === false) {
        return null;
      }

      if (typeof option === "string") {
        return {
          label: option,
          value: option,
        };
      } else {
        return option;
      }
    })
    .filter(Boolean);

  $: search_value = "";
  $: filtered_options =
    !search_value && is_list_open
      ? formatted_options
      : fuzzySearch(search_value, formatted_options, { threshold: search_threshold ?? 0.3, keys: ["label"] });

  let height, y; //window bindings

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

    dispatch("active", true);
  } else {
    dispatch("active", false);
  }

  function selectOption(event) {
    let option = filtered_options[selected_index];
    value = option?.value;

    if (!value && create_option) {
      option = {
        label: search_value,
        value: search_value,
      };
      options = [...options, option];
      value = search_value;
      selected_index = options.length - 1;

      dispatch("created", {
        value: value,
        index: selected_index,
      });
    }

    if (option?.href) {
      window.open(option.href, option.new_page ? "_blank" : "_self");
    }

    if (option?.onclick) {
      option.onclick(event);
    }

    if (option?.onselect) {
      option.onselect(event);
    }

    dispatch("select", {
      value: value,
      index: selected_index,
    });

    is_list_open = false;
  }

  function hoverOption(event) {
    if (is_using_pointer_device) {
      const option = event.currentTarget;
      let _value = option.querySelector("input").value;
      if (type === "select-number") {
        _value = Number(_value);
      }

      if (_value) {
        selected_index = filtered_options.findIndex((item) => item.value === _value);
      } else {
        //There was no value, so the value could have been anything falsy, we want find it by the title
        let title = option.querySelector(".title").innerText;
        selected_index = filtered_options.findIndex((item) => item.label === title);
      }
    }
  }

  function mousemove(event) {
    is_using_pointer_device = true;
  }

  function keydown(event) {
    if (is_list_open) {
      if (event.key.toLowerCase() === "a" && event.metaKey === true) {
        const input = event.target;
        event.preventDefault();
        event.stopPropagation();

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

          if (selected_index === formatted_options.length - 1) {
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

            if (
              filtered_options[selected_index] === "break" ||
              filtered_options[selected_index]?.break === true ||
              filtered_options[selected_index]?.divider === true
            ) {
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
            selected_index = formatted_options.length - 1;
          } else {
            selected_index--;

            if (
              filtered_options[selected_index] === "break" ||
              filtered_options[selected_index]?.break === true ||
              filtered_options[selected_index]?.divider === true
            ) {
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
          selectOption();
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
            }
            break;
          }
        }

        default: {
          if (search) {
            if (!is_search_focused && event.key.length === 1) {
              selected_index = 0;
              search_value += event.key;
              event.preventDefault();
            }
          }
        }
      }
      // } else {
      //   //Open a select if it's not in focus

      //   // console.log(is_parent_focused, type);

      //   // if (is_parent_focused && type) {
      //   //   switch (event.key) {
      //   //     case "Enter": {
      //   //       event.preventDefault();
      //   //       is_list_open = true;
      //   //       break;
      //   //     }
      //   //   }
      //   // }
    }
  }

  function bodyClicked(event) {
    let parent_clicked = false;

    if (parent) {
      try {
        if (event.target && event.target.closest(`#${parent}`)) {
          parent_clicked = true;
        }
      } catch (error) {
        if (event?.target?.parentElement && event?.target?.parentElement?.id === parent) {
          parent_clicked = true;
        }
      }
    }

    if (is_list_open) {
      const dropdown_clicked = event.target.closest(`.js-bubbles-dropdown`);
      const field_clicked = event.target.closest(`.js-bubbles-field-container`);
      const select_clicked = event.target.closest(`.js-bubbles-select`);
      const icon_clicked = event.target.closest(`.js-bubbles-icon-button`);

      if (!parent_clicked && !dropdown_clicked && !field_clicked && !select_clicked && !icon_clicked) {
        is_list_open = false;
      }
    } else {
      if (parent_clicked) {
        is_list_open = true;
      }
    }
  }

  $: if (browser && is_list_open && filtered_options) {
    //wait for 100 ms
    setTimeout(() => {
      const dropdown = document.getElementById(id);
      const rect = dropdown ? dropdown.getBoundingClientRect() : null;
      const modal = dropdown ? dropdown.closest(".js-bubbles-modal") : null;

      if (!modal && rect) {
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
    }, 100);
  }
</script>

<svelte:body on:keydown={keydown} on:click={bodyClicked} />
<svelte:window bind:innerHeight={height} bind:scrollY={y} />

<!-- {#if is_list_open} -->
<div
  class:hidden={!is_list_open}
  class="options js-bubbles-dropdown"
  class:left={align === "left"}
  class:right={align === "right"}
  {id}
  on:mousemove={mousemove}
>
  {#if search}
    <input
      class="search"
      type="text"
      {placeholder}
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
      {#if option === "break" || option.break === true || option.divider === true}
        <Divider {...option} />
      {:else if option.href}
        <a
          class="option"
          class:selected={option.value === value}
          class:focused={selected_index === index && !is_using_pointer_device}
          href={option.href}
          target={option.new_page ? "_blank" : ""}
          data-sveltekit-preload-data="hover"
          on:mousedown={() => ($pageStore.is_fetching = true)}
          on:mouseover={hoverOption}
        >
          <div class="option__content">
            {#if option.img}
              <img class="option__img" src={option.img} alt={option.label} />
            {/if}

            <div class="text">
              <div class="title" style={option.color ? `color: --var(${option.color})` : ""}>{option.label}</div>
              <input class="hidden" type="hidden" value={option.value} />
              {#if option.caption}
                <div class="select__info caption">{option.caption}</div>
              {/if}
            </div>
          </div>

          <div class="tag">
            {#if option?.tag?.label}
              <Tag {...option.tag} />
            {/if}
          </div>

          {#if option.icon !== null}
            <img class="icon" src={option.icon || icon_arrowRight} alt="Option Indicator" />
          {/if}
        </a>
      {:else}
        <div
          class="option"
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
              <div class="title" class:error={option.color === "error"} class:success={option.color === "success"}>
                {option.label}
              </div>
              <input class="hidden" type="hidden" value={option.value} />
              {#if option.caption}
                <div class="select__info caption">{option.caption}</div>
              {/if}
            </div>
          </div>

          <div class="tag">
            {#if option?.tag?.label}
              <Tag {...option.tag} />
            {/if}
          </div>

          {#if option.icon !== null}
            <img class="icon" src={option.icon || icon_arrowRight} alt="Option Indicator" />
          {/if}
        </div>
      {/if}
    {/if}
  {:else}
    <div class="option empty">
      <div class="option__content">
        <div class="text">
          <div class="title">{empty}</div>
        </div>
      </div>
    </div>
  {/each}
</div>

<!-- {/if} -->
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
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
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
  .option:hover img.icon,
  .option:focus .tag,
  .option:hover .tag {
    transform: translateX(5px);
  }

  .text {
    min-height: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tag {
    justify-content: right;
    margin-left: auto;
    transition: transform 0.25s;
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
    color: var(--primary);
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

  .option.empty.selected .title,
  .option.empty.selected .title,
  .option.empty:hover .title,
  .option.empty.focused .title,
  .option.empty:hover .select__info {
    color: var(--gray);
  }

  /* .border .option.empty:hover, */
  .option.empty.focused {
    background-color: var(--gray-lightest);
    border-radius: 12px;
  }

  .option.empty.selected {
    /* background-color: var(--dark-lightest); */
    border-radius: 12px;
  }
  .error {
    color: var(--error);
  }
  .success {
    color: var(--success);
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
