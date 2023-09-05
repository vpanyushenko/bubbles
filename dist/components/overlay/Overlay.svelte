<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { fade } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { gradient } from "../../utils/colors";

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

  /**
   * @type {?"solid"|"gradient"} [background=null] - Sets up the background
   */
  export let background = null;

  /**
   * @type {Array<String>} [colors=["#ef008f", "#6ec3f4", "#7038ff", "#ffba27"]] - Creates the gradient
   */
  export let colors = ["#ef008f", "#6ec3f4", "#7038ff", "#ffba27"];

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

  if (solid) {
    console.warn("[DEPRECATED]: The prop 'solid' for overlay is deprecated. Use background = 'solid' instead");
  }

  let gradient_id = "gradient-canvas";

  onMount(() => {
    const observer = gradient(colors, gradient_id);
  });
</script>

<div
  class="overlay"
  class:solid={solid === true || background === "solid" || background === "gradient"}
  on:click={onclick}
  transition:fade={{ duration: transition_duration }}
  {id}
>
  {#if img}
    <img src={img} alt="background" />
  {/if}

  {#if background === "gradient"}
    <div class="gradient__hero">
      <canvas id="gradient-canvas" data-js-darken-top data-transition-in />
    </div>
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
    -webkit-backface-visibility: hidden;
  }

  .overlay__content {
    z-index: 9999;
  }

  .solid {
    background: var(--gray-lightest);
  }

  .gradient__hero {
    position: absolute;
    left: 0;
    width: 100%;
    height: 250px;
    transform: skewY(-12deg);
    will-change: transform;
    z-index: 0;
    outline: 1px solid transparent;
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
    outline: 1px solid transparent;
    opacity: 1;
    position: relative;
    display: block;
    width: inherit;
    height: 100%;
    opacity: 1;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
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

  :global(html.dark) .solid {
    background: var(--theme-dark);
  }</style>
