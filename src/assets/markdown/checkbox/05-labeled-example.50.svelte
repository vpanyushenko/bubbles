<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import LabeledCheckbox from "$lib/components/checkbox/LabeledCheckbox.svelte";

  const labeledCheckbox = {
    id: "tos",
    value: null,
    label: "Terms of Service",
    desc: `You can view more details about our terms of service and privacy policy <a href="https://google.com">at this link</a>.`,
    error: "You have not accepted the terms of service.",
    validation: "required|boolean",
  };
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <LabeledCheckbox {...labeledCheckbox} />
</Card>
