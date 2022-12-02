<script>
  import Rows from "$docs/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$docs/utils/posts";
  const all_posts = import.meta.glob(`../../docs/markdown/page-column/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
  import { Row, Column100, Column50, Column, Card } from "$lib/index";
</script>

<Rows {rows} />

<Row>
  <Column100>
    <Card color="dark">
      <p>Column 100</p>
    </Card>
  </Column100>
</Row>

<Row>
  <Column>
    <Card color="primary">
      <p>Column 66</p>
    </Card>
  </Column>

  <Column>
    <Card color="primary">
      <p>Column 33</p>
    </Card>
  </Column>
</Row>

<Row mobile_reverse={false}>
  <Column50>
    <Card color="success">
      <p>Column 50</p>
    </Card>
  </Column50>

  <Column50>
    <Card color="success">
      <p>Column 50</p>
    </Card>
  </Column50>
</Row>

<!-- <Row>
  <Column50>
    <Card color="warning-dark">
      <p>Reversed On Mobile 1/2</p>
    </Card>
  </Column50>

  <Column50>
    <Card color="warning-light">
      <p>Reversed On Mobile 2/2</p>
    </Card>
  </Column50>
</Row> -->
<style>
  p {
    text-align: center;
    color: white;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
