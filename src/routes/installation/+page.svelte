<script>
  import Rows from "$docs/components/Rows.svelte";
  import { formatPosts } from "$docs/utils/posts";
  const all_posts = import.meta.glob(`../../docs/markdown/installation/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
</script>

<Rows {rows} />
