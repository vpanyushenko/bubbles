<!--
  @component
  @param {Array<Object>} rows - the rows that will be included
  @example: rows = [
    {
      title: "Title",
      large: true, // makes the title large,
      subtitle: "subtitle",
      href: "/"
    },
  ]
-->
<script>
  import { pageStore } from "$lib/stores/page.store";
  import Tag from "$lib/components/Tag.svelte";
  import CircleButton from "$lib/components/inputs/circle-button/CircleButton.svelte";

  export let rows = [];
  export let empty = "Nothing here yet.";

  function rowClicked(event) {
    const icon = event.currentTarget.querySelector(".icon__btn");

    if (icon) {
      $pageStore.clicked = icon.id;
    }
  }
</script>

<div class="table">
  {#if rows.length}
    {#each rows as row}
      <a
        class="table__row"
        class:cursor-pointer={row.cursor_pointer === true}
        sveltekit:prefetch
        href={row.href}
        on:click={rowClicked}
      >
        <div class="table__cell">
          <div class="d-flex align-items-center">
            <p class:h6={row.large}>{row.title}</p>

            {#if row.subtitle}
              <p class="text-gray">{row.subtitle}</p>
            {/if}
          </div>
        </div>

        <div class="table__cell right">
          <CircleButton icon="arrowRight" {...row} />
        </div>
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
  /* 
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
    }
    .table__cell {
      display: block;
      padding: 16px 0px;
      border: none;
    }

    .table__cell__img {
      margin-right: 10px;
    }
  } */

  /* @media only screen and (max-width: 767px) {
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
  } */
</style>
