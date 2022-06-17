<script context="module">
  export const prerender = true;
</script>

<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  const all_posts = import.meta.globEager(`../assets/markdown/welcome/**/*`);
  const rows = formatPosts(all_posts);
  const key = "bubbles-color-scheme";
</script>

<Header
  title="Welcome"
  buttons={[
    {
      icon: "more",
      color: "gray-lighter",
      options: [
        {
          label: "Light Mode",
          onclick: () => {
            console.log("Light mode");
            localStorage[key] = "light";
            document.documentElement.classList.remove("dark");
          },
        },
        {
          label: "Dark Mode",
          onclick: () => {
            console.log("Dark mode");
            localStorage[key] = "dark";
            document.documentElement.classList.add("dark");
          },
        },
      ],
    },
  ]}
/>

<Rows {rows} />
