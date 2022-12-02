<script>
  import "$lib/css/app.css";
  import "$docs/css/oceanic.css";
  import "$docs/css/markdown.css";

  import icon_arrow from "$docs/icons/arrow.svg";

  import {
    Header,
    unsetDarkMode,
    setDarkMode,
    Sidebar,
    SidebarPageWrapper,
    ToastContainer,
    IconButton,
    ModalContainer,
    fuzzySearch,
  } from "bubbles-ui";

  import sections from "$docs/utils/sidebar-sections";
  import store from "$docs/utils/store";

  import logo from "$docs/icons/logo.svg";
  import logo_dark_mode from "$docs/icons/logo-dark-mode.svg";

  import { page } from "$app/stores";

  // $configStore.padding = "compact";
  // $configStore.radius = "blocky";

  $: sidebarConfig = {
    //logo: "/logo.svg",
    //logo_dark: "/logo-dark-mode.svg", //IDK why this doesn't work
    logo: logo,
    logo_dark: logo_dark_mode,
    flat: $store.flat,
    padding: $store.sidebar_padding,
    sections: sections.map((section) => {
      // section.icon = icon;
      // delete section.group;
      return section;
    }),
  };

  // $: if ($store.sidebar_index) {
  //   setTimeout(() => {
  //     $pageStore.sidebar.active_item = sidebarConfig.sections[$store.sidebar_index].id;
  //   }, 750);
  // }

  let y = 0;

  /**
   * Converts string to title case
   * @param {String} str - the string
   * @param {Number} [length=2] - The minimum length of the string to check
   * @returns {String}
   */
  const titleCase = (str, length = 2) => {
    if (!str) return "";
    if (str.length < length) return str;

    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  };
</script>

<svelte:window bind:scrollY={y} />

<ToastContainer />

<Sidebar {...sidebarConfig} />

<SidebarPageWrapper>
  <!-- svelte-ignore missing-declaration -->
  <Header
    caption="Version {__version__}"
    breadcrumbs={false}
    title={$page.route.id
      .split("/")
      .at(-1)
      .split("-")
      .map((s) => titleCase(s))
      .join(" ")}
    buttons={[
      {
        icon: "search",
        color: "gray-lighter",
        search: true,
        typeahead: async (input) => {
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
          {
            divider: true,
            label: "Sidebar Options",
          },
          {
            label: "Compact",
            caption: $store.sidebar_padding === "compact" ? "(Selected)" : null,
            onselect: () => {
              $store.sidebar_padding = "compact";
            },
          },
          {
            label: "Roomy",
            caption: $store.sidebar_padding === "roomy" ? "(Selected)" : null,
            onselect: () => {
              $store.sidebar_padding = "roomy";
            },
          },
          {
            label: "Flat",
            caption: $store.flat === true ? "(Selected)" : null,
            onselect: () => {
              $store.flat = true;
            },
          },
          {
            label: "Not Flat (Nested)",
            caption: $store.flat === false ? "(Selected)" : null,
            onselect: () => {
              $store.flat = false;
            },
          },
        ],
      },
    ]}
  />

  <slot />
</SidebarPageWrapper>

<ModalContainer />

{#if y > 1000}
  <div>
    <IconButton icon={icon_arrow} color="gray-lighter" onclick={() => (y = 0)} />
  </div>
{/if}

<style>
  :global(p) {
    margin-bottom: 1rem;
    color: var(--gray-darker);
  }

  :global(.mt-2) {
    margin-top: 2rem;
  }

  div {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 20px;
    margin-bottom: 20px;
    z-index: 10;
  }
</style>
