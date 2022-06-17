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
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 100%;
    display: flex;
  }

  span {
    padding: 0 1.25rem;
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
    margin-bottom: 1rem;
  }

  :global(html.dark) hr {
    border-top: 1px solid var(--dark);
  }

  :global(html.dark) hr span {
    color: var(--gray-light);
  }
</style>
