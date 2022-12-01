<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import Select from "$lib/components/select/BasicSelect.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import { addQueryParam } from "$lib/utils/url";
  import { page } from "$app/stores";

  export let id = uuid();
  /** @prop {Array<Integers>} rows_per_page - The different limits you want to support */
  export let rows_per_page = [10, 25, 50, 100];

  /** @prop {?Integer} limit - The current limit you are supporting. Will get it from query params or use the first value from `rows_per_page` */
  export let limit = null;

  /** @prop {?Integer} count - the total number of documents known.*/
  export let count = null;

  /** @prop {Integer} [max_buttons=10] - The maximum buttons that will be displayed to the end user. */
  export let max_buttons = 10;
  export let arrows = true;
  export let first_last_arrows = false;
  export let has_more = false;
  export let page_query_name = "page";
  export let limit_query_name = "limit";

  let dom_component_width, dom_component_is_small, _max_buttons;

  $: current_page = Number($page.url.searchParams.get(page_query_name)) || 1;
  $: current_limit = Number($page.url.searchParams.get(limit_query_name)) || limit ? limit : rows_per_page[0];

  const _first = uuid();
  const _prev = uuid();
  const _next = uuid();
  const _last = uuid();

  $: buttons = [];

  $: total_pages = count ? Math.ceil(count / limit) : null;

  $: if (current_page) {
    if (count) {
      //we need to figure out what pages to show in case the total buttons is larger
      //than max buttons. Also we need to figure out which pages to show. If the user
      //is on page 20 of 100, we should show 15 - 25.

      //if we can fix all of the buttons
      if (total_pages < _max_buttons) {
        buttons = countToArray(1);
      } else {
        let pagination_start_page = 1;
        //we need to calc the buttons
        //our countToArray function works by selecting the starting point for the count
        //and going up to the limit
        //so we need to calc the starting point and make sure that we don't go over the total count

        const left_pages = current_page - Math.floor(_max_buttons / 2);
        const right_pages = current_page + Math.floor(_max_buttons / 2);

        //if the pages on the left begin in the negative, just start with 1
        if (left_pages < 0) {
          buttons = countToArray(pagination_start_page);
        } else if (right_pages > total_pages) {
          //if the right pages go over the total pages amount, we need to start with an even
          //lower value
          buttons = countToArray(total_pages - _max_buttons + 1);
        } else {
          buttons = countToArray((pagination_start_page += left_pages));
        }
      }
    }
  }

  $: formatted_rows_per_page =
    rows_per_page && rows_per_page.length
      ? rows_per_page.map((row) => {
          if (typeof row === "string" || typeof row === "number") {
            return {
              label: row,
              value: row,
              onselect: (event) => {
                // addQueryParam(page_query_name, 1, { invalidate: false });
                addQueryParam(limit_query_name, row, { show_loading: id, invalidate: true });
              },
            };
          } else {
            const _onselect = (event) => {
              // addQueryParam(page_query_name, "1", { invalidate: false });
              addQueryParam(limit_query_name, row.value, { show_loading: id, invalidate: true });
            };

            return {
              label: row.label,
              value: row.value,
              onselect: row.onselect ? row.onselect : _onselect,
            };
          }
        })
      : null;

  //make sure the limit is never 0
  $: if ($page.url.searchParams.get(limit_query_name)) {
    if (Number($page.url.searchParams.get(limit_query_name) === 0)) {
      limit = rows_per_page && rows_per_page.length ? rows_per_page[0] : 10;
    } else {
      limit = Number($page.url.searchParams.get(limit_query_name));
    }
  } else if (!limit) {
    limit = rows_per_page && rows_per_page.length ? rows_per_page[0] : 10;
  }

  $: formattedButtons = formatNumberButtons();

  $: if (current_page) {
    formattedButtons = formatNumberButtons();
  }

  $: if (_max_buttons) {
    formattedButtons = formatNumberButtons();
  }

  dom_component_is_small = true;
  $: dom_component_width <= 600 ? (dom_component_is_small = true) : (dom_component_is_small = false);

  $: if (dom_component_width <= 1000) {
    let total_buttons = arrows ? 2 : 0;

    if (first_last_arrows) {
      total_buttons += 2;
    }

    _max_buttons =
      Math.floor(dom_component_width / 100) > 3 + total_buttons
        ? Math.floor(dom_component_width / 100)
        : 7 - total_buttons;
  } else {
    _max_buttons = max_buttons;
  }

  function countToArray(int) {
    const number = Number(int);
    const array = [];

    for (let i = number; i <= number + _max_buttons - 1; i++) {
      array.push(i);
    }

    if (total_pages < _max_buttons) {
      array.length = total_pages;
    }

    return array;
  }

  function formatNumberButtons() {
    return buttons.map((button) => {
      const id = uuid();

      if (typeof button === "string" || typeof button === "number") {
        return {
          id: id,
          label: button,
          onclick: () => {
            // addQueryParam(limit_query_name, limit, { invalidate: false });
            addQueryParam(page_query_name, button, { show_loading: id, invalidate: true });
          },
          color: current_page.toString() !== button.toString() ? "" : "gray-lighter",
        };
      } else {
        const _onclick = () => {
          // addQueryParam(limit_query_name, limit, { invalidate: false });
          addQueryParam(page_query_name, button, { show_loading: id, invalidate: true });
        };

        return {
          id: id,
          label: button.label,
          onclick: button.onclick ? button.onclick : _onclick,
          color: current_page.toString() !== button.toString() ? "" : "gray-lighter",
        };
      }
    });
  }
</script>

<div class="pagination" class:is_small={dom_component_is_small === true} bind:clientWidth={dom_component_width}>
  {#if rows_per_page && rows_per_page.length}
    <div class="rows" class:hidden={count && formatted_rows_per_page[0].value >= count}>
      <p>Rows per page:</p>
      <span><Select value={current_limit} {id} options={formatted_rows_per_page} /></span>
    </div>
  {/if}

  <div class="buttons" class:center={!rows_per_page}>
    {#if first_last_arrows && count}
      <IconButton
        icon="arrowLeftDouble"
        id={_first}
        onclick={() => {
          addQueryParam(page_query_name, 1, { show_loading: _first, invalidate: true });
        }}
      />
    {/if}

    {#if arrows && (has_more || formattedButtons.length > 1 || current_page > 1)}
      <IconButton
        icon="arrowLeft"
        id={_prev}
        onclick={() => {
          if (current_page > 1) {
            addQueryParam(page_query_name, Number(current_page) - 1, {
              show_loading: _prev,
              invalidate: true,
            });
          }
        }}
      />
    {/if}

    {#if formattedButtons.length > 1}
      {#each formattedButtons as button}
        <IconButton id={button.id} onclick={button.onclick} bind:color={button.color}
          ><span class="page__number">{button.label}</span></IconButton
        >
      {/each}
    {:else if count}
      <p class="viewing__page">Viewing page: 1 of 1</p>
    {:else if has_more || current_page > 1}
      <p class="viewing__page">Viewing page: {current_page}</p>
    {/if}

    {#if !count && !formattedButtons}
      <p class="viewing__page">Viewing page: {current_page}</p>
    {/if}

    {#if arrows && (has_more || formattedButtons.length > 1 || current_page > 1)}
      <IconButton
        icon="arrowRight"
        id={_next}
        onclick={(event) => {
          if (current_page < total_pages || has_more) {
            addQueryParam(page_query_name, Number(current_page) + 1, {
              show_loading: _next,
              invalidate: true,
            });
          }
        }}
      />
    {/if}

    {#if first_last_arrows && count}
      <IconButton
        icon="arrowRightDouble"
        id={_last}
        onclick={() => {
          addQueryParam(page_query_name, total_pages, { show_loading: _last, invalidate: true });
        }}
      />
    {/if}
  </div>
</div>

<style>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .pagination.is_small {
    flex-direction: column;
  }

  .center {
    width: 100%;
    justify-content: center;
  }

  .rows,
  .buttons {
    display: flex;
    align-items: center;
  }

  .is_small .rows {
    width: 100%;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .is_small .buttons {
    width: 100%;
    justify-content: space-between;
  }

  .rows span {
    margin-left: 1rem;
  }

  .viewing__page {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  p {
    margin: 0;
  }

  :global(html.dark) .page__number {
    color: var(--white);
  }
</style>
