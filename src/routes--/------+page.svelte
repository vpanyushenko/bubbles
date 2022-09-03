<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  import { setDarkMode, unsetDarkMode } from "$lib/index";
  const all_posts = import.meta.glob(`../assets/markdown/welcome/**/*`, { eager: true });
  console.log(all_posts);
  const rows = formatPosts(all_posts);
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
            unsetDarkMode();
          },
        },
        {
          label: "Dark Mode",
          onclick: () => {
            console.log("Dark mode");
            setDarkMode();
          },
        },
      ],
    },
  ]}
/>

<Rows {rows} />
