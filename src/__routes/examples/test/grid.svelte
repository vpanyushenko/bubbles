<script>
  import Card from "$lib/components/card/Card.svelte";

  export let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const img = "../../favicon.png";

  let max_columns = 6;
  let min_columns = 3;

  const min_breakpoint = 767;
  const max_breakpoint = 1420;
  const steps = max_columns - min_columns;
  const step_value = (max_breakpoint - min_breakpoint) / steps;

  let grid_columns = "";

  let pageWidth;
  let scale;

  $: if (pageWidth <= 767) {
    calculateGrid(min_columns);
  } else if (pageWidth >= 1420) {
    calculateGrid(max_columns);
  } else {
    //calc step required
    let done = false;
    let columns = min_columns;

    for (let i = 1; i <= steps; i++) {
      if (i * step_value >= pageWidth - min_breakpoint && !done) {
        done = true;
        columns = min_columns + i;
      }
    }

    calculateGrid(columns);
  }

  function calculateGrid(int) {
    grid_columns = "";
    for (let i = 1; i <= int; i++) {
      grid_columns += "1fr ";
    }
  }
</script>

<svelte:window bind:innerWidth={pageWidth} />

<div style="grid-template-columns: {grid_columns};">
  {#each array as num}
    <span>
      <Card py={0} px={0} height100={true}>
        <div class="test">
          <!-- <img src={img} alt="test" width="100" height="100" /> -->
          <img src={img} alt="test" height="100" />
        </div>
      </Card>
      <p>Testing</p>
    </span>
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-row-gap: 2px;
    grid-column-gap: 2px;
    transition: all 1s ease;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 0.1s ease;
    transition: transform 0.4s;
    width: 100%;
  }

  span:hover {
    transform: scale(1.1);
  }

  .test {
    display: flex;
    justify-content: center;
  }
</style>
