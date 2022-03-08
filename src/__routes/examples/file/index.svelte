<script context="module">
  export const prerender = true;
</script>

<script>
  import Section from "$misc/components/section.svelte";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Header from "$lib/components/header/Header.svelte";

  import Form from "$lib/components/form/FileForm.svelte";

  const file = {
    extensions: [".csv", ".png", ".jpg", ".jpeg", ".svg"],
  };
</script>

<Header title="Form" breadcrumbs={false} />

<Row>
  <Column>
    <Card>
      <CardHeader title="Demo" border={false} />
      <div>
        <Form {...file} />
      </div>
    </Card>
  </Column>
</Row>
