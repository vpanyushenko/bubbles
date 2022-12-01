<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  import store from "$assets/utils/store";
  const all_posts = import.meta.glob(`../../assets/markdown/table/**/*`, { eager: true });
  const rows = formatPosts(all_posts);

  export let data;

  $store.pokemon = data.pokemon;
  $store.pagination = data.pagination;

  $: console.log("COUNT:" + $store.pokemon.length);
</script>

<Header title="Table" />

<Rows {rows} />
