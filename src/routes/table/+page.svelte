<script>
  import Rows from "$docs/components/Rows.svelte";
  import { formatPosts } from "$docs/utils/posts";
  import store from "$docs/utils/store";

  const all_posts = import.meta.glob(`../../docs/markdown/table/**/*`, { eager: true });
  const rows = formatPosts(all_posts);

  export let data;

  $: $store.pokemon = data.pokemon;
  $: $store.pagination = data.pagination;
</script>

<Rows {rows} />
