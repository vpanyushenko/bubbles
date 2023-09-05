<script>
  import SkeletonSVG from "./SkeletonSVG.svelte";

  /** @type {"default"|"header"} [component="default"] */
  export let component = "default";

  /** @type {number=} [rows=8] - the amount of these skeletons you want repeated */
  export let rows = 8;

  /** @type {number=} [offset=96] - the amount of pixels between each row */
  export let offset = 96;

  /** @type {string=} [height="default"] - the height for the component */
  export let height = "default";

  if (height === "default" && component === "default") height = "100vh";
  else if (height === "default" && component === "header") height = "100%";
</script>

{#if component === "header"}
  <header>
    <SkeletonSVG {height}>
      <rect width="64" height="64" x="0" y={0} rx="64" ry="64" />
      <rect width="60%" height="40" x="90" y={10} rx="10" ry="10" />
      <rect width="50%" height="10" x="90" y={10 + 60} rx="5" ry="5" />
    </SkeletonSVG>
  </header>
{:else}
  <SkeletonSVG {height}>
    {#each Array.from(Array(rows).keys()) as number}
      <rect width="96" height="72" x="0" y={0 + number * (offset || 0)} rx="12" ry="12" />
      <rect width="90%" height="10" x="108" y={19 + number * (offset || 0)} rx="5" ry="5" />
      <rect width="75%" height="10" x="108" y={43 + number * (offset || 0)} rx="5" ry="5" />
    {/each}
  </SkeletonSVG>
{/if}

<style>
  header {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 3rem 4rem 2.75rem;
    padding-bottom: 0rem;
  }
</style>
