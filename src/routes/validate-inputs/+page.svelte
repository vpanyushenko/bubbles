<script>
  import Rows from "$docs/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$docs/utils/posts";
  const all_posts = import.meta.glob(`../../docs/markdown/validate-inputs/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
</script>

<Header title="validateInputs" />

<Rows {rows} />
