<script>
  import { Card, CardHeader, Pulse } from "$lib/index";
</script>

<Card height100={true}>
  <CardHeader title="Pulse Options" border={false} />
  <div>
    <p>Default</p>
    <Pulse />
  </div>

  <div>
    <p>No animation</p>
    <Pulse animate={false} />
  </div>

  <div>
    <p>Colored</p>
    <Pulse color="error-lightest" />
  </div>
</Card>

<style>
  div {
    margin-bottom: 2rem;
  }
</style>
