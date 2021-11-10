<script>
  import ModalHeader from "./ModalHeader.svelte";
  import ModalFooter from "./ModalFooter.svelte";
  import { fly, fade } from "svelte/transition";
  import { modalStore } from "$lib/stores/modal.store";
  import Form from "$lib/components/form/Form.svelte";

  function hideModal() {
    $modalStore = {};
  }

  function keydown(event) {
    if (event.key === "Escape" && $modalStore.active) {
      hideModal();
    }
  }

  console.log($modalStore);
</script>

<svelte:window on:keydown={keydown} />

{#if $modalStore.active}
  <div class="overlay" tabindex="-1" on:click|stopPropagation={hideModal} transition:fade={{ duration: 400 }}>
    <div class="modal">
      <div class="container" transition:fly={{ y: 200, duration: 400 }} on:click|stopPropagation>
        <ModalHeader />

        <main>
          {#if $modalStore.message}
            <p>{$modalStore.message}</p>
          {/if}

          {#if $modalStore.form}
            <Form inputs={$modalStore.form} />
          {/if}
        </main>

        <ModalFooter buttons={$modalStore.footer} />
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
  }

  .container {
    max-width: 500px;
    min-width: 350px;
    max-height: 80vh;
    min-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 0.625rem 2rem 0.625rem;
    border-radius: 1.5rem;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  main {
    color: var(--gray);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    padding-top: 12px;
    padding-bottom: 2.5rem;
    flex: 1 0 auto;
  }

  footer {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    text-align: end;
    flex-shrink: 0;
  }

  /**************************\
    Demo Animation Style
  \**************************/
  @keyframes mmfadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes mmfadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes mmslideIn {
    from {
      transform: translateY(15%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes mmslideOut {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(15%);
    }
  }

  @media only screen and (max-width: 1179px) {
    .container {
      max-width: 500px;
      min-width: 350px;
      width: 60%;
    }
  }

  @media only screen and (max-width: 767px) {
    .container {
      width: 100%;
      min-height: 50vh !important;
      max-height: 100vh;
    }
  }
</style>
