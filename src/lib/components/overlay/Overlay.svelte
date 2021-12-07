<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { fade } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/env";

  export let solid = false;
  export let transition_duration = 0;
  export let onclick = null;
  export let id = uuid();

  onMount(() => {
    if (browser) {
      document.body.classList.add("noscroll");
    }
  });

  onDestroy(() => {
    if (browser) {
      document.body.classList.remove("noscroll");
    }
  });
</script>

<div class="overlay" class:solid on:click={onclick} transition:fade={{ duration: transition_duration }} {id}>
  <section class="overlay__content">
    <slot />
  </section>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9998;
    overflow: hidden;
  }

  .overlay__content {
    z-index: 9999;
  }

  .solid {
    background: var(--white);
  }
</style>
