# Table

The `Table` is the main way to present data in Bubbles. Tables are created with individual components, meaning you'll import `TableRow` and `TableCell`.

The `Table` is made up of an optional `TableHeader`, where you can set the headings for rows. And `TableRow`, which itself is just an array of `TableCell` components.

If you're looking to add filters or pagination at the bottom of your table, you'll want to slot the `Table` into a `Card`, and add the `CardHeader` with filters and `CardFooter` with pagination.

<br>

---

<br>

## Props

<br>

**padding** `string` <code class="blue">roomy</code> <br>
"roomy" or "compact". Decides how much spacing is between each row.

---

**id** `string`<br>
You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there will be a unique id added to the component.
