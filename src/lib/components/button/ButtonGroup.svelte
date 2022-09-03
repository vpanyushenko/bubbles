<script>
  import Button from "./Button.svelte";

  /**@type {Boolean} [mt=false] - If you want to add margin to the top of this button */
  export let mt = false;
  /**@type {Boolean} [mb=false] - If you want to add margin to the button of this button */
  export let mb = false;

  export let buttons = [];
</script>

<div class="button__group" class:mb class:mt>
  {#if Array.isArray(buttons) && buttons.length > 0}
    {#each buttons as button}
      <Button {...button} type="button" />
    {/each}
  {:else}
    <slot />
  {/if}
</div>

<style>
  .button__group {
    display: flex;
    align-items: center;
    width: 100%;
  }

  :global(.button__group > button + .icon__btn),
  :global(.button__group > .icon__btn + button),
  :global(.button__group > .icon__btn + .icon__btn),
  :global(.button__group > button + button) {
    margin-left: 1rem;
  }

  .mb {
    margin-bottom: 1rem;
  }

  .mt {
    margin-top: 1rem;
  }
</style>
