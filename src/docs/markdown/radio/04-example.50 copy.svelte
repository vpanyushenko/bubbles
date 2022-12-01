<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import RadioGroup from "$lib/components/radio/RadioGroup.svelte";
  import Row from "$lib/layouts/Row.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
</script>

<Row>
  <Column100>
    <Card height100={true}>
      <CardHeader title="Radio Group Segment Style" border={false} />

      <RadioGroup
        style="segments"
        id="permissions"
        label="User Permissions"
        desc="Select permissions for an API Key"
        background={false}
        options={[
          {
            label: "None",
            value: null,
          },
          {
            label: "Read",
            value: "read",
          },
          {
            label: "Write",
            value: "write",
          },
        ]}
      />

      <RadioGroup
        style="segments"
        id="permissions"
        label="API Key Permissions"
        desc="Select permissions for an API Key"
        background={false}
        options={[
          {
            label: "None",
            value: null,
          },
          {
            label: "Read",
            value: "read",
          },
          {
            label: "Write",
            value: "write",
          },
        ]}
      />
    </Card>
  </Column100>
</Row>
