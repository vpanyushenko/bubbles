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
          Bubbles is an opinionated component library build for <strong>Svelte Kit</strong>. It's has a specific
          structure and style that it follows. If the overall structure of it's layouts and components don't fit your
          needs, you're most likely better of using a more flexible component framework like Material UI, Tailwind, or
          writing your own.
        </p>
        <p>
          Bubbles is mostly set up to construct dashboards NOT landing pages and marketing sites. It has lots of
          dashboard specific components like <code>Sidebars</code> and <code>Tables</code> that are usually overkill and/or
          are too restrictive for marketing sites.
        </p>
      </Card>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Performance" border={false} />
        <p>
          Bubbles is build specifically for Svelte Kit. This means that it installs as a dev dependency and will not
          include any components you don't use after your build step.
        </p>
        <p>
          This one-page knowledgebase currently imports all of the components into one page - something that is not
          realistic of the real world. These docs could have some minor performances issues while you're using them
          (specifically when you're resizing the window).
        </p>
      </Card>
    </Column>
  </Row>
</Section>
