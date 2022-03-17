<script>
  import TableCell from "./TableCell.svelte";

  export let id = "";
  export let href = null;
  export let onclick = null;
  export let cells = [];
</script>

{#if href}
  <a class="row" sveltekit:prefetch {href} {id} on:click={onclick}>
    {#if cells && cells.length}
      {#each cells as cell}
        <TableCell {...cell} />
      {/each}
    {:else}
      <slot><TableCell><p>--</p></TableCell></slot>
    {/if}
  </a>
{:else}
  <div class="row" class:cursor-pointer={onclick} on:click={onclick} {id}>
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

  :global(.row:last-child .cell) {
    border-bottom: none !important;
  }

  :global(.row:hover .__clickable button) {
    -webkit-box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 5px 0.625rem rgba(227, 230, 236, 0.6);
  }

  @media only screen and (max-width: 767px) {
    .row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      justify-content: space-between;
      flex-basis: 100%;
      width: 100%;
      position: relative;
      background: #fff;
      flex-wrap: none;
      border-bottom: 1px solid var(--gray-light);
    }
  }
</style>
