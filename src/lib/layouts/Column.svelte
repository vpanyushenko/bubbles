<script>
  import { configStore } from "$lib/index";

  /** @type {"roomy"|"compact"} [padding="roomy"] */
  export let padding = "roomy";

  if (!padding) padding = $configStore.padding || "roomy";
</script>

<section class="page__col" class:compact={padding === "compact"}>
  <slot />
</section>
