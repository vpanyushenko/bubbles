---
component: pagination
---

```svelte
<script>
  import { Pagination } from "bubbles-ui";

  // Pagination relies on the svelte goto function
  // Make sure you have added the function to the configStore
  import { goto } from "app/navigation";

  import { configStore } from "bubbles-ui";
  $configStore.goto = goto;
</script>

<div>
  <Pagination
    limit={10}
    count={1000}
    max_buttons={10}
    first_last_arrows={true}
    page_query_name="page_query_1"
    limit_query_name="limit_query_1"
  />
</div>
<div>
  <Pagination
    rows_per_page={[5, 500]}
    limit={5}
    count={1000}
    max_buttons={10}
    page_query_name="page_query_2"
    limit_query_name="limit_query_2"
  />
</div>
<div>
  <Pagination
    rows_per_page={null}
    limit={5}
    count={null}
    has_more={true}
    page_query_name="page_query_3"
    limit_query_name="limit_query_3"
  />
</div>

<style>
  div {
    margin-bottom: 2rem;
  }
</style>
```
