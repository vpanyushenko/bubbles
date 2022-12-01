<script>
  import { configStore } from "$lib/index";

  export let padding;

  if (!padding) padding = $configStore.padding || "roomy";
</script>

<section class="page__col" class:compact={padding === "compact"}>
  <slot />
</section>
