<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./05-errors.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
</script>

<Section id="errors" title="Errors">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Svelte Errors" border={false} />
        <p>
          To handle errors in Svelte, the <code>load</code> function at the top of each page can return an error
          <code>status</code> code (4xx and 5xx) and an <code>error</code> Object to describe the error. That will be
          passed to a page called <code>__error.svelte</code> which will display the error.
        </p>
        <p>
          Bubbles makes styling the page easy by exporting a component called <code>Error</code> which will style the
          error page for you. Import it in your <code>__error</code> page and pass in the props from your load function.
        </p>
      </Card>

      <Card color="dark" px={0} py={0}>
        <CodeCard1 />
      </Card>
    </Column>
  </Row>
</Section>
