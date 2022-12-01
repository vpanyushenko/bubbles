<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import LabeledSwitch from "$lib/components/switch/LabeledSwitch.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <LabeledSwitch
    label="Marketing Notifications"
    desc="We'll only send you notifications when something important happens."
    id="notifications.marketing"
    validation="boolean"
    value={true}
    onclick={(event) => {
      const value = event.currentTarget.value;
      const id = event.currentTarget.id;

      showLoading(id);

      setTimeout(() => {
        hideLoading(id);
      }, 2000);
    }}
  />
</Card>
