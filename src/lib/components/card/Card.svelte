<!--
  @component

  ## Cards
  Cards are the focus of Bubbles and they will normally be the sections of your page. Cards will fit into whatever `Column` or `Grid` layouts you choose.About

  ---
  #### Anatomy
  Cards have three sections, `header`, `body`, and `footer`
  
  - The `header` is normally used for the `title` + `action` items or `filters`, which are select elements. You'll use the filters most often when the `body` of your card has a table, as the filter should modify the page url trigger the svelte load function to run again
  - The `body` is where you add your content. This can be a `Table`, `Form`, or any other element(s) you choose.Card
  - The `footer` is the bottom of the card and off by default. Most uses for the card footer are for pagination of a table or for CTA buttons (though in a form it's best to include the CTA buttons in the form instead of the card footer)


  #### Example

  ```js
  
  //The card header is optional. If can include a title, subtitle, + button combo or filters. 

  const headerConfig = {
    title: "Card Title" //This string will appear at the top of your card
    subtitle: "Card Subtitle" //If you need a subtitle

    export let filters = [];
    export let title = "";
    export let caption = "";
    export let actions = [];
    export let center = false;
    export let border = true;
  }


  const header = [
    {
      label: "Column 1",
      align: "left" //you can omit this because left align is the default
    },
    {
      label: "Column 2",
    },
    {
      label: "Column 3",
      align: "right" 
    }
    {
      label: null, //pass any falsy value to skip the label. Usefullif you have a button as the last part of your table and you don't want to label it
    }
  ]




  ```

  ---
-->
<script>
  import { pageStore } from "$lib/stores/page.store";
  import CardHeader from "./CardHeader.svelte";
  import Button from "$lib/components/inputs/Button.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import Table from "$lib/components/table/Table.svelte";

  export let header = {};
  export let my = 0.625;
  export let mx = 2;
  export let blocks = [];
  export let buttons = [];
  export let body = null;
  export let footer = false;
  export let table_rows = [];
  export let table_header = [];

  let y = `${my}rem`;
  let x = `${mx}rem`;

  $: innerWidth = 0;
  $pageStore.is_mobile = innerWidth < 767 ? true : false;
</script>

<svelte:window bind:innerWidth />

{#if !$pageStore.is_mobile || !body}
  <div class="card" style="padding-top:{y};padding-bottom:{y};padding-left:{x};padding-right:{x}">
    {#if Object.keys(header).length}
      <CardHeader {...header} />
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
