<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Checkbox from "$lib/components/checkbox/Checkbox.svelte";
  import LabeledCheckbox from "$lib/components/checkbox/LabeledCheckbox.svelte";
  import CheckboxGroup from "$lib/components/checkbox/CheckboxGroup.svelte";
</script>

<Card height100={true}>
  <CardHeader title="Checkbox Demo" border={false} />
  <div>
    <Checkbox
      value={true}
      onchange={() => {
        alert("Value Changed");
      }}
    />
  </div>
</Card>
