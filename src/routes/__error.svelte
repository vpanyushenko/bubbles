<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status: status,
        message: error.message,
        title: `${status}: ${error.message}`,
      },
    };
  }
</script>

<script>
  import { browser } from "$app/env";

  import { pageStore } from "$lib/stores/stores";
  import Error from "$lib/components/error/Error.svelte";

  //   $: if ($modalStore.active && browser) {
  //     document.body.classList.add("noscroll");
  //   } else if (browser) {
  //     document.body.classList.remove("noscroll");
  //   }

  export let status = 500;
  export let message = "An error occurred";
  export let title = "";

  pageStore.update((data) => {
    data.title = `Error code ${status}`;
    return data;
  });

  console.log(title);
  console.log(message);
</script>

<Error />

<style>
  h3 {
    color: var(--red);
  }
</style>
