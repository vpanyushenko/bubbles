<script>
  import ListItem from "./ListItem.svelte";

  export let items = [];
  export let type = "list";
  export let empty = "There nothing here yet";

  console.log(type);
</script>

<div class="list" class:timeline={type === "timeline"}>
  {#if items.length > 0}
    {#each items as item}
      <ListItem {...item} timeline={type === "timeline" ? true : false} />
    {/each}
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

  .timeline article > span {
    width: 2px;
    height: calc(100% + 2rem);
    left: -30px;
    top: 0;
    position: absolute;
  }
  .timeline article > span:before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    background: var(--gray-light);
    left: -6px;
    top: calc((100% - 2rem) / 2 - 6px);
  }
  .timeline article span:after {
    top: 100%;
  }
  .timeline article > div {
    margin-left: 10px;
  }
  .timeline div .title,
  .timeline div .type {
    font-weight: 600;
    font-size: 12px;
  }
  .timeline div .info {
    font-weight: 300;
  }
  .timeline div > div {
    margin-top: 2px;
  }
  .timeline span.number {
    height: 100%;
  }
  .timeline span.number span {
    position: absolute;
    font-size: 10px;
    left: -35px;
    font-weight: bold;
  }
  .timeline span.number span:first-child {
    top: 0;
  }
  .timeline span.number span:last-child {
    top: 100%;
  }

  .timeline__ring__container {
    position: relative;
    top: calc((100% - 2rem) / 2 - 6px);
  }

  .circle {
    margin: 0px;
    width: 15px;
    height: 15px;
    background-color: var(--green);
    border-radius: 50%;
    position: absolute;
    top: -6px;
    left: -7px;
  }

  .timeline__active {
    margin: 0px;
    border: 3px solid var(--green);
    -webkit-border-radius: 30px;
    border-radius: 30px;
    height: 25px;
    width: 25px;
    position: absolute;
    left: -12px;
    top: -11px;
    animation: pulsate 2s ease-out;
    -webkit-animation: pulsate 2s ease-out;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    opacity: 0;
  }
</style>
