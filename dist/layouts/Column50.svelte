<script>
  import { configStore } from "../index";

  export let padding;

  if (!padding) padding = $configStore.padding || "roomy";
</script>

<section class="page__col page__col_w50" class:compact={padding === "compact"}>
  <slot />
</section>
