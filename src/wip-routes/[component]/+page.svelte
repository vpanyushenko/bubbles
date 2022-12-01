<script>
  import Rows from "$docs/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$docs/utils/posts";
  import { setDarkMode, unsetDarkMode } from "$lib/index";
  import { page } from "$app/stores";

  // const all_posts = import.meta.glob(`../assets/markdown/welcome/**/*`, { eager: true });

  // const rows = formatPosts(all_posts);
  // $: console.log($page);

  // const test = import.meta.glob(`../assets/markdown/${components[$page.component]}/**/*`, { eager: true });
  // console.log(test);

  import markdown from "$docs/markdown/installation/01-overview.md";
  console.log(markdown);

  const components = ["installation"];
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
