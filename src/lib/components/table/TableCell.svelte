<script>
  import { pageStore } from "$lib/utils/stores";
  import { navigating } from "$app/stores";
  import Tag from "$lib/components/tag/Tag.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import Checkbox from "$lib/components/checkbox/Checkbox.svelte";
  import Spinner from "$lib/components/spinner/Spinner.svelte";
  import { onMount } from "svelte";
  import { showLoading } from "$lib/utils/loading";

  export let id = "";
  export let href = null;
  export let text = "";
  export let caption = "";
  export let large = false;
  export let bold = false;
  export let empty = false;

  if (empty) {
    text = " ";
  }

  /**
   * @prop {("left"|"right")} [align="left"] - aligns the text in the cell to the left or right (end) of the cell
   */
  export let align = "left";

  /**
   * @prop {?Number} [mobile_width=null]
   */
  export let mobile_width = null;

  /**
   * @prop {Number} [mobile_order=0]
   */
  export let mobile_order = 0;
  export let width = null;
  export let wrap = true;
  export let mobile_wrap = true;

  //conditions passed for custom cell types
  export let rows = [];
  export let img = null;
  export let tag = null;
  export let button = null;
  export let checkbox = null;

  let _table_row_icon_button_id = false;
  let _dom_element;
  let _type = null;
  let _checkbox_cell;

  if (text) {
    _type = "text";
  } else if (rows.length) {
    _type = "stacked";
  } else if (img) {
    _type = "image";
  } else if (tag) {
    _type = "tag";
  } else if (button) {
    _type = "button";
  } else if (checkbox) {
    _type = "checkbox";
  }

  let mobile_hidden = false;
  let hidden = false;
  let style = "";

  if (isNaN(mobile_width) === false && mobile_width && mobile_width !== null) {
    style += `flex:${mobile_width}%;`;
  }

  if (mobile_width === "min") {
    style += `flex:0%;`;
  }

  if (mobile_width === 0) {
    mobile_hidden = true;
  }

  if (mobile_order) {
    style += `order:${mobile_order};`;
  }

  if (width === "min") {
    style += `width:0%;`;
  }

  if (width === 0) {
    hidden = true;
  }

  if (width && width !== "min") {
    if (isNaN(width)) {
      style += `width:${width};`;
    } else {
      style += `width:${width}%;`;
    }
  }

  onMount(() => {
    //find the nearest table (js-bubbles-table)
    //see if the table has an icon button to show a loading animation for
    if (_dom_element && href) {
      _table_row_icon_button_id = _dom_element.closest(".row").querySelector(".icon__btn").querySelector("button").id;
    }
  });

  function hrefClicked(event) {
    showLoading(_table_row_icon_button_id);
  }

  function selectItem(event) {
    $pageStore.table.selected_table_rows = 0;
    let total = _checkbox_cell.closest(".js-bubbles-table").querySelectorAll(".js-bubbles-table-row").length;

    _checkbox_cell
      .closest(".js-bubbles-table")
      .querySelectorAll(".js-bubbles-table-row")
      .forEach((row) => {
        if (row.querySelector(".checkbox").querySelector("input").checked) {
          $pageStore.table.selected_table_rows++;
        }
      });

    let header = _checkbox_cell.closest(".js-bubbles-table").querySelector(".header");
    $pageStore.table.id = _checkbox_cell.closest(".js-bubbles-table").id;

    if ($pageStore.table.selected_table_rows === total && header) {
      header.querySelector(".checkbox").querySelector("input").checked = true;
    } else {
      header.querySelector(".checkbox").querySelector("input").checked = false;
    }
  }
</script>

{#if _type === "text"}
  <div
    class="cell"
    class:mobile__hidden={mobile_hidden}
    class:hidden
    class:right={align === "right" || align === "end"}
    class:nowrap={wrap === false}
    class:mobile__nowrap={mobile_wrap === false}
    {style}
    {id}
    bind:this={_dom_element}
  >
    <div class="flex align-items-center">
      {#if href}
        <span class="href-container">
          {#if $navigating && $navigating?.to?.pathname === href && !_table_row_icon_button_id}
            <Spinner style="margin: 0 0.5rem 0 0" />
          {/if}
          <a
            class:h6={large}
            class:bold
            sveltekit:prefetch
            {href}
            on:click={hrefClicked}
            class:nowrap={wrap === false}
            class:mobile__nowrap={mobile_wrap === false}>{text}</a
          >
        </span>
      {:else}
        <p class:h6={large} class:bold class:nowrap={wrap === false} class:mobile__nowrap={mobile_wrap === false}>
          {text}
        </p>
      {/if}

      {#if caption}
        <p class="text-gray" class:nowrap={wrap === false} class:mobile__nowrap={mobile_wrap === false}>
          {@html caption}
        </p>
      {/if}
    </div>
  </div>
{/if}

{#if _type === "stacked"}
  <div
    class="cell"
    class:mobile__hidden={mobile_hidden}
    class:hidden
    class:right={align === "right" || align === "end"}
    class:nowrap={wrap === false}
    class:mobile__nowrap={mobile_wrap === false}
    {style}
    bind:this={_dom_element}
  >
    <div class="d-flex align-items-center">
      {#each rows as nested_row}
        <div class="nested__row">
          {#each nested_row as nested_cell}
            {#if nested_cell.tag?.label}
              <span class="tag">
                <Tag {...nested_cell.tag} small={true} margin=".2rem .25rem 0 0" />
              </span>
            {/if}

            {#if nested_cell.text}
              {#if nested_cell.href}
                <a
                  sveltekit:prefetch
                  href={nested_cell.href}
                  on:click={hrefClicked}
                  class:nowrap={wrap === false}
                  class:mobile__nowrap={mobile_wrap === false}>{nested_cell.text}</a
                >
              {:else}
                <p
                  class:text-gray={nested_cell.text_gray}
                  class:nowrap={wrap === false}
                  class:mobile__nowrap={mobile_wrap === false}
                >
                  {nested_cell.text}
                </p>
              {/if}
            {/if}

            {#if nested_cell.tag?.label && (nested_cell.tag?.align === "right" || nested_cell.tag?.align === "end")}
              <span class="tag">
                <Tag {...nested_cell.tag} small={true} margin="0 0 .2rem .25rem" />
              </span>
            {/if}
          {/each}
        </div>
      {/each}
    </div>
  </div>
{/if}

{#if _type === "image"}
  <div class="cell image" class:mobile__hidden={mobile_hidden} class:hidden {style} bind:this={_dom_element}>
    {#if href}
      <a sveltekit:prefetch {href}>
        <picture>
          <img src={img.src} alt={img.alt} />
        </picture>
      </a>
    {:else}
      <picture>
        <img src={img.src} alt={img.alt} />
      </picture>
    {/if}
  </div>
{/if}

{#if _type === "tag"}
  <div
    class="cell"
    class:mobile__hidden={mobile_hidden}
    class:hidden
    {style}
    class:right={align === "right" || align === "end"}
  >
    <Tag {...tag} />
  </div>
{/if}

{#if _type === "button"}
  <div
    class="cell right"
    class:mobile__hidden={mobile_hidden}
    class:hidden
    {style}
    class:__clickable={button.icon === "arrowRight" || !button.icon}
  >
    <IconButton icon="arrowRight" {...button} />
  </div>
{/if}

{#if _type === "checkbox"}
  <div class="cell no-width" class:mobile__hidden={mobile_hidden} class:hidden {style} bind:this={_checkbox_cell}>
    <div class="flex">
      <Checkbox {...checkbox} onchange={selectItem} />
    </div>
  </div>
{/if}

{#if !_type}
  <div
    class="cell"
    class:right={align === "right" || align === "end"}
    class:mobile__hidden={mobile_hidden}
    class:hidden
    {style}
    class:nowrap={wrap === false}
    class:mobile__nowrap={mobile_wrap === false}
  >
    <slot>--</slot>
  </div>
{/if}

<style>
  .flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .href-container {
    display: flex;
  }

  .nowrap {
    white-space: nowrap;
  }

  .cell {
    display: table-cell;
    vertical-align: middle;
    padding-left: 1.25rem;
    /* padding-top: 2rem;
    padding-bottom: 2rem; */
    border-bottom: 1px solid var(--gray-light);
    color: var(--black);
    flex-grow: 1;
  }

  .cell a:hover {
    color: var(--primary);
  }

  .cell.right {
    text-align: -webkit-right;
  }

  .cell:first-child {
    padding-left: 0px;
  }

  .cell picture {
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
    width: 3rem;
    height: 3rem;
    margin-right: 0.875rem;
    border-radius: 12px;
    font-size: 0;
    /* align-self: baseline; */
  }

  .cell img {
    max-height: 100%;
  }

  .image {
    width: 3rem;
    height: 3rem;
  }
  /* Utility Styles */
  .text-gray {
    color: var(--gray);
  }

  .h6 {
    font-size: 1.125rem;
    line-height: 1.5;
    font-weight: bold;
    color: var(--black);
  }

  .bold {
    font-weight: bold;
  }

  .no-width {
    width: 0px;
  }

  p {
    display: inline-block;
    margin: 0;
  }

  a + a,
  a + p,
  p + p,
  a + span + a {
    display: flex;
  }

  .nested__row {
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 1179px) {
    .cell {
      padding-left: 15px;
    }
  }

  @media only screen and (max-width: 1023px) {
    .image {
      margin-right: 0.625rem;
    }
  }

  @media only screen and (max-width: 767px) {
    /* .cell {
      display: flex;
      width: 100%;
      padding: 0.75rem 0rem;
      text-align: left;
      justify-content: center;
      display: block;
      border: none;
      flex-basis: content;
    } */

    /* .cell {
      padding: 0.75rem 0rem;
    }

    .cell:not(:last-child) {
      padding-right: 1rem;
    } */

    .cell picture {
      margin-right: 0px;
    }

    .cell + .cell.image picture {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }

    .mobile__hidden {
      display: none;
    }

    .mobile__nowrap {
      white-space: nowrap;
    }
  }
</style>
