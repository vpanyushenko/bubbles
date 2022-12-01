

<script>
  import "$lib/css/app.css";
  import "$assets/css/oceanic.css";
  import "$assets/css/markdown.css";

  import icon_arrow from "$assets/icons/arrow.svg";

  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import SidebarPageWrapper from "$lib/layouts/SidebarPageWrapper.svelte";

  import ToastContainer from "$lib/components/toast/ToastContainer.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import sections from "$assets/utils/sidebar-sections";
  import store from "$assets/utils/store";
  import ModalContainer from "$lib/components/modal/ModalContainer.svelte";

  import logo from "$assets/icons/logo.svg";
  import logo_dark_mode from "$assets/icons/logo-dark-mode.svg";

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
</script>

<svelte:window bind:scrollY={y} />

<ToastContainer />

<Sidebar {...sidebarConfig} />

<SidebarPageWrapper>
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
