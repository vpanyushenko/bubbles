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
        label: "Welcome",
        id: "welcome",
        href: "/",
        section: "Getting Started",
      },
      {
        label: "Installation",
        id: "installation",
        href: "#installation",
        section: "Getting Started",
      },
      {
        label: "Usage",
        id: "usage",
        href: "#usage",
        section: "Getting Started",
      },
      {
        label: "Colors",
        id: "colors",
        href: "#colors",
        section: "Getting Started",
      },
      {
        label: "Page Wrappers",
        id: "page-wrappers",
        href: "#page-wrappers",
        section: "Layouts",
      },
      {
        label: "Page Rows",
        id: "page-rows",
        href: "#page-rows",
        section: "Layouts",
      },
      {
        label: "Page Columns",
        id: "page-columns",
        href: "#page-columns",
        section: "Layouts",
      },
      {
        label: "Page Grids",
        id: "page-grids",
        href: "#page-grids",
        section: "Layouts",
      },
      {
        label: "Page Center",
        id: "page-center",
        href: "#page-center",
        section: "Layouts",
      },
      {
        label: "Buttons",
        id: "buttons",
        href: "#buttons",
        section: "Components",
      },
      {
        label: "Cards",
        id: "cards",
        href: "#cards",
        section: "Components",
      },
      {
        label: "Checkboxes",
        id: "checkboxes",
        href: "#checkboxes",
        section: "Components",
      },
      {
        label: "Divider",
        id: "divider",
        href: "#divider",
        section: "Components",
      },
      {
        label: "Form",
        id: "form",
        href: "#form",
        section: "Components",
      },
      {
        label: "Header",
        id: "header",
        href: "#header",
        section: "Components",
      },
      {
        label: "Input",
        id: "input",
        href: "#input",
        section: "Components",
      },
      {
        label: "List",
        id: "list",
        href: "#list",
        section: "Components",
      },
      {
        label: "Modal",
        id: "modal",
        href: "#modal",
        section: "Components",
      },
      {
        label: "Radio",
        id: "radio",
        href: "#radio",
        section: "Components",
      },
      {
        label: "Segmented Controller",
        id: "segmented-controller",
        href: "#segmented-controller",
        section: "Components",
      },
      {
        label: "Select",
        id: "select",
        href: "#select",
        section: "Components",
      },
      {
        label: "Sidebar",
        id: "sidebar",
        href: "#sidebar",
        section: "Components",
      },
      {
        label: "Switch",
        id: "switch",
        href: "#switch",
        section: "Components",
      },
      {
        label: "Table",
        id: "table",
        href: "#table",
        section: "Components",
      },
      {
        label: "Tag",
        id: "tag",
        href: "#tag",
        section: "Components",
      },
      {
        label: "Toast",
        id: "toast",
        href: "#toast",
        section: "Components",
      },
      {
        label: "validateInputs",
        id: "validateInputs",
        href: "#validateInputs",
        section: "Utils",
      },
      {
        label: "getFormData",
        id: "getFormData",
        href: "#getFormData",
        section: "Utils",
      },
      {
        label: "showLoading",
        id: "showLoading",
        href: "#showLoading",
        section: "Utils",
      },
      {
        label: "hideLoading",
        id: "hideLoading",
        href: "#hideLoading",
        section: "Utils",
      },
      {
        label: "showModal",
        id: "showModal",
        href: "#showModal",
        section: "Utils",
      },
      {
        label: "hideModal",
        id: "hideModal",
        href: "#hideModal",
        section: "Utils",
      },
      {
        label: "showToast",
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

  :global(.mt-2) {
    margin-top: 2rem;
  }
</style>
