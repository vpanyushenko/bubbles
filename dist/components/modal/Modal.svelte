<script>
  import { browser } from "$app/environment";
  import { v4 as uuid } from "@lukeed/uuid";
  import { fly, fade } from "svelte/transition";
  import IconButton from "../button/IconButton.svelte";
  import { modalStore } from "../../utils/stores";
  import { onDestroy } from "svelte";

  export let title = "";
  export let hideModal = () => ($modalStore = {});
  export let id = uuid();
  export let height;
  export let lock_scroll = true;
  export let hide_on_overlay_click = true;
  export let type = "center";

  let style = "";

  function _hideModal() {
    lock_scroll = false;
    hideModal();
  }

  function keydown(event) {
    if (event.key === "Escape") _hideModal();
  }

  $: if (type === "side") {
    height = 100;
  }

  $: if (height) style = `height: ${height}vh;max-height: none;`;
  else style = "max-height: 80vh";

  $: if (lock_scroll && browser) document.body.classList.add("noscroll");
  else if (browser) document.body.classList.remove("noscroll");

  onDestroy(() => document.body.classList.remove("noscroll"));
</script>

<svelte:window on:keydown={keydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="overlay"
  tabindex="-1"
  on:click|stopPropagation={() => {
    if (hide_on_overlay_click) {
      _hideModal();
    }
  }}
  transition:fade={{ duration: 400 }}
>
  <div class="modal js-bubbles-modal" {id} class:side={type === "side"}>
    <div
      class="container"
      {style}
      transition:fly={type === "side" ? { x: 500, duration: 400 } : { y: 200, duration: 400 }}
      on:click|stopPropagation
      class:side={type === "side"}
    >
      {#if title}
        <header>
          <h6 class="title">{title}</h6>
          <IconButton icon="close" onclick={_hideModal} />
        </header>
      {/if}

      <main>
        <slot />
      </main>

      <!-- <footer class="modal__footer">
        <slot name="footer" />
      </footer> -->
    </div>
  </div>
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
  }

  .modal {
    z-index: 9999;
    overflow-y: auto;
  }

  .modal.side {
    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;
  }

  .container {
    width: 31rem;
    max-height: 80vh;
    /* min-height: 50vh; */
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 0.625rem 2rem 0.625rem;
    border-radius: 1.5rem;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .container.side {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .model.side .container {
    height: 100vh;
    max-height: 100vh;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 13px;
    line-height: 1.38462;
    font-weight: 500;
    color: #b2b3bd;
    flex-shrink: 0;
  }

  .title {
    font-family: "Poppins", sans-serif;
    font-size: 1.125rem;
    line-height: 1.33333;
    color: var(--black);
  }

  main {
    color: var(--gray);
    transition: color 0.25s;
    padding-top: 12px;
    padding-bottom: 2.5rem;
    flex: 1;
    overflow: scroll;
  }

  .image__container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  main img {
    max-width: 50%;
    justify-content: center;
  }

  p {
    margin-bottom: 1.5rem;
  }

  footer {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    text-align: end;
    flex-shrink: 0;
  }

  :global(.modal__footer button + button) {
    margin-top: 1rem;
  }

  @media only screen and (max-width: 767px) {
    .modal {
      width: 100%;
      position: absolute;
      bottom: 0px;
    }
    .container {
      width: 100%;
      min-height: 50vh !important;
      max-height: 100vh;
    }
  }

  :global(html.dark) .container {
    background: var(--theme-dark);
  }

  :global(html.dark) .modal header,
  :global(html.dark) .modal main,
  :global(html.dark) .modal .title {
    color: var(--gray-lightest);
  }</style>
