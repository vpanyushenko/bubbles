<!--
  @component

  - *label*: The text for the tag 
  - *color*: The color of the tag
-->
<script>
  export let label;
  export let color = "purple";
  export let text; //TODO: delete
  export let small = false;
  export let min_width = true;

  let style = `var(--${color})`;
</script>

{#if label}
  <span style="background: {style}" class:small class:min_width>{label}</span>
{/if}

<style>
  @import "@fontsource/fira-mono/700.css";

  span {
    font-family: "Fira Mono";
    display: inline-block;
    white-space: nowrap;
    padding: 3px 10px;
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
