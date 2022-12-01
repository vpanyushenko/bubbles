<script>
  import Rows from "$docs/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$docs/utils/posts";
  import { fuzzySearch, pageStore } from "$lib/index";
  import sections from "$docs/utils/sidebar-sections";
  const all_posts = import.meta.glob(`../../assets/markdown/header/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
</script>

<Header
  title="Header"
  breadcrumbs={[
    { label: "Hello", href: "/header" },
    { label: "World", href: "/header" },
  ]}
  buttons={[
    {
      id: "search-id-example",
      icon: "search",
      color: "gray-lighter",
      search: true,
      onselect: (value) => {
        console.log(value);
      },
      typeahead: (input) => {
        const filtered = fuzzySearch(input, sections, { keys: ["id"], sort: true });

        return Promise.resolve(
          filtered.map((obj) => {
            return { label: obj.label, value: obj.id };
          })
        );
      },
    },
  ]}
/>

<Rows {rows} />
