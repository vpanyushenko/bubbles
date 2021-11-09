<script>
  import Button from "$lib/components/button/Button.svelte";

  export let buttons = [];
</script>

<footer>
  {#each buttons as button}
    <Button {...button} />
  {/each}
</footer>

<style>
  footer {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    text-align: end;
    flex-shrink: 0;
  }
</style>
