<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Switch from "$lib/components/switch/Switch.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <Switch
    value={true}
    onclick={(event) => {
      const value = event.currentTarget.value;

      document.getElementById("switch-example").textContent = value;
    }}
  />
  <div>
    The value of the switch is now:
    <span id="switch-example" />
  </div>
</Card>
