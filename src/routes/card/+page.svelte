<script>
  import Rows from "$docs/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$docs/utils/posts";
  const all_posts = import.meta.glob(`../../assets/markdown/card/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
</script>

<Header title="Card" />

<Rows {rows} />
