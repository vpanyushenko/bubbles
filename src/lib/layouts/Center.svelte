<script>
  export let height100 = true;
</script>

<div class:height100>
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
  }
</style>
