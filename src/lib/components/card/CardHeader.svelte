<script>
  // import { scale, fade } from "svelte/transition";
  import { pageStore, addQueryParam, uuid, Select, IconButton } from "$lib/index";
  // import { pageStore } from "$lib/utils/stores";
  // import IconButton from "$lib/components/button/IconButton.svelte";
  // import Select from "$lib/components/select/Select.svelte";
  // import { addQueryParam } from "$lib/utils/url";
  // import { v4 as uuid } from "@lukeed/uuid";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  export let filters = [];
  export let title = "";
  export let caption = "";
  export let buttons = [];
  export let center = false;
  export let border = false;
  export let px = false;

  const id = `card_header_${uuid()}`;

  const filterIds = filters.map((filter) => {
    return filter.id;
  });

  $: formatted_filters = filters.map((filter) => {
    if (!filter.options) {
      console.log("Your filter does not have any options");
      filter.options = [];
    }

    filter.options.forEach((option) => {
      if (option === "break" || option.onselect) {
        return option;
      } else {
        option.onselect = () => {
          addQueryParam(filter.id, option.value, { show_loading: filter.id, keep_only: filterIds, goto: true });
        };
      }
    });

    if (filter.reset_label && !filter.options.find((option) => option.label === filter.reset_label)) {
      if (filter.reset_label && filter.break_after_reset === true) {
        filter.options.unshift({ break: true });
      }

      const option = {
        label: filter.reset_label,
        value: null,
        onselect: () => {
          addQueryParam(filter.id, "", { show_loading: filter.id, keep_only: filterIds, goto: true });
        },
      };

      filter.options.unshift(option);
    }

    const query_value = $page.url.searchParams.get(filter.id);

    if (query_value) {
      filter.value = query_value;
    } else {
      filter.value = null;
    }

    return filter;
  });
</script>

{#if $pageStore?.table?.selected_table_rows && $pageStore?.table?.id && browser && $pageStore.table.id === document
      .getElementById(id)
      ?.closest(".js-bubbles-card")
      ?.querySelector(".js-bubbles-table")?.id}
  <div class="header center" class:border={border === true || border === "true"} {id}>
    <h6>
      {$pageStore.table.selected_table_rows === 1
        ? "1 item selected"
        : `${$pageStore.table.selected_table_rows} items selected`}
    </h6>
    {#if $pageStore?.table?.checkbox_options && $pageStore.table.checkbox_options.length}
      <IconButton icon="more" options={$pageStore.table.checkbox_options} color="gray-lighter" />
    {/if}
  </div>
{:else if formatted_filters.length || title || caption || buttons.length}
  <div
    class="header"
    class:border={border === true || border === "true"}
    class:filters={formatted_filters.length > 0}
    {id}
    class:justify-end={$pageStore.search === id}
    class:px
  >
    <div class="flex">
      {#if title || caption}
        <div class="title" class:center class:searching={$pageStore.search === id}>
          {#if title}
            <h6>{title}</h6>
          {/if}
          {#if caption && $pageStore.search !== id}
            <p>{@html caption}</p>
          {/if}
        </div>
      {:else if formatted_filters.length > 0 && $pageStore.search !== id}
        <div class="filters" class:mt={title || caption}>
          {#each filters as filter}
            <div class="filter">
              <Select {...filter} value={$page.url.searchParams.get(filter.id)} />
            </div>
          {/each}
        </div>
      {/if}

      <div class="buttons">
        {#each buttons as button}
          <div class="action">
            <IconButton {...button} __search_id={id} />
          </div>
        {/each}
      </div>
    </div>

    {#if formatted_filters.length > 0 && $pageStore.search !== id && (title || caption)}
      <div class="filters" class:mt={title || caption}>
        {#each filters as filter}
          <div class="filter">
            <Select {...filter} value={$page.url.searchParams.get(filter.id)} />
          </div>
        {/each}
      </div>
    {/if}

    <!-- {#if formatted_filters.length > 0}{:else if title || caption}
      <div class="title" class:center class:searching={$pageStore.search === id}>
        {#if title}
          <h6>{title}</h6>
        {/if}
        {#if caption}
          <p>{@html caption}</p>
        {/if}
      </div>
    {/if}

    {#if $pageStore.search !== id}
      <div class="filters" class:mt={title || caption} transition:scale>
        {#each filters as filter}
          <div class="filter">
            <Select {...filter} />
          </div>
        {/each}
      </div>
    {/if}

    {#if formatted_filters.length === 0}
      <div class="buttons">
        {#each buttons as button}
          <div class="action">
            {#if button.search}
              <IconButton {...button} __search_id={id} __search_width_100={false} />
            {:else}
              <IconButton {...button} />
            {/if}
          </div>
        {/each}
      </div>
    {/if} -->
  </div>
{:else}
  <div class="header" class:border {id}>
    <slot>No header props provided</slot>
  </div>
{/if}

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .px {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  /* padding: 0.625rem 2rem 0.625rem; */

  .border {
    border-bottom: 1px solid var(--gray-light);
  }

  .center {
    text-align: center;
    align-items: center;
  }

  .title {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    align-self: center;
    min-height: 3rem;
    justify-content: center;
  }

  .filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .buttons {
    display: flex;
    max-width: 100%;
    justify-content: flex-end;
    flex-grow: 1;
    align-self: flex-start;
  }

  .filter + .filter {
    margin-left: 1rem;
  }

  .action + .action {
    margin-left: 0.5rem;
  }

  .header p {
    color: var(--gray);
    margin-bottom: 0px;
    margin-top: 0px;
  }

  .flex {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .mt {
    margin-top: 1.5rem;
  }

  .justify-end {
    justify-content: end;
  }

  /* .w-100 {
    width: 100%;
  } */

  h6 + p {
    margin-top: 0.5rem;
  }

  @media only screen and (max-width: 767px) {
    .header {
      padding-top: 1.25rem;
    }

    .header.filters {
      display: block;
    }

    .filters > .filter {
      margin-left: 0;
      margin-bottom: 1rem;
      width: 100%;
    }

    .filter:last-of-type {
      margin-bottom: 0rem;
    }

    .searching {
      display: none;
    }
  }

  :global(html.dark) .border {
    border-bottom: 2px solid var(--dark);
  }
</style>
