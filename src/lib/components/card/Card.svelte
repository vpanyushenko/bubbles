<script>
  import { pageStore } from "$lib/stores/page.store";
  import CardHeader from "./CardHeader.svelte";
  import CardFooter from "./CardFooter.svelte";

  // import { scale, fade, fly } from "svelte/transition";
  // import { quintOut } from "svelte/easing";

  export let header = {};
  export let footer = {};
  export let py = 0.625;
  export let px = 2;
  export let color = "white";
  export let shadow = true;
  export let border = null;
  export let height100 = false;

  let y = `${py}rem`;
  let x = `${px}rem`;
  let background = null;

  if (color) {
    background = `var(--${color})`;
  }

  $: innerWidth = 0;
  $pageStore.is_mobile = innerWidth < 767 ? true : false;

  // in:fly={{ y: -50, duration: 250, delay: 300 }}
  // out:fly={{ y: -50, duration: 250 }}
</script>

<svelte:window bind:innerWidth />

<div
  class="card"
  class:shadow
  class:border
  class:height-100={height100}
  style="padding-top:{y};padding-bottom:{y};padding-left:{x};padding-right:{x};background:{background}"
>
  {#if header && Object.keys(header).length}
    <CardHeader {...header} />
  {/if}
  <div class="body" class:height-100={height100}>
    <slot />
  </div>

  {#if footer && Object.keys(footer).length}
    <CardFooter {...footer} />
  {/if}
</div>

<style>
  .card {
    position: relative;
    padding: 0.625rem 2rem 0.625rem;
    border-radius: 1.5rem;
    background: var(--white);
  }

  .shadow {
    -webkit-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    -moz-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
  }

  .border {
    border: 1px solid var(--gray-light);
  }

  .height-100 {
    height: 100%;
  }
</style>
