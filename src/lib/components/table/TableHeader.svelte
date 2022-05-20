<script>
  import { createEventDispatcher } from "svelte";
  import { pageStore } from "$lib/stores/stores";
  import Checkbox from "$lib/components/checkbox/Checkbox.svelte";
  import { addQueryParam } from "$lib/utils/url";

  const dispatch = createEventDispatcher();

  import arrow_up from "./arrow-up.svg";
  import arrow_down from "./arrow-down.svg";

  /**
   * @prop {Array<Cell>} cells - the details for the header cells.
   */
  export let cells = [];

  if (!$pageStore.table) {
    $pageStore.table = {};
  }

  $pageStore.table.selected_table_rows = 0;
  $pageStore.table.checkbox_options = [];
  $pageStore.table.id = null;

  let checkbox_value = false;
  let header;

  function selectAll(event) {
    $pageStore.table.selected_table_rows = 0;
    $pageStore.table.id = header.closest(".js-bubbles-table").id;
    if (document) {
      document.body.style.cursor = "wait";
    }

    header
      .closest(".js-bubbles-table")
      .querySelectorAll(".js-bubbles-table-row")
      .forEach((row) => {
        if (checkbox_value) {
          $pageStore.table.selected_table_rows++;
        }
        row.querySelector(".checkbox").querySelector("input").checked = checkbox_value;
      });

    if (document) {
      document.body.style.removeProperty("cursor");
    }
  }

  $: if (cells.find((obj) => obj.checkbox === true)) {
    const checkbox_cell = cells.find((obj) => obj.checkbox === true);

    if (checkbox_cell.options && checkbox_cell.options.length) {
      $pageStore.table.checkbox_options = checkbox_cell.options;
    }
  }
</script>

<div class="row header" bind:this={header}>
  {#each cells as cell}
    <div
      class="cell"
      class:right={cell.align === "right" || cell.align === "end"}
      class:hidden={cell.width === 0}
      class:mobile__hide={cell.mobile_width === 0}
    >
      {#if cell.checkbox}
        <Checkbox onchange={selectAll} bind:value={checkbox_value} />
      {:else if cell.sort}
        <span
          class="sort"
          on:click={(event) => {
            if (cell.sort.order === "descending" || cell.sort.order === "desc") cell.sort.order = "ascending";
            else cell.sort.order = "descending";

            if (cell.sort.query) {
              addQueryParam(cell.sort.key || cell?.sort?.id || cell.label, cell.sort.value || cell.sort.order);
            }

            dispatch("sort", {
              sort_by: cell?.sort?.id || cell.label,
              order: cell.sort?.order,
            });
          }}
        >
          <img
            class="sort__icon"
            src={cell.sort?.order === "ascending" ? arrow_up : arrow_down}
            alt="Option Indicator"
          />
          {cell.label}
        </span>
      {:else if cell.label}
        {cell.label}
      {/if}
    </div>
  {/each}
</div>

<style>
  .row {
    display: table-row;
    /* cursor: pointer; */
  }

  .header .cell {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 13px;
    line-height: 1.38462;
    font-weight: 500;
    color: #b2b3bd;
  }

  .cell {
    display: table-cell;
    vertical-align: middle;
    padding-left: 1.25rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e4e4e4;
    color: var(--black);
    flex-grow: 1;
  }

  .cell.right {
    text-align: -webkit-right;
  }

  .cell:first-child {
    padding-left: 0px;
  }

  .row:last-child > .cell {
    border-bottom: none;
  }

  span.sort {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: fit-content;
  }

  .sort__icon {
    width: 1rem;
    margin-right: 0.3rem;
  }

  @media only screen and (max-width: 1179px) {
    .cell {
      padding-left: 15px;
    }
  }

  @media only screen and (max-width: 1023px) {
    .cell {
      padding: 1rem 0px;
    }
  }

  @media only screen and (max-width: 767px) {
    .mobile__hide {
      display: none;
    }
  }
</style>
