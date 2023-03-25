<script>
  import { fly } from "svelte/transition";
  export let refresh = "";
  export let max_content_width = 1200;
</script>

{#key refresh}
  <div
    in:fly={{ x: -5, duration: 500, delay: 500 }}
    out:fly={{ x: 5, duration: 500 }}
    style={`max-width:${max_content_width}px;`}
  >
    <slot />
  </div>
{/key}
