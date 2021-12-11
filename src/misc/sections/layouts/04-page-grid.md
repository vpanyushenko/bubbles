---
component: page-grid
---

```svelte
<script>
  import { Grid, GridItem } from "bubbles-ui";
  import img from "./app_icon.png";
</script>

<Grid max_columns={8} min_columns={3} row_gap={2} column_gap={2}>
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
</style>
```
