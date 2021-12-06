<script context="module">
  import { importMarkdownChangelog } from "$misc/read-markdown";

  export const prerender = true;

  export async function load({ page, fetch, session, stuff }) {
    const articles = importMarkdownChangelog();

    articles.metadata.reverse();
    articles.markdown.reverse();

    return {
      props: {
        articles: articles,
      },
    };
  }
</script>

<script>
  import Row from "$lib/layouts/Row.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
  export let articles;


</script>

<Header title="Header Test" buttons={[{ icon: "more", href: "/changelog", transparent: false }]} />

<Row>
  <Column100>
    {#each articles.metadata as metadata, index}
      <Card>
        <CardHeader title={metadata.title} />
        <div>
          <svelte:component this={articles.markdown[index]} />
        </div>
      </Card>
    {/each}
  </Column100>
</Row>

<style>
  div {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
