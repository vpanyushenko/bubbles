<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  const all_posts = import.meta.glob(`../../assets/markdown/icon-button/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
  import { fuzzySearch } from "$lib/index";
  import sections from "$assets/utils/sidebar-sections";
</script>

<Header
  title="Icon Button"
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
    {
      icon: "more",
      color: "gray-lighter",
      options: [
        {
          label: "Option 1",
          caption: "This is an option caption",
        },
        {
          label: "Option 2",
          caption: "This is an example with onclick",
        },
      ],
    },
  ]}
/>

<Rows {rows} />
