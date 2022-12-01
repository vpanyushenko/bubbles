# Pagination

Used for reducing the amount of data shown in a Table. This component should be mounted in a `CardFooter` for best results.

Depending on your data source, you may have different options for the pagination. For example, if you have the total count of all documents you can show individual pages. However, if your database does not give you a total document count and you don't keep track yourself, you'll be better off using just a previous and next buttons.

The `Pagination` component relies on the `goto` function to trigger the svelte `load` function to rerun to fetch new data. Make sure you have set up the `configStore` correctly. See the [usage](/usage) section for more information.

<br>

---

<br>

## Props

<br>

**rows_per_page** `Array<Integer>` <code class="blue">[10, 25, 50, 100]</code><br>
This is an array of integers to be able to change the limit of how many options that pagination will request. You can change these by adding your own array or choose to not give users this options by passing in null or an empty array.

---

**limit** `number` <br>
The default limit that is used to determine the amount of documents the pagination will request. By default it will pick the first value from `rows_per_page` (which defaults to 10) but you can set this to whatever integer you would like.

---

**count** `number` <br>
The total number of documents in this set. By passing in count, Bubbles will add page numbers to the pagination for you.

---

**max_buttons** `number` <code class="blue">10</code> <br>
The maximum number of page buttons to include in the component. Does not include next and previous buttons. Defaults to 10. If all of the buttons cannot fit on the page, Bubbles will show only enough buttons to fill the viewport.

---

**arrows** `boolean` <code class="blue">true</code> <br>
If you want to include previous and next arrow buttons. Defaults to true.

---

**first_last_arrows** `boolean` <br>
Will add buttons on the left and right sides of the pagination to navigate to the first and last page. You need to add a count for this, otherwise Bubbles does not know what the last page is.

---

**has_more** `boolean` <br>
If you don't provide a `count`, you should provide a boolean value to share if there is another page in your navigation. If your API or database does not provide this data, you can query the database for the pagination limit + 1 to check if there are more documents, and then respond with just the pagination limit number of documents.

---

**page_query_name** `string` <code class="blue">page</code> <br>
Updates the name of the query parameter that gets added for the page query. The default name is "page"

---

**limit_query_name** `string` <code class="blue">limit</code> <br>
Updates the name of the query parameter that gets added for the limit query. The default name is "limit"
