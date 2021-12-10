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
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Who should and shouldn't use Bubbles" border={false} />
        <p>
          Bubbles is an opinionated component library build for Svelte. It's has a specific structure and style that it
          follows. If the overall structure of it's layouts and components don't fit your needs, you're most likely
          better of using a more flexible component framework like Material UI, Tailwind, or writing your own.
        </p>
        <p>
          Bubbles is mostly set up to construct dashboards NOT landing pages and marketing sites. It has not's of
          dashboard specific components like <code>Sidebars</code> and <code>Tables</code> that are usually overkill and/or
          are too restrictive for marketing sites.
        </p>
      </Card>
    </Column>
  </Row>
</Section>
