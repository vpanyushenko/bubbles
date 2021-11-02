<!--
  @component

  @param {Array<(String|null)>} header - an array of header to use 
  @param {Array<Object>} rows - the rows that will be included
  @example: rows = [
    {
      type: "text"
      title: "Title",
      large: true, // makes the title large,
      subtitle: "subtitle",
      href: "/"
    },
    {
      type: "complex",
      rows: [
        {
          type: "tag",
          label: "Tag",
          color: "purple",
        },
        {
          type; "text"
          ...
        }
      ]
    }
  ]
-->
<script>
  import { pageStore } from "$lib/stores/page.store";
  import Select from "$lib/components/inputs/Select.svelte";
  import Tag from "$lib/components/Tag.svelte";
  import CircleButton from "$lib/components/inputs/circle-button/CircleButton.svelte";

  export let rows = [];
  export let header = [];
  export let empty = "Nothing here yet.";
  export let mobile = false;

  function rowClicked(event) {
    const icon = event.currentTarget.querySelector(".icon__btn");

    if (icon) {
      $pageStore.clicked = icon.id;
    }
  }
</script>

<div class="table">
  {#if header && rows.length}
    <div class="table__row table__header">
      {#each header as cell}
        <div class="table__cell" class:right={cell.align === "right"}>
          {#if cell && !cell.label}
            {cell}
          {/if}

          {#if cell.label}
            {cell.label}
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  {#if rows.length}
    {#each rows as row}
      <a
        class="table__row"
        class:cursor-pointer={row.cursor_pointer === true}
        sveltekit:prefetch
        href={row.href}
        on:click={rowClicked}
      >
        {#each row.cells as cell}
          {#if cell.type === "text"}
            <div class="table__cell">
              <div class="d-flex align-items-center">
                {#if cell.href}
                  <a class:h6={cell.large} sveltekit:prefetch href={cell.href}>{cell.title}</a>
                {:else}
                  <p class:h6={cell.large}>{cell.title}</p>
                {/if}

                {#if cell.subtitle}
                  <p class="text-gray">{cell.subtitle}</p>
                {/if}
              </div>
            </div>
          {/if}

          {#if row.type === "double"}
            <div class="table__cell">
              <div class="d-flex align-items-center">
                {#if cell.href}
                  <a sveltekit:prefetch href={cell.href}>{cell.title}</a>
                {:else}
                  <p>{cell.title}</p>
                {/if}
              </div>
            </div>
          {/if}

          {#if cell.type === "complex"}
            <div class="table__cell">
              <div class="d-flex align-items-center">
                {#each cell.rows as nested_row}
                  <div>
                    {#each nested_row as nested_cell}
                      {#if nested_cell.type === "text"}
                        <!-- <span class="block__text"> -->
                        {#if nested_cell.href}
                          <a sveltekit:prefetch href={nested_cell.href}>{nested_cell.title}</a>
                        {:else}
                          <p class:text-gray={nested_cell.text_gray}>{nested_cell.title}</p>
                        {/if}
                        <!-- </span> -->
                      {/if}

                      {#if nested_cell.type === "tag"}
                        <span class="tag">
                          <Tag {...nested_cell} small={true} />
                        </span>
                      {/if}
                    {/each}
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          {#if cell.type === "image"}
            <div class="table__cell table__cell__img">
              {#if cell.href}
                <a sveltekit:prefetch href={cell.href}>
                  <picture>
                    <img src={cell.src} alt={cell.alt} />
                  </picture>
                </a>
              {:else}
                <picture>
                  <img src={cell.src} alt={cell.alt} />
                </picture>
              {/if}
            </div>
          {/if}

          {#if cell.type === "tag"}
            <div class="table__cell" class:right={cell.align === "right"}>
              <Tag {...cell} align={"right"} />
            </div>
          {/if}

          {#if cell.type === "button" && !mobile}
            <!-- {#if cell.href}

          {/if} -->
            <div class="table__cell right">
              <CircleButton icon="arrowRight" {...cell} />
              <!-- {#if cell.icon}
              <CircleButton {...cell.icon} />
            {/if} -->
            </div>
          {/if}
        {/each}
      </a>
    {/each}
  {:else}
    <div class="table__row">
      <div class="table__cell">
        <p class="empty">{empty}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .table {
    display: table;
    width: 100%;
    color: var(--black);
  }

  .table__row {
    display: table-row;
    /* cursor: pointer; */
  }

  .table__header .table__cell {
    padding-top: 24px;
    padding-bottom: 24px;
    font-size: 13px;
    line-height: 1.38462;
    font-weight: 500;
    color: #b2b3bd;
  }

  .table__cell {
    display: table-cell;
    vertical-align: middle;
    padding-left: 20px;
    padding-top: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid #e4e4e4;
    color: var(--black);
    flex-grow: 1;
  }

  .table__cell.right {
    text-align: -webkit-right;
  }

  .table__borderless .table__cell {
    border-bottom: none;
  }

  .table__cell:first-child {
    padding-left: 0px;
  }

  .table__cell.thin {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .table__cell.thinnest {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .table__cell.icon {
    width: 20px;
    padding: 0;
    font-size: 0;
  }

  .table__cell picture {
    position: relative;
    z-index: 2;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    margin-right: 14px;
    border-radius: 12px;
    font-size: 0;
    /* align-self: baseline; */
  }

  .table__cell img {
    max-height: 100%;
  }

  .table__row:last-child > .table__cell {
    border-bottom: none;
  }

  .table__cell__img {
    width: 48px;
    height: 48px;
  }
  /* Utility Styles */
  .text-gray {
    color: var(--gray);
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .h6 {
    font-size: 18px;
    line-height: 1.5;
    font-weight: bold;
    color: var(--black);
  }

  p {
    display: inline-block;
  }

  a + a,
  a + p,
  p + p,
  a + span + a {
    display: flex;
  }

  @media only screen and (max-width: 1179px) {
    .table__cell {
      padding-left: 15px;
    }
    .table__preview {
      width: 86px;
      height: 64px;
    }
    .table__details {
      padding-left: 16px;
    }
    .table__bg {
      border-radius: 50%;
    }
    .table__color .table__text {
      display: none;
    }
  }

  @media only screen and (max-width: 1023px) {
    .table {
      display: block;
    }
    .table__header .table__cell {
      display: none;
    }
    .table__row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      justify-content: space-between;
      flex-basis: 100%;
      flex-wrap: wrap;
      /* margin-bottom: 2rem; */
    }
    .table__cell {
      display: block;
      padding: 16px 0px;
      border: none;
    }

    .table__cell__img {
      margin-right: 10px;
    }
  }

  @media only screen and (max-width: 767px) {
    .table {
      display: flex;
      flex-direction: column;
    }

    .table .table__row {
      margin-bottom: 2rem;
    }

    .table__row {
      display: flex;
      width: 100%;
      position: relative;
      padding: 32px;
      border-radius: 24px;
      background: #fff;
      -webkit-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 110px;
      -moz-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 110px;
      box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 110px;
      align-items: center;
      flex-wrap: none;
    }

    .table__cell {
      display: flex;
      width: 100%;
      padding: 0px;
      text-align: center;
      justify-content: center;
    }

    .table__cell picture {
      margin-right: 0px;
    }
  }
</style>
