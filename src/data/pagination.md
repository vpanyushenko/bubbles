---
component: pagination
---

```svelte
import {Pagination} from "bubbles-ui";

<div style="margin-bottom: 2rem;">
  <Pagination
    limit={10}
    count={1000}
    max_buttons={10}
    first_last_arrows={true}
    page_query_name="page_query_1"
    limit_query_name="limit_query_1"
  />
</div>
<div style="margin-bottom: 2rem;">
  <Pagination
    rows_per_page={[5, 500]}
    limit={5}
    count={1000}
    max_buttons={10}
    page_query_name="page_query_2"
    limit_query_name="limit_query_2"
  />
</div>
<div style="margin-bottom: 2rem;">
  <Pagination
    rows_per_page={null}
    limit={5}
    count={null}
    has_more={true}
    page_query_name="page_query_3"
    limit_query_name="limit_query_3"
  />
</div>
```
