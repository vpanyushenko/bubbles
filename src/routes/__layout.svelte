<script>
  import "$lib/css/app.css";

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
        href: "/",
        section: "Getting Started",
      },
      {
        title: "Installation",
        href: "#installation",
        section: "Getting Started",
      },
      {
        title: "Usage",
        href: "#usage",
        section: "Getting Started",
      },
      {
        title: "Customization",
        href: "#customization",
        section: "Getting Started",
      },
      {
        title: "Buttons",
        href: "#buttons",
        section: "Components",
      },
      {
        title: "Cards",
        href: "#cards",
        section: "Components",
      },
      {
        title: "Checkboxes",
        href: "#checkboxes",
        section: "Components",
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
