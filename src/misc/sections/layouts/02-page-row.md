---
component: page-rows
---

```svelte
<script>
// Inside of your page file.

// Import the rows
import { Row, RowBorder } from "bubbles-ui";

// Import Columns
import { Column100, Column50, Column } from "bubbles-ui";
</script>

<Row>
    <Column100>
        Full width content here
    <Column100>
</Row>

<Row>
    <Column50>
        First half width column
    <Column50>
     <Column50>
        Second half width column
    <Column50>
</Row>

<RowBorder>
    <Column>
        This column will be 66% width
    <Column>
     <Column>
         This column will be 33% width
    <Column>
</RowBorder>
```
