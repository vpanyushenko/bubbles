<script>
  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";

  export let id;
  export let title;
</script>

<section {id}>
  {#if title}
    <Row>
      <Column>
        <h2>{title}</h2>
      </Column>
    </Row>
  {/if}
  <slot />
</section>

<style>
  section {
    margin-bottom: 3rem;
  }
</style>
