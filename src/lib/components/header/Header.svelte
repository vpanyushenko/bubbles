<script>
  import { pageStore } from "$lib/stores/stores";
  import calcBreadcrumbs from "$lib/utils/breadcrumbs";
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import CircleButton from "$lib/components/inputs/circle-button/CircleButton.svelte";

  export let title = "";
  export let buttons = [];

  $: if (browser) document.body.classList.toggle("toggle", $pageStore.sidebar.is_toggled);
  $: if (browser)
    document.querySelector(".sidebar")
      ? document.querySelector(".sidebar").classList.toggle("active", $pageStore.sidebar.is_toggled)
      : null;

  $: breadcrumbs = calcBreadcrumbs($page.path);
  $: back = null;

  $: if (breadcrumbs.length > 1) {
    const backObject = breadcrumbs[breadcrumbs.length - 2];
    back = backObject.href;
  }

  function toggleSidebar(event) {
    $pageStore.sidebar.is_toggled = !$pageStore.sidebar.is_toggled ? true : false;
  }
</script>

<header>
  <div class="text">
    <div class="header__title">
      {#if breadcrumbs && breadcrumbs.length}
        <CircleButton icon="arrowLeft" href={back} />
      {/if}
      <h2>
        {title ? title : $pageStore.title}
      </h2>
    </div>
    {#if breadcrumbs && breadcrumbs.length}
      <h6 class="breadcrumbs">
        {#each breadcrumbs as breadcrumb, index}
          <a sveltekit:prefetch href={breadcrumb.href}>{breadcrumb.text}</a>
          {#if index !== breadcrumbs.length - 1}
            <span> / </span>
          {/if}
        {/each}
      </h6>
    {/if}
  </div>
  <div class="icons">
    <div class="header">
      <button class="header__burger" on:click={toggleSidebar} />
      <div class="header__buttons">
        {#each buttons as button}
          <CircleButton {...button} />
        {/each}
      </div>
    </div>
  </div>
</header>

<style>
  :global(header .icon__btn:not(:last-child)) {
    margin-right: 1rem;
  }

  :global(header .header__title .icon__btn) {
    margin-right: 8px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 48px 64px 44px;
  }

  .breadcrumbs a:hover {
    color: var(--gray) !important;
    transition: 0.3s;
  }

  .breadcrumbs a {
    text-transform: capitalize !important;
  }

  .breadcrumbs {
    margin-left: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .breadcrumbs > a {
    color: var(--black);
  }

  h2 {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .header__title {
    display: flex;
    align-items: center;
  }

  .page__row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .header {
    position: relative;
    z-index: 10;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 298px;
    margin-left: auto;
    justify-content: flex-end;
  }

  .header__user {
    display: none;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    font-size: 0;
  }

  .header__pic {
    width: 100%;
    min-height: 100%;
    border-radius: 50%;
  }

  .header__burger {
    display: none;
    width: 32px;
    height: 40px;
    margin-right: auto;
    font-size: 0;
  }

  .header__burger:before,
  .header__burger:after {
    content: "";
    display: inline-block;
    width: 32px;
    height: 2px;
    margin: 3px auto;
    border-radius: 1px;
    background: #1b1d21;
  }

  .header__buttons {
    display: flex;
  }

  .header__buttons:first-child {
    margin-right: 1rem;
  }

  /* .header__buttons > .icon__btn {
    margin-right: 1rem;
  } */

  .header__buttons > .icon__btn:last-child {
    margin-right: 0rem;
  }

  .breadcrumbs a:hover {
    color: var(--gray) !important;
    transition: 0.3s;
  }

  @media only screen and (max-width: 1339px) {
    header {
      max-width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin: 0 -16px;
      padding: 40px 0;
      padding-bottom: 40px;
    }

    /* h2 {
      display: flex;
      white-space: normal;
      text-overflow: ellipsis;
      overflow: auto;
    } */
    header .text,
    header .icons {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 calc(50% - 32px);
      flex: 0 0 calc(50% - 32px);
      max-width: calc(50% - 32px);
      margin: 0 16px;
      padding: 0;
    }

    header .icons {
      margin-left: 48px;
      display: contents;
    }
  }

  @media only screen and (max-width: 1023) {
    .breadcrumbs {
      margin-left: 48px;
    }

    header {
      -webkit-box-orient: vertical;
      -webkit-box-direction: reverse;
      -ms-flex-direction: column-reverse;
      /* flex-direction: column-reverse; */
      margin: 0;
      padding: 25px 0;
    }
  }

  @media only screen and (max-width: 767px) {
    header {
      padding: 0;
      -webkit-box-orient: vertical;
      -webkit-box-direction: reverse;
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
      margin: 0;
    }

    .header {
      height: 96px;
      max-width: calc(100% + 32px);
      margin: 0 -16px;
      padding: 0px;
      border-bottom: 1px solid #e4e4e4;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    header .text {
      padding: 16px 0px 28px;
      width: 100%;
      max-width: 100%;
    }
    header .icons {
      margin: 0;
      padding-top: 0;
    }

    .breadcrumbs {
      margin-left: 48px;
    }

    .header__burger {
      display: inline-block;
    }
  }
</style>
