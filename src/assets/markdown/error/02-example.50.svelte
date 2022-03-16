<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Button from "$lib/components/button/Button.svelte";
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <div class="d-flex">
    <Button label="Trigger Error" href="/error-example" color="error-light" />
  </div>
</Card>
