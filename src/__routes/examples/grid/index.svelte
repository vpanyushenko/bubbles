<script context="module">
  export const prerender = true;
</script>

<script>
  import Overlay from "$lib/components/overlay/Overlay.svelte";
  import PageWrapper from "$lib/layouts/PageWrapper.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import Row from "$lib/layouts/Row.svelte";
  import Center from "$lib/layouts/Center.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
  import Grid from "$lib/layouts/Grid.svelte";
  import GridItem from "$lib/layouts/GridItem.svelte";

  import img from "./app_icon.png";

  //TODO: Grid element inside of a GridItem Component
</script>

<Header title="Auth" breadcrumbs={false} />

<Overlay solid={true}>
  <PageWrapper>
    <Center>
      <Grid>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
        <GridItem>
          <img src={img} alt="logo" />
        </GridItem>
      </Grid>
    </Center>
  </PageWrapper>
</Overlay>

<style>
  img {
    filter: drop-shadow(0 0 1rem rgb(0 0 0 / 0.2));
  }
</style>
