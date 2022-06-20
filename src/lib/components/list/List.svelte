<script>
  import ListItem from "./ListItem.svelte";
  import ListItemTimeline from "./ListItemTimeline.svelte";

  export let items = [];
  export let type = "standard";
  export let empty = "There nothing here yet";
</script>

<div class="list" class:timeline={type === "timeline"}>
  {#if items.length > 0}
    {#if type === "standard"}
      {#each items as item}
        <ListItem {...item} />
      {/each}
    {:else}
      {#each items as item}
        <ListItemTimeline {...item} />
      {/each}
    {/if}
  {:else}
    <slot>{empty}</slot>
  {/if}
</div>

<style>
  @keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  .timeline {
    margin: 0;
    list-style: none;
    position: relative;
  }
  .timeline:before {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    border-left: 2px dashed var(--gray-light);
  }

  :global(.list.timeline .list__item) {
    position: relative;
    margin-left: 30px;
    border: 1px solid var(--gray-light);
    border-radius: 16px;
    font-weight: 600;
  }

  :global(html.dark) :global(.list.timeline .list__item) {
    border: 2px solid var(--dark);
  }

  :global(html.dark) .timeline:before {
    border-left: 2px dashed var(--gray);
  }
</style>
