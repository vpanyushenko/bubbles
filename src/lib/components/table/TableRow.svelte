<script>
  import TableCell from "./TableCell.svelte";
  import { v4 as uuid } from "@lukeed/uuid";

  export let id = uuid();
  export let href = null;
  export let onclick = null;
  export let cells = [];
  export let wrap = true;
  export let mobile_wrap = true;
</script>

{#if href}
  <a
    class="row js-bubbles-table-row"
    class:nowrap={wrap === false}
    class:mobile__nowrap={mobile_wrap == false}
    sveltekit:prefetch
    {href}
    {id}
    on:click={onclick}
  >
    {#if cells && cells.length}
      {#each cells as cell}
        <TableCell {...cell} />
      {/each}
    {:else}
      <slot><TableCell><p>--</p></TableCell></slot>
    {/if}
  </a>
{:else}
  <div
    class="row js-bubbles-table-row"
    class:cursor-pointer={onclick}
    on:click={onclick}
    {id}
    class:nowrap={wrap === false}
    class:mobile__nowrap={mobile_wrap == false}
  >
    {#if cells && cells.length}
      {#each cells as cell}
        {#if cell.button}
          <TableCell {...cell} />
        {:else}
          <TableCell {...cell} />
        {/if}
      {/each}
    {:else}
      <slot><TableCell><p>--</p></TableCell></slot>
    {/if}
  </div>
{/if}

<style>
  .row {
    display: table-row;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .row.nowrap {
    white-space: nowrap;
  }

  :global(.row:last-child .cell) {
    border-bottom: none !important;
  }

  :global(.row:hover .__clickable button) {
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  :global(html.dark .row:hover .__clickable button) {
    -webkit-box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.6);
    box-shadow: 0 5px 0.625rem rgba(0, 0, 0, 0.6);
  }

  @media only screen and (max-width: 767px) {
    .row.mobile__nowrap {
      white-space: nowrap;
    }
  }
</style>
