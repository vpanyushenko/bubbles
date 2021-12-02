<script>
  import Pagination from "$lib/components/pagination/Pagination.svelte";

  export let pagination = null;
  export let align = "middle";
</script>

<div
  class="footer"
  class:center={align === "middle" || align === "center"}
  class:end={align === "end" || align === "right"}
  class:start={align === "left" || align === "start"}
>
  {#if pagination}
    <Pagination {...pagination} />
  {:else}
    <slot>No footer props provided</slot>
  {/if}
</div>

<style>
  .footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-bottom: 2rem;
    padding-top: 2rem;
  }

  .center {
    justify-content: center;
  }
  .end {
    justify-content: end;
  }

  .start {
    justify-content: start;
  }
</style>
