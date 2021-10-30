<script>
  import { fly, fade } from "svelte/transition";
  import { modalStore } from "$lib/stores/modal.store";
  import CircleButton from "$lib/components/inputs/circle-button/CircleButton.svelte";
  import Button from "$lib/components/inputs/Button.svelte";
  import Input from "$lib/components/inputs/Input.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import Select from "$lib/components/inputs/Select.svelte";
  import Switch from "$lib/components/inputs/switch/LabledSwitch.svelte";

  export let id = "";
  export let title = "";

  title = $modalStore.title;

  function hideModal() {
    $modalStore = {};
  }

  function keydown(event) {
    if (event.key === "Escape" && $modalStore.active) {
      hideModal();
    }
  }
</script>

<svelte:window on:keydown={keydown} />

{#if $modalStore.active}
  <div class="modal" {id}>
    <div class="overlay" tabindex="-1" on:click|stopPropagation={hideModal} transition:fade={{ duration: 400 }}>
      <div class="container" transition:fly={{ y: 200, duration: 400 }} on:click|stopPropagation>
        <header>
          <h6 class="title">{$modalStore.title}</h6>
          <CircleButton icon="close" onclick={hideModal} />
        </header>

        <main class="form">
          {#each $modalStore.inputs as input}
            {#if input.type === "text" || input.type === "email" || input.type === "password" || input.type === "date"}
              <Input {...input} bind:value={input.value} />
            {/if}

            {#if input.type === "switch"}
              <Switch {...input} bind:value={input.value} />
            {/if}

            {#if input.type === "select"}
              <Select {...input} bind:value={input.value} />
            {/if}

            {#if input.type === "info"}
              <p>{input.text}</p>
            {/if}

            {#if input === "break"}
              <Divider />
            {/if}
          {/each}
        </main>
        <footer>
          {#each $modalStore.inputs as input}
            {#if input.type === "button"}
              <Button {...input} />
            {/if}
          {/each}
        </footer>
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
    width: 40%;
    max-height: 80vh;
    min-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    padding: 10px 32px 10px;
    border-radius: 24px;
    background: #fff;
    display: flex;
    flex-direction: column;
  }

  .container.small {
    max-width: 400px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    padding-bottom: 24px;
    font-size: 13px;
    line-height: 1.38462;
    font-weight: 500;
    color: #b2b3bd;
  }

  .title {
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    line-height: 1.33333;
    color: var(--black);
  }

  main {
    color: #808191;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    padding-top: 12px;
    padding-bottom: 40px;
    flex: 1 0 auto;
  }

  footer {
    padding-top: 24px;
    padding-bottom: 24px;
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
      width: 100% !important;
      height: 100vh !important;
      max-height: 100vh;
    }
  }
</style>
