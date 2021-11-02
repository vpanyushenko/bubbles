<script>
  import Button from "$lib/components/inputs/Button.svelte";
  import IconButton from "$lib/components/inputs/icon-button/IconButton.svelte";
  import Select from "$lib/components/inputs/Select.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import Table from "$lib/components/table/Table.svelte";

  export let title = null;
  export let subtitle = null;
  export let center = false;
  export let border = false;
  export let actions = [];
  export let filters = [];
  export let blocks = [];
  export let buttons = [];
  export let body = null;
  export let footer = false;
  export let table_rows = [];
  export let table_header = [];

  let innerWidth = 0;
  let expanded = true;

  $: if (innerWidth > 767) {
    expanded = true;
  } else {
    expanded = false;
  }
</script>

<svelte:window bind:innerWidth />

{#if expanded || !body}
  <div class="card">
    {#if filters.length || title}
      <div class="header" class:border>
        {#each filters as filter}
          <Select {...filter} />
        {/each}
        <div class="header__text" class:center>
          {#if title}
            <h6>{title}</h6>
          {/if}
          {#if subtitle}
            <p>{subtitle}</p>
          {/if}
        </div>

        {#each actions as action}
          <IconButton {...action} />
        {/each}
      </div>
    {/if}

    <div class="body">
      {#if !body}
        <slot />
      {:else if body === "form"}
        <Form {blocks} />
      {:else if body === "table"}
        <Table rows={table_rows} header={table_header} mobile="true" />
      {/if}
    </div>

    {#if buttons.length || footer === true}
      <div class="card__footer">
        {#each buttons as button}
          <Button {...button} />
        {/each}
      </div>
    {/if}
  </div>
{:else}
  {#if body === "form"}
    <Form {blocks} />
  {/if}

  {#if body === "table"}
    <Table rows={table_rows} header={table_header} mobile="true" />
  {/if}
{/if}

<style>
  .card {
    position: relative;
    padding: 0.625rem 2rem 0.625rem;
    border-radius: 1.5rem;
    background: #fff;
    -webkit-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    -moz-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .border {
    border-bottom: 1px solid var(--gray-light);
  }

  .center {
    text-align: center;
  }

  .header__text {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
  }

  p {
    color: var(--gray);
  }

  h6 + p {
    margin-top: 0.5rem;
  }

  .card__footer {
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
    /* height: 2.5rem; */
  }

  @media only screen and (max-width: 767px) {
    .header__filter {
      margin-bottom: 1rem;
    }

    .header__filter > div {
      margin-left: 0;
      margin-bottom: 1rem;
      width: 100%;
    }

    .card__footer {
      justify-content: center;
    }

    .card__footer button {
      width: 100%;
    }
  }
</style>
