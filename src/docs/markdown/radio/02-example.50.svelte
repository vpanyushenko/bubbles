<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import RadioGroup from "$lib/components/radio/RadioGroup.svelte";
</script>

<Card height100={true}>
  <CardHeader title="Radio Group" border={false} />

  <RadioGroup
    id="sandwich.type"
    value="burger"
    error="Please select an option"
    label="Choose sandwich"
    validation="required|string"
    desc="This is the longer description for the RadioGroup if you think it needs more explanation. You can add html elements like <a href='https://google.com' target='blank'>links</a>."
    background={false}
    options={[
      {
        label: "Burger",
        value: "burger",
      },
      {
        label: "Hot Dog",
        value: "hd",
      },
      {
        label: "Grilled Cheese",
        value: "gc",
      },
    ]}
  />
</Card>
