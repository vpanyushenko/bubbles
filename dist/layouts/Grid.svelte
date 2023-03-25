<script>
  export let max_columns = 6;
  export let min_columns = 3;
  export let row_gap = 2;
  export let column_gap = 2;
  export let style = "";
  export let ignore_root_styles = false;

  const min_breakpoint = 767;
  const max_breakpoint = 1420;
  const steps = max_columns - min_columns;
  const step_value = (max_breakpoint - min_breakpoint) / steps;

  let current_step = min_columns;
  let changed = false;

  let grid_columns = "";

  let pageWidth;

  $: if (pageWidth <= 767) {
    calculateGrid(min_columns);
    current_step = min_columns;
  } else if (pageWidth >= 1420) {
    calculateGrid(max_columns);
    current_step = max_columns;
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

    if (current_step !== columns) {
      changed = true;
    }

    calculateGrid(columns);
    current_step = columns;
  }

  function calculateGrid(int) {
    grid_columns = "";
    for (let i = 1; i <= int; i++) {
      grid_columns += "1fr ";
    }

    pageChanged(int);
  }

  function pageChanged(int) {
    if (current_step !== int) {
      changed = true;

      setTimeout(() => {
        changed = false;
      }, 400);
    }
  }
</script>

<svelte:window bind:innerWidth={pageWidth} />

{#if pageWidth}
  <div
    class:page__grid={!ignore_root_styles}
    style="grid-template-columns: {grid_columns}; grid-row-gap: {row_gap}rem; grid-column-gap: {column_gap}rem; {style}"
  >
    <slot />
  </div>
{/if}

<style>
  div {
    display: grid;
    transition: all 1s ease;
    justify-content: space-between;
  }</style>
