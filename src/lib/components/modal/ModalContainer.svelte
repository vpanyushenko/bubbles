<script>
  import { browser } from "$app/environment";
  import { v4 as uuid } from "@lukeed/uuid";
  import { fly } from "svelte/transition";
  import { modalStore, pageStore } from "$lib/utils/stores";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import { Gallery } from "$lib/index";

  const id = uuid();

  let style = "";

  function hideModal() {
    $modalStore = {};
  }

  async function keydown(event) {
    if (event.key === "Escape" && $modalStore.active && !$pageStore.focused_gallery_id) {
      hideModal();
    }
  }

  $: if ($modalStore.type === "side") {
    $modalStore.height = 100;
  }

  $: if ($modalStore.height) {
    style = `height: ${$modalStore.height}vh;max-height: none;`;
  } else {
    style = "max-height: 80vh";
  }

  $: if ($modalStore.form && $modalStore.form.length) {
    setTimeout(() => {
      if (document.getElementById(id)?.querySelector(".field__input")) {
        document.getElementById(id).querySelector(".field__input").focus();
      }
    }, 0);
  }

  $: if ($modalStore.active && browser) {
    document.body.classList.add("noscroll");
  } else if (browser) {
    document.body.classList.remove("noscroll");
  }
</script>

<svelte:window on:keydown={keydown} />

{#if $modalStore.active}
  <div class="overlay" tabindex="-1" on:click|stopPropagation={hideModal}>
    <div
      class="modal js-bubbles-modal"
      {id}
      class:side={$modalStore.type === "side"}
      transition:fly={$modalStore.type === "side" ? { x: 500, duration: 400 } : { y: 200, duration: 400 }}
    >
      <div class="container" {style} on:click|stopPropagation class:side={$modalStore.type === "side"}>
        <header>
          <h6 class="title">{$modalStore.title}</h6>
          <IconButton icon="close" onclick={hideModal} />
        </header>

        <main>
          {#if $modalStore.img}
            <div class="image__container">
              <img src={$modalStore.img} alt="Modal" />
            </div>
          {/if}

          {#if $modalStore.gallery}
            <div class="image__container">
              <Gallery {...$modalStore.gallery} />
            </div>
          {/if}

          {#if $modalStore.message}
            <p>{@html $modalStore.message}</p>
          {/if}

          {#if $modalStore.form}
            <Form inputs={$modalStore.form} />
          {/if}
        </main>

        {#if $modalStore.footer && $modalStore.footer.length > 0}
          <footer class="modal__footer">
            {#each $modalStore.footer as button}
              <Button {...button} wide={true} />
            {/each}
          </footer>
        {/if}
      </div>
    </div>
  </div>
{/if}

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
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
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
      border-radius: 1.5rem;
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
  }
</style>
