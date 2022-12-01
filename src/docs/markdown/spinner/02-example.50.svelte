<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Spinner from "$lib/components/spinner/Spinner.svelte";
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <div>
    <Spinner />
    <Spinner size={2} color="primary" />
    <Spinner size={3} color="error" />
    <Spinner size={4} color="success" />
    <Spinner size={5} color="info" />
  </div>
</Card>
