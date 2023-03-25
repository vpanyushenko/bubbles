<script>
  /**
   * @type {Boolean} [height100=true] - Make sure this element takes up 100% of the height on the page
   */
  export let height100 = true;

  /**
   * @type {Number|String} [max_width=null] - Add a number to specify a width in rem values. For other values like pixels, add a string like "500px"
   */
  export let max_width = null;

  /**
   * @type {Number} [px=0] - Left and right padding options
   */
  export let px = 0;

  /**
   * @type {Number} [py=0] - Top and bottom padding options
   */
  export let py = 0;

  let style = "";

  if (max_width) {
    if (typeof max_width === "number") {
      style += `max-width: ${max_width}rem;`;
    } else {
      style += `max-width: ${max_width};`;
    }
  }

  if (px) {
    style += `padding-left:${px}rem;padding-right:${px}rem;`;
  }

  if (py) {
    style += `padding-top:${py}rem;padding-bottom:${py}rem;`;
  }
</script>

<div class:height100 {style}>
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .height100 {
    min-height: 100vh;
  }</style>
