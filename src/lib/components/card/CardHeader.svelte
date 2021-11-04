<script>
  import IconButton from "$lib/components/inputs/icon-button/IconButton.svelte";
  import Select from "$lib/components/inputs/Select.svelte";

  export let filters = [];
  export let title = "";
  export let caption = "";
  export let actions = [];
  export let center = false;
  export let border = true;
</script>

{#if filters.length || title || caption || actions.length}
  <div class="header" class:border class:filters={filters.length > 0}>
    <div class="filters">
      {#each filters as filter}
        <div class="filter">
          <Select {...filter} />
        </div>
      {/each}
    </div>

    {#if title || caption}
      <div class="title" class:center>
        {#if title}
          <h6>{title}</h6>
        {/if}
        {#if caption}
          <p>{caption}</p>
        {/if}
      </div>
    {/if}

    <div class="actions">
      {#each actions as action}
        <div class="action">
          <IconButton {...action} />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div class="header" class:border>
    <slot>No header props provided</slot>
  </div>
{/if}

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .border {
    border-bottom: 1px solid var(--gray-light);
  }

  .center {
    text-align: center;
  }

  .title {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
  }

  .filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .actions {
    display: flex;
    align-items: center;
  }

  .filter + .filter {
    margin-left: 1rem;
  }

  .action + .action {
    margin-left: 0.5rem;
  }

  /* .filters .filter:first-child {
    margin-left: 0rem;
  } */

  p {
    color: var(--gray);
  }

  h6 + p {
    margin-top: 0.5rem;
  }

  @media only screen and (max-width: 767px) {
    .header.filters {
      display: block;
    }

    .filters {
      margin-bottom: 1rem;
    }

    .filters > .filter {
      margin-left: 0;
      margin-bottom: 1rem;
      width: 100%;
    }
  }
</style>
