<script>
  export let style = "";
  export let mobile_reverse = false;
</script>

<div class="page__row page__row_border" {style} class:reverse={mobile_reverse}>
  <slot />
</div>

<style>
  @media only screen and (max-width: 767) {
    .reverse {
      flex-direction: row-reverse;
    }
  }
</style>
