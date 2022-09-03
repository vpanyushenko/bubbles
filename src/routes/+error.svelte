<script>
  import Error from "$lib/components/error/Error.svelte";

  import { page } from "$app/stores";
  // import img from "$lib/icons/error.png";
  const img = null;

  const status = $page.status ?? 500;
  const message = $page.error.message ?? "An unknown error occurred";
  const title = $page.error.title ?? "Error";
  const obj = { status, message, title, img };
  console.log(obj);
</script>

<Error {...obj} button={{ href: "/error", mt: true, label: "Go Back" }} />
