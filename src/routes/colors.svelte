<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  const all_posts = import.meta.globEager(`../assets/markdown/colors/**/*`);
  const rows = formatPosts(all_posts);
</script>

<Header title="Colors" />

<Rows {rows} />
