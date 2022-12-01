<script>
  import Rows from "$docs/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$docs/utils/posts";
  import store from "$docs/utils/store";
  const all_posts = import.meta.glob(`../../assets/markdown/sidebar/**/*`, { eager: true });
  const rows = formatPosts(all_posts);
</script>

<Header
  title="Sidebar"
  buttons={[
    {
      icon: "more",
      color: "gray-lighter",
      options: [
        {
          label: "padding:compact",
          caption: $store.sidebar_padding === "compact" ? "Selected" : null,
          onselect: () => {
            $store.sidebar_padding = "compact";
          },
        },
        {
          label: "padding:roomy",
          caption: $store.sidebar_padding === "roomy" ? "Selected" : null,
          onselect: () => {
            $store.sidebar_padding = "roomy";
          },
        },
        {
          label: "flat:true",
          caption: $store.flat === true ? "Selected" : null,
          onselect: () => {
            $store.flat = true;
          },
        },
        {
          label: "flat:false",
          caption: $store.flat === false ? "Selected" : null,
          onselect: () => {
            $store.flat = false;
          },
        },
      ],
    },
  ]}
/>

<Rows {rows} />
