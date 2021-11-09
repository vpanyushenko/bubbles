<!--
  @component

  - *label*: The text for the tag 
  - *color*: The color of the tag
-->
<script>
  export let label;
  export let color = "primary";
  export let small = false;
  export let min_width = true;

  let background = `var(--${color}-lightest)`;
  let text_color = `var(--${color}-darkest)`;
</script>

{#if label}
  <span style="background: {background}; color: {text_color}" class:small class:min_width>{label}</span>
{/if}

<style>
  @import "@fontsource/fira-mono/700.css";

  span {
    font-family: "Fira Mono";
    display: inline-block;
    white-space: nowrap;
    padding: 3px 0.625rem;
    border-radius: 8px;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    vertical-align: middle;
    text-align: center;
  }

  .min_width {
    min-width: 50px;
  }

  .small {
    font-size: 9px;
  }
</style>
