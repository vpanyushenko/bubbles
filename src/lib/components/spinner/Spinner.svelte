<script>
  export let size = 1.25;
  export let color = "white";
  export let style;

  let colors;

  if (color === "white") {
    colors = `border-color: var(--gray-light); border-top-color: var(--gray-lightest);`;
  } else if (color) {
    colors = `border-color: var(--${color}); border-top-color: var(--${color}-lightest);`;
  }
</script>

<span class="spinner" style="width: {size}rem; height: {size}rem; {colors} {style}" />

<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    content: "";
    box-sizing: border-box;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #fff;
    animation: spinner 0.6s linear infinite;
  }
</style>
