<script>
  import Section from "$misc/components/section.svelte";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
</script>

<Section>
  <Row>
    <Column>
      <Card color="error" shadow={false} border={true} py={1.5}>
        <p>
          Svelte Kit is in beta and there will be some API changes before they hit V1. Bubbles will not hit V1 until
          Svelte Kit does.
        </p>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Compatibility" border={false} />
        <ul>
          <li><code>@sveltejs/kit@1.0.0-next.208</code> supported by <code>bubbles-ui@0.4.x</code></li>
          <li><code>@sveltejs/kit@1.0.0-next.202</code> supported by <code>bubbles-ui@0.3.x</code></li>
        </ul>
      </Card>
    </Column>
  </Row>
</Section>

<style>
  p {
    color: var(--white);
    margin-bottom: 0;
    font-weight: bolder;
  }

  ul {
    margin-bottom: 1.5rem;
  }

  li {
    padding-bottom: 0.5rem;
  }
</style>
