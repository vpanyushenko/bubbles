<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status: status,
        message: error.message,
      },
    };
  }
</script>

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
