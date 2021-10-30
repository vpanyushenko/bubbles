<script>
  export let vh100 = true;
</script>

<div class:vh100>
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .vh100 {
    min-height: 100vh;
  }
</style>
