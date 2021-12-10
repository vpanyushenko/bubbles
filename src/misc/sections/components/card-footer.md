---
component: card-footer
---

```svelte
<script>
    import {CardFooter, Pagination} from "bubbles-ui"

    const pagination = {
        limit: 10,
        count: 1000,
        max_buttons: 10,
        first_last_arrows: true,
        page_query_name: "page_query_1",
        limit_query_name: "limit_query_1"
    }
</script>

<!-- Pass pagination as a prop -->
<CardFooter pagination={...pagination}>

<!-- Or add the component as a slot -->
<CardFooter>
    <Pagination
        limit={10}
        count={1000}
        max_buttons={10}
        first_last_arrows={true}
        page_query_name="page_query_1"
        limit_query_name="limit_query_1"
    />
<CardFooter>

```
