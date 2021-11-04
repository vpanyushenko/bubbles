<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import Fuse from "$lib/utils/fuzzy-search";
  import { pageStore } from "$lib/stores/page.store";

  export let label = "Select an option";
  export let error = "An error occured";
  export let value = null;
  export let options = [];
  export let desc = null;
  export let id = uuid();
  export let search = options.length > 5 ? true : false;
  export let type = "select";

  $: searchValue = "";
  let searchFocused = false;
  let loading = false;
  let timestamp = 0;
  let selectedIndex = 0;
  $: title = "Select an option";
  $: active = $pageStore.select === id && $pageStore.select !== null ? true : false;
  $: isError = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  const fuse = new Fuse(options, {
    shouldSort: false,
    keys: ["label", "caption"],
    minMatchCharLength: 2,
    threshold: 0.4,
  });
  $: filteredOptions = !searchValue ? options : fuse.search(searchValue).map((obj) => obj.item);

  $: if (isError) {
    setTimeout(() => {
      const index = $pageStore.errors.findIndex((item) => item === id);
      if (index > -1) {
        $pageStore.errors.splice(index, 1);
      }
      isError = false;
    }, 4500);
  }

  $: if (value !== null || value !== undefined) {
    const option = options.find((item) => item.value === value);

    if (option?.label) {
      title = option.label;
    }
  }

  function toggleSelect(event) {
    id = event.currentTarget.parentElement.id;

    if (event.timeStamp - timestamp < 150) {
      return;
    }

    timestamp = event.timeStamp;

    setTimeout(() => {
      if (active) {
        active = false;
        $pageStore.select = null;
        selectedIndex = 0;
        searchValue = "";
        searchFocused = false;
      } else {
        active = true;
        $pageStore.select = id;
        loading = false;
      }
    }, 10);
  }

  function showSelect(event) {
    id = event.currentTarget.id;

    if (event.timeStamp - timestamp < 150) {
      return;
    }

    timestamp = event.timeStamp;

    setTimeout(() => {
      active = true;
      $pageStore.select = id;
      loading = false;
    }, 0);
  }

  function hideSelect(event) {
    id = event.currentTarget.id;
    setTimeout(() => {
      if (!searchFocused) {
        if (event.timeStamp - timestamp < 150) {
          return;
        }

        timestamp = event.timeStamp;

        active = false;
        $pageStore.select = null;
        selectedIndex = 0;
        searchValue = "";
      }
    }, 0);
  }

  function selectOption(event) {
    const option = event.currentTarget;
    value = option.querySelector("input").value;
    active = false;
    $pageStore.select = null;
  }

  function hoverOption(event) {
    const option = event.currentTarget;
    const _value = option.querySelector("input").value;
    const index = options.findIndex((item) => item.value === _value);
    selectedIndex = index;
  }

  function windowClick(event) {
    //if you click outside of the select, we want to close it
    if (!event.target.closest(`.select`)) {
      active = false;
      $pageStore.select = null;
    }
  }

  function keydown(event) {
    if (active) {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();

          if (selectedIndex === options.length - 1) {
            selectedIndex = 0;
          } else {
            selectedIndex++;
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();

          if (selectedIndex === 0) {
            selectedIndex = options.length - 1;
          } else {
            selectedIndex--;
          }
          break;
        }
        case "Enter": {
          event.preventDefault();
          value = filteredOptions[selectedIndex].value;
          active = false;
          $pageStore.select = null;
          break;
        }
        case "Backspace": {
          if (!searchFocused && searchValue) {
            searchValue = searchValue.slice(0, -1);
          }
          break;
        }
        default: {
          if (!searchFocused && event.key.length === 1) {
            selectedIndex = 0;
            searchValue += event.key;
          }
        }
      }

      if (id) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }
</script>

<svelte:window on:click={windowClick} />
<svelte:body on:keydown={keydown} />

<div class="form__field__container select" class:active {id} tabindex="0" on:focus={showSelect} on:blur={hideSelect}>
  <!-- <div> -->
  <div class="head" class:loading class:error={isError} on:click={toggleSelect}>
    <div class="label" class:hidden={isError}>{label}</div>
    <div class="label error" class:hidden={!isError}>{error}</div>
    <span class="value">{title}</span>
    {#if type === "select-number"}
      <input type="number" class="hidden" {value} />
    {:else}
      <input type="hidden" class="hidden" {value} />
    {/if}
  </div>
  <div class="body">
    {#if search}
      <input
        class="search"
        type="text"
        placeholder="Start typing to search..."
        bind:value={searchValue}
        on:focus|preventDefault|stopPropagation={(event) => {
          searchFocused = true;
        }}
        on:blur|preventDefault|stopPropagation={(event) => {
          searchFocused = false;
        }}
      />
    {/if}

    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    {#each filteredOptions as option, index}
      {#if option === "break"}
        <hr />
      {:else}
        <div
          class="option"
          on:click|stopPropagation={selectOption}
          on:click={option.onselect}
          on:mouseover|stopPropagation={hoverOption}
          tabindex="-1"
          class:selected={option.value === value}
          class:focused={selectedIndex === index}
        >
          <div class="title">{option.label}</div>
          <input class="hidden" value={option.value} />
          {#if option.caption}
            <div class="select__info caption">{option.caption}</div>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
  {#if desc}
    <p class="field__desc">{desc}</p>
  {/if}
  <!-- </div> -->
</div>

<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .select {
    position: relative;
    min-width: 250px;
    cursor: pointer;
  }

  .head {
    position: relative;
    -webkit-box-align: center;
    -ms-flex-align: center;
    display: block;
    height: 80px;
    padding: 0 46px 0 21px;
    border: 2px solid transparent;
    background: rgba(228, 228, 228, 0.3);
    border-radius: 1rem;
    font-weight: 600;
    color: #808191;
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

  .head.loading:before {
    content: "";
    background: none;
    transition: none;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    position: absolute;
    top: 40%;
    right: 1.25rem;
    box-sizing: border-box;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #fff;
    animation: spinner 0.6s linear infinite;
  }

  .head.disabled {
    cursor: not-allowed;
  }

  .head.disabled:before {
    content: none;
  }

  .label {
    margin-bottom: 0 !important;
    padding-top: 1rem;
    padding-bottom: 4px;
    pointer-events: none;
    font-size: 0.625rem;
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
  }

  .error {
    color: var(--red) !important;
    border-color: var(--red) !important;
  }

  .value {
    color: var(--black);
  }

  .body {
    position: absolute;
    /* top: calc(100% + 8px); */
    /* top: 8px; */

    left: 0;
    z-index: 20;
    width: 100%;
    margin: auto;
    margin-top: 8px;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border: 1px solid #e4e4e4;
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

  .search {
    width: 100%;
    border-radius: 8px;
    background: rgba(228, 228, 228, 0.3);
    border: 2px solid transparent;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #11142d;
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
    color: #11142d;
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
    color: #808191;
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

  .border .option:hover,
  .option.focused {
    background-color: var(--gray-lightest);
    border-radius: 12px;
  }

  .option.border-bottom {
    padding: 0px;
  }

  .select.active .head {
    border-color: var(--purple);
    background: #ffffff;
    color: #11142d;
  }

  .select.active .head:before {
    -webkit-transform: translateY(-50%) rotate(180deg);
    -ms-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
  }

  .select.active .body {
    visibility: visible;
    opacity: 1;
  }

  .label {
    margin-bottom: 0 !important;
    padding-top: 1rem;
    padding-bottom: 4px;
    pointer-events: none;
    font-size: 0.625rem;
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
  }

  .value {
    color: var(--black);
  }

  .search {
    height: 60px;
    padding: 0rem 1rem !important;
    margin-bottom: 1.5rem;
  }

  .field__desc {
    padding: 0.625rem 22px 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  @media only screen and (max-width: 1179px) {
    .body {
      right: 0;
      width: auto;
      padding: 1.5rem 21px;
    }
  }

  @media only screen and (max-width: 767px) {
    .select {
      width: 100%;
      justify-content: flex-start;
    }
  }
</style>
