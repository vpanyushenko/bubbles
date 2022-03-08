<script>
  import CodeCard from "./Code.svelte";
  import MarkdownCard from "./Markdown.svelte";

  export let data;
  export let metadata = {};

  const component = metadata.component || metadata.type || "markdown";
</script>

{#if component === "markdown"}
  <MarkdownCard color={metadata.color} id={metadata.id} height100={metadata.height === 100 ? true : false}>
    <svelte:component this={data} />
  </MarkdownCard>
{:else}
  <CodeCard height100={metadata.height === 100 ? true : false} id={metadata.id}>
    <svelte:component this={data} />
  </CodeCard>
{/if}

<style>
  :global(table) {
    width: -webkit-fill-available;
  }

  @media only screen and (max-width: 600px) {
    :global(table) {
      width: max-content;
    }
  }
</style>
