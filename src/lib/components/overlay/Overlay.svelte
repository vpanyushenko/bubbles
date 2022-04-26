<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { fade } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/env";

  /**
   * @type {Boolean} [solid=false] - If you want the overlay to have a solid background. Defaults to a darkened, transparent background.
   */
  export let solid = false;

  /**
   * @type {Number} [transition_duration=0] - Time in milliseconds that it should take to transition into the overlay
   */
  export let transition_duration = 0;

  /**
   * @type {?() => void} [onclick=null] - a function to run when the overlay is clicked
   */
  export let onclick = null;

  /**
   * @type {String} [id=uuid()] - an ID that can be added to the overlay
   */
  export let id = uuid();

  /**
   * @type {String} [img=null] - An image to pass to use as a background for the overlay
   */
  export let img = null;

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
  {#if img}
    <img src={img} alt="background" />
  {/if}

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

  img {
    min-height: 100%;
    min-width: 1024px;
    width: 100%;
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -10;
  }
</style>
