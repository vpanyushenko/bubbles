<script context="module">
  export const prerender = true;
</script>

<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  import { fuzzySearch } from "$lib/index";
  import sections from "$assets/utils/sidebar-sections";
  const all_posts = import.meta.globEager(`../assets/markdown/fuzzy-search/**/*`);
  const rows = formatPosts(all_posts);
</script>

<Header
  title="Fuzzy Search"
  buttons={[
    {
      icon: "search",
      color: "gray-lighter",
      search: true,
      typeahead: (input) => {
        const filtered = fuzzySearch(input, sections, { keys: ["id"], sort: true });

        return Promise.resolve(
          filtered.map((obj) => {
            return { label: obj.label, value: obj.id, href: `/${obj.id}`, new_page: false };
          })
        );
      },
    },
  ]}
/>

<Rows {rows} />
