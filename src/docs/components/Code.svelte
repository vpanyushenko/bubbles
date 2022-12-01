<script>
  import Card from "$lib/components/card/Card.svelte";

  export let height100 = false;
  export let id = null;
</script>

<Card shadow={false} color="gray-lighter" py={0} px={0} {height100} {id}>
  <slot />
</Card>
