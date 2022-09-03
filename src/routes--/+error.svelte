<script>
  import Error from "$lib/components/error/Error.svelte";

  export let status;
  export let message;
  export let title;

  const props = {
    status,
    message,
    title,
  };
</script>

<Error {...props} button={{ href: "/error", mt: true, label: "Go Back" }} />
