<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  const all_posts = import.meta.globEager(`../assets/markdown/errors/**/*`);
  const rows = formatPosts(all_posts);
</script>

<Header title="Errors" />

<Rows {rows} />
