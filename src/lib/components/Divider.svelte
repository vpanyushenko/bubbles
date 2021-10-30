<script>
  export let label;
</script>

<div>
  <hr class="left" />
  {#if label}
    <span>{label}</span>
  {/if}
  <hr class="right" />
</div>

<style>
  div {
    margin-bottom: 24px;
    margin-top: 24px;
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 100%;
    display: flex;
  }

  span {
    padding: 0 20px;
  }

  .left,
  .right {
    flex-grow: 1;
    margin: 0;
  }

  .left,
  .right {
    flex-grow: 1;
    margin: 0;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-light);
    clear: both;
    margin-bottom: 16px;
  }
</style>
