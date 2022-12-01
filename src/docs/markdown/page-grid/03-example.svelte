<script>
  import Row from "$lib/layouts/Row.svelte";
  import Grid from "$lib/layouts/Grid.svelte";
  import GridItem from "$lib/layouts/GridItem.svelte";

  import img from "$docs/icons/app.png";
</script>

<!-- svelte-ignore component-name-lowercase -->
<div />
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

<style>
  img {
    filter: drop-shadow(0 0 1rem rgb(0 0 0 / 0.2));
    transition: all 0.4s ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  div {
    margin-top: 2rem;
  }
</style>
