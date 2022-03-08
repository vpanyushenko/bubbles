<script>
  import Button from "$lib/components/button/Button.svelte";
  import { showLoading } from "$lib/utils/loading";

  const id = "123";
  //showLoading(id);
</script>

<Button label="Testing" href="/examples" {id} />
