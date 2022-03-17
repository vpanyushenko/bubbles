<script>
  import { pageStore } from "$lib/stores/stores";
  import Checkbox from "$lib/components/checkbox/Checkbox.svelte";

  export let cells = [];

  let checkbox_value = false;
  let header;

  $pageStore.selected_table_rows = 0;

  function selectAll(event) {
    $pageStore.selected_table_rows = 0;

    header
      .closest(".js-bubbles-table")
      .querySelectorAll(".js-bubbles-table-row")
      .forEach((row) => {
        if (checkbox_value) {
          $pageStore.selected_table_rows++;
        }
        row.querySelector(".checkbox").querySelector("input").checked = checkbox_value;
      });
  }

  if (cells.find((obj) => obj.checkbox === true)) {
    const checkbox_cell = cells.find((obj) => obj.checkbox === true);
    if (checkbox_cell.options && checkbox_cell.options.length) {
      $pageStore.checkbox_options = checkbox_cell.options;
    }
  }
</script>

<div class="row header" bind:this={header}>
  {#each cells as cell}
    <div class="cell" class:right={cell.align === "right" || cell.align === "end"}>
      {#if cell.checkbox}
        <Checkbox onchange={selectAll} bind:value={checkbox_value} />
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

  @media only screen and (max-width: 1179px) {
    .cell {
      padding-left: 15px;
    }
  }

  @media only screen and (max-width: 1023px) {
    .header .cell {
      display: none;
    }
    .row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      justify-content: space-between;
      flex-basis: 100%;
      flex-wrap: wrap;
    }
    .cell {
      display: block;
      padding: 1rem 0px;
      border: none;
    }
  }

  @media only screen and (max-width: 767px) {
    .row {
      display: none;
    }

    /* .row {
      width: 100%;
      position: relative;
      padding: 2rem;
      border-radius: 1.5rem;
      background: #fff;
      -webkit-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
      -moz-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
      box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
      align-items: center;
      flex-wrap: none;
    }

    .cell {
      display: flex;
      width: 100%;
      padding: 0px;
      text-align: center;
      justify-content: center;
    } */
  }
</style>
