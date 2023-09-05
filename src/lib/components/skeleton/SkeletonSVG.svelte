<script>
  import { uuid } from "$lib/index";

  export let height = "100%";
  export let width = "100%";
  export let speed = 1.2;
  export let animate = true;
  export let secondary_color_percent_width = 100;

  /** @type {?string=} [aria_label=null]*/
  export let aria_label = null;

  let id_clip = uuid();
  let id_gradient = uuid();
</script>

<svg {width} {height} aria-label={aria_label} preserveAspectRatio="none">
  <rect fill="url(#{id_gradient})" clip-path="url(#{id_clip})" {width} {height} x="0" y="0" />
  <defs>
    <clipPath id={id_clip}>
      <slot>
        <rect {width} {height} x="0" y="0" rx="8" ry="8" />
      </slot>
    </clipPath>
    <linearGradient id={id_gradient} x1="-{secondary_color_percent_width}%" y1="50%" x2="0%" y2="50%">
      {#if animate}
        <animate
          attributeName="x1"
          from="-{secondary_color_percent_width}%"
          to="100%"
          dur="{speed}s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x2"
          from="0%"
          to="{100 + secondary_color_percent_width}%"
          dur="{speed}s"
          repeatCount="indefinite"
        />
      {/if}

      <stop class="stop1" offset="0%" />
      <stop class="stop2" offset="50%" />
      <stop class="stop1" offset="100%" />
    </linearGradient>
  </defs>
</svg>

<style>
  svg {
    margin-top: 1.5rem;
  }

  .stop1 {
    stop-color: var(--gray-lighter);
  }

  .stop2 {
    stop-color: var(--gray-light);
  }

  :global(html.dark) .stop1 {
    stop-color: var(--dark-dark);
  }

  :global(html.dark) .stop2 {
    stop-color: var(--dark);
  }
</style>
