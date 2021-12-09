<script>
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
</script>

<div>
  {#each array as num}
    <span>
      <p>Hello - {num}</p>
    </span>
  {/each}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 2px;
    grid-column-gap: 2px;
  }

  span {
    background: blueviolet;
    color: white;
  }
</style>
