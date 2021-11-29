<script>
  import "$lib/css/app.css";
  import "../code.css";

  import Sidebar from "$lib/components/sidebar/Sidebar.svelte";
  import SidebarPageWrapper from "$lib/layouts/SidebarPageWrapper.svelte";
  import Modal from "$lib/components/modal/Modal.svelte";
  import Toast from "$lib/components/toast/Toast.svelte";
  import { toastStore } from "$lib/stores/stores";

  const sidebarConfig = {
    logo: "/logo.svg",
    sections: [
      {
        title: "Welcome",
        id: "welcome",
        href: "/",
        section: "Getting Started",
      },
      {
        title: "Installation",
        id: "installation",
        href: "#installation",
        section: "Getting Started",
      },
      {
        title: "Usage",
        id: "usage",
        href: "#usage",
        section: "Getting Started",
      },
      {
        title: "Colors",
        id: "colors",
        href: "#colors",
        section: "Getting Started",
      },
      {
        title: "Page Wrappers",
        id: "page-wrappers",
        href: "#page-wrappers",
        section: "Layouts",
      },
      {
        title: "Page Rows",
        id: "page-rows",
        href: "#page-rows",
        section: "Layouts",
      },
      {
        title: "Page Columns",
        id: "page-columns",
        href: "#page-columns",
        section: "Layouts",
      },
      {
        title: "Page Grids",
        id: "page-grids",
        href: "#page-grids",
        section: "Layouts",
      },
      {
        title: "Page Center",
        id: "page-center",
        href: "#page-center",
        section: "Layouts",
      },
      {
        title: "Buttons",
        id: "buttons",
        href: "#buttons",
        section: "Components",
      },
      {
        title: "Cards",
        id: "cards",
        href: "#cards",
        section: "Components",
      },
      {
        title: "Checkboxes",
        id: "checkboxes",
        href: "#checkboxes",
        section: "Components",
      },
      {
        title: "Divider",
        id: "divider",
        href: "#divider",
        section: "Components",
      },
      {
        title: "Form",
        id: "form",
        href: "#form",
        section: "Components",
      },
      {
        title: "Header",
        id: "header",
        href: "#header",
        section: "Components",
      },
      {
        title: "Input",
        id: "input",
        href: "#input",
        section: "Components",
      },
      {
        title: "List",
        id: "list",
        href: "#list",
        section: "Components",
      },
      {
        title: "Modal",
        id: "modal",
        href: "#modal",
        section: "Components",
      },
      {
        title: "Radio",
        id: "radio",
        href: "#radio",
        section: "Components",
      },
      {
        title: "Segmented Controller",
        id: "segmented-controller",
        href: "#segmented-controller",
        section: "Components",
      },
      {
        title: "Select",
        id: "select",
        href: "#select",
        section: "Components",
      },
      {
        title: "Sidebar",
        id: "sidebar",
        href: "#sidebar",
        section: "Components",
      },
      {
        title: "Switch",
        id: "switch",
        href: "#switch",
        section: "Components",
      },
      {
        title: "table",
        id: "table",
        href: "#table",
        section: "Components",
      },
      {
        title: "Tag",
        id: "tag",
        href: "#tag",
        section: "Components",
      },
      {
        title: "Toast",
        id: "toast",
        href: "#toast",
        section: "Components",
      },
      {
        title: "validateInputs",
        id: "validateInputs",
        href: "#validateInputs",
        section: "Utils",
      },
      {
        title: "getFormData",
        id: "getFormData",
        href: "#getFormData",
        section: "Utils",
      },
      {
        title: "showLoading",
        id: "showLoading",
        href: "#showLoading",
        section: "Utils",
      },
      {
        title: "hideLoading",
        id: "hideLoading",
        href: "#hideLoading",
        section: "Utils",
      },
      {
        title: "showModal",
        id: "showModal",
        href: "#showModal",
        section: "Utils",
      },
      {
        title: "hideModal",
        id: "hideModal",
        href: "#hideModal",
        section: "Utils",
      },
      {
        title: "showToast",
        id: "showToast",
        href: "#showToast",
        section: "Utils",
      },
    ],
  };
</script>

{#each $toastStore as toast}
  <Toast {...toast} />
{/each}

<Sidebar {...sidebarConfig} />
<SidebarPageWrapper>
  <slot />
</SidebarPageWrapper>

<Modal />

<style>
  :global(p) {
    margin-bottom: 1rem;
    color: var(--gray-darker);
  }

  :global(p) {
    font-size: 1rem;
  }

  :global(.mt-2) {
    margin-top: 2rem;
  }
</style>
