<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import Select from "$lib/components/select/BasicSelect.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import { addQueryParam } from "$lib/utils/url";
  import { page } from "$app/stores";

  export let id = uuid();

  export let rows_per_page = [10, 25, 50, 100];
  export let limit = rows_per_page ? rows_per_page[0] : 10;
  export let count = null;
  export let max_buttons = 10;
  export let arrows = true;
  export let first_last_arrows = false;
  export let has_more = false;
  export let page_query_name = "page";
  export let limit_query_name = "limit";

  const _first = uuid();
  const _prev = uuid();
  const _next = uuid();
  const _last = uuid();

  $: buttons = [];

  $: total_pages = count ? Math.ceil(count / limit) : null;

  $: active_page = $page.query.get(page_query_name) ? Number($page.query.get(page_query_name)) : 1;

  function countToArray(int) {
    const number = Number(int);
    const array = [];

    for (let i = number; i <= number + max_buttons - 1; i++) {
      array.push(i);
    }

    if (total_pages < max_buttons) {
      array.length = total_pages;
    }

    return array;
  }

  $: if (active_page) {
    if (count) {
      //we need to figure out what pages to show in case the total buttons is larger
      //than max buttons. Also we need to figure out which pages to show. If the user
      //is on page 20 of 100, we should show 15 - 25.

      //if we can fix all of the buttons
      if (total_pages < max_buttons) {
        buttons = countToArray(1);
      } else {
        let pagination_start_page = 1;
        //we need to calc the buttons
        //our countToArray function works by selecting the starting point for the count
        //and going up to the limit
        //so we need to calc the starting point and make sure that we don't go over the total count

        const left_pages = active_page - Math.floor(max_buttons / 2);
        const right_pages = active_page + Math.floor(max_buttons / 2);

        //if the pages on the left begin in the negative, just start with 1
        if (left_pages < 0) {
          buttons = countToArray(pagination_start_page);
        } else if (right_pages > total_pages) {
          //if the right pages go over the total pages amount, we need to start with an even
          //lower value
          buttons = countToArray(total_pages - max_buttons + 1);
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
                addQueryParam(page_query_name, 1, { goto: false });
                addQueryParam(limit_query_name, row, { show_loading: id, goto: true });
              },
            };
          } else {
            const _onselect = (event) => {
              addQueryParam(page_query_name, "1", { goto: false });
              addQueryParam(limit_query_name, row.value, { show_loading: id, goto: true });
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
  $: if ($page.query.get(limit_query_name)) {
    if (Number($page.query.get(limit_query_name) === 0)) {
      limit = rows_per_page && rows_per_page.length ? rows_per_page[0] : 10;
    } else {
      limit = Number($page.query.get(limit_query_name));
    }
  } else {
    limit = rows_per_page && rows_per_page.length ? rows_per_page[0] : 10;
  }

  $: formattedButtons = buttons.map((button) => {
    if (typeof button === "string" || typeof button === "number") {
      return {
        label: button,
        onclick: () => {
          addQueryParam(limit_query_name, limit, { goto: false });
          addQueryParam(page_query_name, button);
        },
        transparent: active_page.toString() !== button.toString(),
      };
    } else {
      const _onclick = () => {
        addQueryParam(limit_query_name, limit, { goto: false });
        addQueryParam(page_query_name, button);
      };

      return {
        label: button.label,
        onclick: button.onclick ? button.onclick : _onclick,
        transparent: active_page.toString() !== button.label.toString(),
      };
    }
  });
</script>

<div class="pagination">
  {#if rows_per_page && rows_per_page.length}
    <div class="rows">
      <p>Rows per page:</p>
      <span><Select value={limit} {id} options={formatted_rows_per_page} /></span>
    </div>
  {/if}

  <div class="buttons" class:center={!rows_per_page}>
    {#if first_last_arrows && count}
      <IconButton
        icon="arrowLeftDouble"
        id={_first}
        onclick={() => {
          addQueryParam(page_query_name, 1, { show_loading: _first, goto: true });
        }}
      />
    {/if}

    {#if arrows}
      <IconButton
        icon="arrowLeft"
        id={_prev}
        onclick={() => {
          if (active_page > 1) {
            addQueryParam(page_query_name, Number($page.query.get(page_query_name)) - 1, {
              show_loading: _prev,
              goto: true,
            });
          }
        }}
      />
    {/if}

    {#each formattedButtons as button}
      <IconButton onclick={button.onclick} bind:transparent={button.transparent}>{button.label}</IconButton>
    {/each}

    {#if !count}
      <p class="viewing__page">Viewing page: {active_page}</p>
    {/if}

    {#if arrows}
      <IconButton
        icon="arrowRight"
        id={_next}
        onclick={(event) => {
          if (active_page < total_pages || has_more) {
            addQueryParam(page_query_name, Number($page.query.get(page_query_name)) + 1, {
              show_loading: _next,
              goto: true,
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
          addQueryParam(page_query_name, total_pages, { show_loading: _last, goto: true });
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

  .center {
    width: 100%;
    justify-content: center;
  }

  .rows,
  .buttons {
    display: flex;
    align-items: center;
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
</style>
