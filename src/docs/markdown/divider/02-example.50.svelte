<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Divider from "$lib/components/divider/Divider.svelte";
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <div class="d-flex">
    <Divider label="TEXT IN THE MIDDLE" tag={{ label: "Chip" }} />
  </div>
</Card>
