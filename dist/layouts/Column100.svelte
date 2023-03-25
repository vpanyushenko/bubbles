<script>
  import { configStore } from "../index";

  export let padding;

  if (!padding) padding = $configStore.padding || "roomy";
</script>

<section class="page__col_w100" class:compact={padding === "compact"}>
  <slot />
</section>
