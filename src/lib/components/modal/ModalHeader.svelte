<script>
  import { pageStore, uuid, IconButton, modalStore } from "$lib/index";

  export let title = "";
  export let caption = "";
  export let buttons = [];
  export let hideModal = () => ($modalStore = {});

  const id = `modal_header_${uuid()}`;
</script>

<div class="header" {id} class:justify-end={$pageStore.search === id}>
  <div class="flex">
    {#if title || caption}
      <div class="title" class:searching={$pageStore.search === id}>
        {#if title}
          <h6>{title}</h6>
        {/if}
        {#if caption && $pageStore.search !== id}
          <p>{@html caption}</p>
        {/if}
      </div>
    {:else}
      <slot />
    {/if}

    <div class="buttons">
      {#each buttons as button}
        <div class="action">
          <IconButton {...button} />
        </div>
      {/each}
      <IconButton icon="close" onclick={hideModal} />
    </div>
  </div>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    /* padding-top: 1.5rem; */
    padding-bottom: 1.5rem;
    color: var(--dark);
  }

  /* .px {
    padding-left: 2rem;
    padding-right: 2rem;
  } */

  .title {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    align-self: center;
    min-height: 3rem;
    justify-content: center;
  }

  .buttons {
    display: flex;
    max-width: 100%;
    justify-content: flex-end;
    flex-grow: 1;
    align-self: flex-start;
  }

  .header p {
    color: var(--gray);
    margin-bottom: 0px;
    margin-top: 0px;
  }

  .flex {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .justify-end {
    justify-content: end;
  }

  h6 + p {
    margin-top: 0.5rem;
  }

  @media only screen and (max-width: 767px) {
    .header {
      padding-top: 1.25rem;
    }
  }
</style>
