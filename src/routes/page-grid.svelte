<script context="module">
  export const prerender = true;
</script>

<script>
  import Rows from "$assets/components/Rows.svelte";
  import { Header } from "bubbles-ui";
  import { formatPosts } from "$assets/utils/posts";
  const all_posts = import.meta.globEager(`../assets/markdown/page-grid/**/*`);
  console.log(all_posts);
  const rows = formatPosts(all_posts);
</script>

<Header title="Page Grid" />

<Rows {rows} />
