<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import TableRow from "./TableRow.svelte";
  import TableCell from "./TableCell.svelte";
  import TableHeader from "./TableHeader.svelte";

  export let header = [];
  export let rows = [];
  export let empty = "Nothing here yet.";
  export let padding = "roomy";
  export let id = uuid();
  export let overflow = false;
</script>

<div class="table__wrapper" class:overflow>
  <div class="table js-bubbles-table" class:compact={padding === "compact"} {id}>
    {#if header && header.length}
      <TableHeader cells={header} />
    {/if}

    {#if rows && rows.length}
      {#each rows as row}
        <TableRow {...row} />
      {/each}
    {:else}
      <slot>
        <TableRow>
          <TableCell>
            <p class="empty">{empty}</p>
          </TableCell>
        </TableRow>
      </slot>
    {/if}
  </div>
</div>

<style>
  .table {
    display: table;
    width: 100%;
    color: var(--black);
  }

  :global(.table .row:last-of-type .cell) {
    border-bottom: none;
  }

  :global(.table .row .cell) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  :global(.table.compact .row .cell) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .selected__items {
    display: flex;
  }

  @media only screen and (max-width: 767px) {
    .table__wrapper {
      overflow-x: scroll;
    }
  }

  /* @media only screen and (max-width: 767px) {
    .table.mobile-transform {
      display: flex;
      flex-direction: column;
    }
  } */
</style>
