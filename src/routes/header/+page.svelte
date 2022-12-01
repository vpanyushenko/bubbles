<script>
  import Rows from "$docs/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$docs/utils/posts";
  import { fuzzySearch, pageStore } from "$lib/index";
  import sections from "$docs/utils/sidebar-sections";
  const all_posts = import.meta.glob(`../../docs/markdown/header/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
</script>

<Rows {rows} />
