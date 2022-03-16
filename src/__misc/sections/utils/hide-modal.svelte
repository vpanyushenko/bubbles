<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./modal.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
</script>

<Section id="hideModal" title="hideModal">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Because there can only be one <code>Modal</code> at a time, you can call the <code>hideModal</code> function from
          anywhere and it will hide the currently active modal.
        </p>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <CodeCard1 />
      </Card>
    </Column>
  </Row>
</Section>
