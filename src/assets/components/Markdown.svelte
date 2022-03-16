<script>
  import Card from "$lib/components/card/Card.svelte";

  export let id = null;
  export let color = null;
  export let height100 = false;
</script>

<!-- <Card shadow={false} color="gray-lightest" py={2}> -->
<Card py={2} {color} {height100}>
  <div class="markdown" {id}>
    <slot />
  </div>
</Card>

<style>
  div {
    overflow-x: scroll;
  }
</style>
