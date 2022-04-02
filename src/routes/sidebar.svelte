<script context="module">
  export const prerender = true;
</script>

<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  import store from "$assets/utils/store";
  const all_posts = import.meta.globEager(`../assets/markdown/sidebar/**/*`);
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
