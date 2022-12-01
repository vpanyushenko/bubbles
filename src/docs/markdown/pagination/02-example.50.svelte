<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Pagination from "$lib/components/pagination/Pagination.svelte";
</script>

<Card height100={true}>
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

<style>
  div {
    margin-bottom: 2rem;
  }
</style>
