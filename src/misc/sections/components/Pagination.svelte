<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./pagination.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Pagination from "$lib/components/pagination/Pagination.svelte";
</script>

<Section id="pagination" title="Pagination">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Used for reducing the amount of data shown in a <code>Table</code>. This component should be mounted in a
          <code>CardFooter</code> for best results.
        </p>

        <p>
          Depending on your data source, you may have different options for the pagination. For example, if you have the
          total count of all documents you can show individual pages. However, if your database does not give you a
          total document count and you don't keep track yourself, you'll be better off using just a previous and next
          buttons.
        </p>

        <p>
          <strong
            >The <code>Pagination</code> component relies on the <code>goto</code> function to trigger the svelte
            <code>load</code>
            function to rerun to fetch new data. Make sure you have set up the <code>configStore</code> correctly. See
            the <a href="#usage">usage section</a> for more information.</strong
          >
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />

          <TableRow>
            <TableCell><span style="font-weight: 700">rows_per_page</span></TableCell>
            <TableCell
              >This is an array of integers to be able to change the limit of how many options that pagination will
              request. The default values are 10, 25, 50, and 100. You can change these by adding your own array or
              choose to not give users this options by passing in <code>null</code> or an empty array</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">limit</span></TableCell>
            <TableCell
              >The default limit that is used to determine the amount of document the pagination will request. By
              default it will pick the first value from <code>rows_per_page</code> but you can set this to whatever integer
              you would like.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">count</span></TableCell>
            <TableCell
              >The total number of documents in this set. By passing in count, Bubbles will add page numbers to the
              pagination for you.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">max_buttons</span></TableCell>
            <TableCell
              >The maximum number of page buttons to include on the page. Does not include next and previous buttons.
              Defaults to 10.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">arrows</span></TableCell>
            <TableCell>If you want to include previous and next arrow buttons. Defaults to true.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">first_last_arrows</span></TableCell>
            <TableCell
              >Will add buttons on the left and right sides of the pagination to navigate to the first and last page.
              You need to add a count for this, otherwise Bubbles does not know what the last page is.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">has_more</span></TableCell>
            <TableCell
              >If you don't provide a <code>count</code>, you should provide a boolean value to share if there is
              another page in your navigation. If your API or database does not provide this data, you can query the
              database for the pagination limit + 1 to check if there are more documents, and then respond with just the
              pagination limit number of documents.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">page_query_name</span></TableCell>
            <TableCell
              >Updates the name of the query parameter that gets added for the page query. The default name is "page"
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">limit_query_name</span></TableCell>
            <TableCell
              >Updates the name of the query parameter that gets added for the limit query. The default name is "limit"
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard1 />
      </Card>
    </Column>
    <Column>
      <Card>
        <CardHeader title="Pagination Options" border={false} />
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
      </Card>
    </Column>
  </Row>
</Section>

<style>
  div {
    margin-bottom: 2rem;
  }
</style>
