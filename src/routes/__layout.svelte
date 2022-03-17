<script>
  import "$lib/css/app.css";
  import "$assets/css/oceanic.css";
  import "$assets/css/markdown.css";

  // import store from "src/__misc/store";
  import icon_arrow from "$assets/icons/arrow.svg";

  import { goto } from "$app/navigation";
  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import SidebarPageWrapper from "$lib/layouts/SidebarPageWrapper.svelte";
  import Modal from "$lib/components/modal/Modal.svelte";
  import ToastContainer from "$lib/components/toast/ToastContainer.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import { pageStore, configStore } from "$lib/stores/stores";

  $configStore.goto = goto;

  const sidebarConfig = {
    logo: "/logo.svg",
    sections: [
      {
        label: "Welcome",
        id: "welcome",
        href: "/",
        section: "Getting Started",
      },
      {
        label: "Installation",
        id: "installation",
        href: "/installation",
        section: "Getting Started",
      },
      {
        label: "Usage",
        id: "usage",
        href: "/usage",
        section: "Getting Started",
      },
      {
        label: "Colors",
        id: "colors",
        href: "/colors",
        section: "Getting Started",
      },
      {
        label: "Errors",
        id: "errors",
        href: "/errors",
        section: "Getting Started",
      },
      {
        label: "Page Wrapper",
        id: "page-wrapper",
        href: "/page-wrapper",
        section: "Layouts",
      },
      {
        label: "Page Row",
        id: "page-row",
        href: "/page-row",
        section: "Layouts",
      },
      {
        label: "Page Column",
        id: "page-column",
        href: "/page-column",
        section: "Layouts",
      },
      {
        label: "Page Grid",
        id: "page-grid",
        href: "/page-grid",
        section: "Layouts",
      },
      {
        label: "Page Center",
        id: "page-center",
        href: "/page-center",
        section: "Layouts",
      },
      {
        label: "Button",
        id: "button",
        href: "/button",
        section: "Components",
      },
      {
        label: "Card",
        id: "card",
        href: "/card",
        section: "Components",
      },
      {
        label: "Checkbox",
        id: "checkbox",
        href: "/checkbox",
        section: "Components",
      },
      {
        label: "Divider",
        id: "divider",
        href: "/divider",
        section: "Components",
      },
      {
        label: "Error",
        id: "error",
        href: "/error",
        section: "Components",
      },
      {
        label: "Form",
        id: "form",
        href: "/form",
        section: "Components",
      },
      {
        label: "Header",
        id: "header",
        href: "/header",
        section: "Components",
      },
      {
        label: "Icon Button",
        id: "icon-button",
        href: "/icon-button",
        section: "Components",
      },
      {
        label: "Input",
        id: "input",
        href: "/input",
        section: "Components",
      },
      {
        label: "List",
        id: "list",
        href: "/list",
        section: "Components",
      },
      {
        label: "Modal",
        id: "modal",
        href: "/modal",
        section: "Components",
      },
      {
        label: "Overlay",
        id: "overlay",
        href: "/overlay",
        section: "Components",
      },
      {
        label: "Pagination",
        id: "pagination",
        href: "/pagination",
        section: "Components",
      },
      {
        label: "Radio",
        id: "radio",
        href: "/radio",
        section: "Components",
      },
      {
        label: "Segmented Controller",
        id: "segmented-controller",
        href: "/segmented-controller",
        section: "Components",
      },
      {
        label: "Select",
        id: "select",
        href: "/select",
        section: "Components",
      },
      {
        label: "Sidebar",
        id: "sidebar",
        href: "/sidebar",
        section: "Components",
      },
      {
        label: "Spinner",
        id: "spinner",
        href: "/spinner",
        section: "Components",
      },
      {
        label: "Switch",
        id: "switch",
        href: "/switch",
        section: "Components",
      },
      {
        label: "Table",
        id: "table",
        href: "/table",
        section: "Components",
      },
      {
        label: "Tag",
        id: "tag",
        href: "/tag",
        section: "Components",
      },
      {
        label: "Toast",
        id: "toast",
        href: "/toast",
        section: "Components",
      },
      {
        label: "validateInputs",
        id: "validate-inputs",
        href: "/validate-inputs",
        section: "Utils",
      },
      {
        label: "getFormData",
        id: "get-form-data",
        href: "/get-form-data",
        section: "Utils",
      },
      {
        label: "showLoading",
        id: "show-loading",
        href: "/show-loading",
        section: "Utils",
      },
      {
        label: "hideLoading",
        id: "hide-loading",
        href: "/hide-loading",
        section: "Utils",
      },
      {
        label: "showToast",
        id: "show-toast",
        href: "/show-toast",
        section: "Utils",
      },
      {
        label: "showModal",
        id: "show-modal",
        href: "/show-modal",
        section: "Utils",
      },
      {
        label: "hideModal",
        id: "hide-modal",
        href: "/hide-modal",
        section: "Utils",
      },
      {
        label: "getSelectedTableRows",
        id: "get-selected-table-rows",
        href: "/get-selected-table-rows",
        section: "Utils",
      },
      {
        label: "deselectTableRows",
        id: "deselect-table-rows",
        href: "/deselect-table-rows",
        section: "Utils",
      },
      {
        label: "Change Log",
        id: "changelog",
        href: "/changelog",
        section: "Settings",
      },
    ],
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

<Modal />

{#if y > 1000}
  <div>
    <IconButton icon={icon_arrow} transparent={false} onclick={() => (y = 0)} />
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
