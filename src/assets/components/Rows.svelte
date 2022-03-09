<script>
  import Row from "$lib/layouts/Row.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$assets/components/Card.svelte";

  export let rows;
</script>

{#each rows as row}
  {#if Array.isArray(row)}
    <Row>
      {#each row as post}
        <Column50>
          {#if post?.metadata?.svelte === true}
            <svelte:component this={post.markdown} />
          {:else}
            <Card data={post.markdown} metadata={post.metadata} />
          {/if}
        </Column50>
      {/each}
    </Row>
  {:else if row?.metadata?.svelte === true}
    <svelte:component this={row.markdown} />
  {:else}
    <Row>
      <Column100>
        <Card data={row.markdown} metadata={row.metadata} />
      </Column100>
    </Row>
  {/if}
{/each}
