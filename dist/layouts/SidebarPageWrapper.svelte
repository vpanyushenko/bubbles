<script>
  import { configStore } from "../index";

  /** @prop {number} max_content_width - The maximum width in pixels for the content */
  export let max_content_width = $configStore?.max_content_width || 1200;
</script>

<main class="page__wrapper__sidebar">
  <div class="page__center" style={`max-width:${max_content_width}px;`}>
    <slot />
  </div>
</main>
