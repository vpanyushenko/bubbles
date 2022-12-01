<script>
  import Card from "$lib/components/card/Card.svelte";
</script>

<Card>
  <p class="d-flex">This is a basic card with just text inside. You can slot whatever content you want inside</p>
</Card>

<Card border={true} shadow={false}>
  <p class="d-flex">This is a card with a border and no shadow</p>
</Card>

<Card border={true} shadow={false} color={"primary"}>
  <p class="d-flex" style="color: white">This is a card with a color property of primary and no border.</p>
</Card>

<style>
  p {
    margin-top: 1rem;
  }
</style>
