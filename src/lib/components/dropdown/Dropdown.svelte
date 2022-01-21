<script>
  import Fuse from "$lib/utils/fuzzy-search";

  export let value = null;
  export let options = [];
  export let search = options.length > 5 ? true : false;

  $: search_value = "";
  $: filtered_options = !search_value ? options : fuse.search(search_value).map((obj) => obj.item);

  $: console.log(options);
  $: console.log(is_list_open);
  $: is_list_open = options ? true : false;

  let is_focused = false;
  let timestamp = 0;
  let selected_index = 0;
  let is_search_focused = false;

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
    threshold: 0.4,
  });

  function selectOption(event) {
    console.log(event);
    const option = event.currentTarget;
    console.log(option);
    value = option.querySelector("input").value;
    filtered_options = [];
  }

  function hoverOption(event) {
    const option = event.currentTarget;

    const _value = option.querySelector("input").value;
    const index = filtered_options.findIndex((item) => item.value === _value);
    selected_index = index;
  }

  function keydown(event) {
    console.log(filtered_options);
    console.log(event.key);
    console.log(event.key);
    console.log(event.key);
    console.log(event.key);
    if (is_list_open) {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          event.stopPropagation();

          if (selected_index === filtered_options.length - 1) {
            selected_index = 0;
          } else {
            selected_index++;
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          event.stopPropagation();
          if (selected_index === 0) {
            selected_index = filtered_options.length - 1;
          } else {
            selected_index--;
          }
          break;
        }
        case "Enter": {
          console.log("Enter");
          console.log("Enter");
          console.log("Enter");
          event.preventDefault();
          event.stopPropagation();
          console.log(filtered_options[selected_index]);
          value = filtered_options[selected_index].value;
          filtered_options = [];
          break;
        }
      }
    }
  }
</script>

<svelte:body on:keydown={keydown} />

<div class="options">
  {#if search}
    <input
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
    {#if option === "break"}
      <hr tabindex="-1" />
    {:else}
      <div
        class="option"
        on:mousedown={selectOption}
        on:click={option.onselect}
        on:mouseover={hoverOption}
        tabindex="0"
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

<style>
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
    /* visibility: hidden;
    opacity: 0; */
    -webkit-box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    max-height: 400px;
    overflow-y: auto;
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
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='10'%3E%3Cpath fill='%2311142d' d='M.293.293A1 1 0 0 1 1.613.21l.094.083 4 4a1 1 0 0 1 .083 1.32l-.083.094-4 4A1 1 0 0 1 .21 8.387l.083-.094L3.585 5 .293 1.707A1 1 0 0 1 .21.387L.293.293z'/%3E%3C/svg%3E")
      no-repeat 50% 50%/100% auto;
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
</style>
