<script>
  import Section from "src/__misc/components/section.svelte";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
</script>

<Section id="installation" title="Installation">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Download from NPM" border={false} />
        <p>
          Install Bubbles into your project using <code>npm install --save-dev bubbles-ui</code>. When you're doing your
          final build, any components that you are not using will not be included in your bundle.
        </p>
      </Card>
    </Column>
  </Row>
</Section>
