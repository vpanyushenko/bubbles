<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Overlay from "$lib/components/overlay/Overlay.svelte";
  import Spinner from "$lib/components/spinner/Spinner.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import Center from "$lib/layouts/Center.svelte";

  let overlayToggle = false;
</script>

<Card height100={true}>
  <CardHeader title="Overlay Demo" border={false} />

  {#if overlayToggle}
    <Overlay background="gradient" transition_duration={500} onclick={() => (overlayToggle = false)}>
      <Card>
        <div>
          <Center height100={false}>
            <Spinner size={5} color="primary" />
            <p>Loading Your Data (Click anywhere to close the overlay)</p>
          </Center>
        </div>
      </Card>
    </Overlay>
  {/if}

  <Button
    label="Show Overlay"
    wide={true}
    mb={true}
    onclick={() => {
      overlayToggle = true;
    }}
  />
</Card>

<style>
  div {
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
