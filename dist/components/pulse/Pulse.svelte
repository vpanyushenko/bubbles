<script>
  import { pageStore, configStore } from "../../utils/stores";

  /** @type {Boolean} animate - If the pulse should show the animation*/
  export let animate = true;
  export let color = "__default";
  export let dark_mode_invert = $configStore?.dark_mode_invert;

  if (color === "__default") {
    color = "primary";
  }

  $: if ($pageStore.dark_mode && dark_mode_invert === true) {
    const split = color.split("-");
    if (split.length > 1 && split[1].startsWith("light")) {
      split[1] = split[1].replace("light", "dark");
      color = split.join("-");
    }
  } else if (dark_mode_invert === true) {
    const split = color.split("-");
    if (split.length > 1 && split[1].startsWith("dark")) {
      split[1] = split[1].replace("dark", "light");
      color = split.join("-");
    }
  }
</script>

<!-- <div class="timeline">
  <div class="component__container"> -->
<div class="container">
  <div class="dot" style="background-color: var(--{color});" />
  {#if animate}
    <div class="pulse" style="border: 3px solid var(--{color});" />
  {/if}
</div>

<!-- </div>
</div> -->
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

  /* .component__container {
    margin: 0;
    list-style: none;
    position: relative;
  }
  .component__container:before {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    border-left: 2px dashed var(--gray-light);
  }

  :global(.timeline.component__container .container) {
    position: relative;
    margin-left: 30px;
    border: 1px solid var(--gray-light);
    border-radius: 16px;
    font-weight: 600;
  }

  :global(html.dark) :global(.timeline.component__container .container) {
    border: 2px solid var(--dark);
  }

  :global(html.dark) .component__container:before {
    border-left: 2px dashed var(--gray);
  } */

  .component__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    position: relative;
  }

  .dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .pulse {
    position: absolute;
    border-radius: 10rem;
    height: 2rem;
    width: 2rem;
    left: -0.5rem;
    top: -0.5rem;
    animation: pulsate 2s ease-out;
    -webkit-animation: pulsate 2s ease-out;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }</style>
