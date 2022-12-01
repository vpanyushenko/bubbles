<script>
  import { configStore } from "$lib/index";

  export let style = "";
  export let mobile_reverse = false;
  export let padding;
  export let border = false;

  if (!padding) padding = $configStore.padding || "roomy";
  if (padding === "compact") border = false;
</script>

<div class="page__row" {style} class:reverse={mobile_reverse} class:compact={padding === "compact"} class:border>
  <slot />
</div>

<style>
  @media only screen and (max-width: 767) {
    .reverse {
      flex-direction: row-reverse;
    }
  }
</style>
