<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/stores";
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import IconButton from "$lib/components/button/IconButton.svelte";

  export let title = "";
  export let subtitle = "";
  export let caption = "";
  export let breadcrumbs = true;
  export let buttons = [];
  export let breadcrumb_labels = [];
  // export let sticky = true;

  if (!subtitle) {
    subtitle = caption;
  }

  const icon_id = uuid();
  const header_id = uuid();

  let y = 0; //TODO: Add options to sticky headers
  // $: _sticky = y >= 200 ? true : false;
  let _sticky = false;

  $: intersection_ratio = 1;

  if (title) {
    $pageStore.title = title;
  }

  $: if (browser) document.body.classList.toggle("toggle", $pageStore.sidebar.is_toggled);
  $: if (browser)
    document.querySelector(".sidebar")
      ? document.querySelector(".sidebar").classList.toggle("active", $pageStore.sidebar.is_toggled)
      : null;

  $: _breadcrumbs = Array.isArray(breadcrumbs) ? breadcrumbs : calcBreadcrumbs($page.url.pathname);

  $: back = null;

  $: if (_breadcrumbs.length > 1) {
    const backObject = _breadcrumbs[_breadcrumbs.length - 2];
    back = backObject.href;
  }

  function toggleSidebar(event) {
    $pageStore.sidebar.is_toggled = !$pageStore.sidebar.is_toggled ? true : false;
  }

  function calcBreadcrumbs(path) {
    const pathArray = path.split("/").filter(Boolean);

    if (pathArray.length > 0 && !$pageStore.title) {
      pageStore.update((data) => {
        const title = pathArray[pathArray.length - 1];
        data.title = title.charAt(0).toUpperCase() + title.slice(1);
        return data;
      });
    }

    if (pathArray.length <= 1 && path.substring(0, 2) !== "**/") {
      return [];
    } else {
      const breadcrumbs = pathArray.map((crumb, index) => {
        let href = "";

        for (let i = 0; i <= index; i++) {
          if (pathArray[i] === "**") {
            if (!href) {
              href += "/";
            }
          } else {
            if (href.slice(-1) === "/") {
              href += pathArray[i];
            } else {
              href += `/${pathArray[i]}`;
            }
          }
        }

        if (pathArray.length - 1 === index && $pageStore.title) {
          crumb = $pageStore.title;
        }

        if (breadcrumb_labels && breadcrumb_labels.length > 0 && breadcrumb_labels[index]) {
          crumb = breadcrumb_labels[index];
        }

        const obj = {
          label: pathArray.length - 3 >= index ? "..." : crumb,
          href: href,
        };

        return obj;
      });

      return breadcrumbs;
    }
  }
</script>

<svelte:head>
  <title>{$pageStore.title}</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<!-- {#if intersection_ratio !== 0} -->
<header id={header_id} style="opacity: {intersection_ratio * 3}" class:sticky={_sticky}>
  <div class="text">
    <div class="header__title">
      {#if breadcrumbs && _breadcrumbs && _breadcrumbs.length}
        <span class="back__icon">
          <IconButton icon="arrowLeft" href={back} id={icon_id} />
        </span>
      {:else if $pageStore?.sidebar?.is_mounted}
        <button class="header__burger" on:click={toggleSidebar} />
      {/if}

      <div class="header__text">
        <h2>{$pageStore.title}</h2>
      </div>
    </div>

    <div class:header__subtitle={breadcrumbs && _breadcrumbs && _breadcrumbs.length ? true : false}>
      <slot>
        {#if subtitle}
          <h6>{@html subtitle}</h6>
        {:else if !subtitle && breadcrumbs && _breadcrumbs && _breadcrumbs.length}
          <h6 class="breadcrumbs">
            {#each _breadcrumbs as breadcrumb, index}
              <a sveltekit:prefetch href={breadcrumb.href} on:click={() => ($pageStore.clicked = icon_id)}
                >{breadcrumb.label}</a
              >
              {#if index !== _breadcrumbs.length - 1}
                <span> / </span>
              {/if}
            {/each}
          </h6>
        {/if}
      </slot>
    </div>
  </div>
  <div class="icons">
    <div class="header">
      <div class="header__buttons">
        {#each buttons as button}
          <span class="header__button">
            <IconButton {...button} />
          </span>
        {/each}
      </div>
    </div>
  </div>
</header>

<!-- {/if} -->
<style>
  .header__button:not(:last-child) {
    margin-right: 1rem;
  }

  header .header__title .back__icon {
    margin-right: 8px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 3rem 4rem 2.75rem;
  }

  header.sticky {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: red;
    position: fixed;
    z-index: 99;
  }

  .header__text {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .breadcrumbs a:hover {
    color: var(--gray) !important;
    transition: 0.3s;
  }

  .breadcrumbs a {
    text-transform: capitalize !important;
  }

  .breadcrumbs {
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

  .header__subtitle {
    padding-left: 3.75rem;
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

  .header__burger {
    display: none;
    width: 2rem;
    height: 2.5rem;
    margin-right: 1.5rem;
    font-size: 0;
  }

  .header__burger:before,
  .header__burger:after {
    content: "";
    display: inline-block;
    width: 2rem;
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

  .breadcrumbs a:hover {
    color: var(--gray) !important;
    transition: 0.3s;
  }

  @media only screen and (max-width: 1419px) {
    header {
      padding: 3rem 3rem 2.75rem;
    }
  }

  @media only screen and (max-width: 1339px) {
    header {
      max-width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin: 0;
      padding: 2.5rem 0;
      padding-bottom: 2.5rem;
    }

    header .text,
    header .icons {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 calc(50% - 2rem);
      flex: 0 0 calc(50% - 2rem);
      max-width: calc(50% - 2rem);
      margin: 0 0rem;
      padding: 0;
    }

    header .icons {
      margin-left: 3rem;
      display: contents;
    }
  }

  @media only screen and (max-width: 1179px) {
    header {
      padding-top: 3rem;
    }

    header .text {
      padding: 0px 0px 28px;
      width: 100%;
      max-width: 100%;
    }
    header .icons {
      margin: 0;
      padding-top: 0;
    }

    .icons .header {
      padding-top: 0.25rem;
      align-self: flex-start;
    }

    .header__text {
      align-self: flex-start;
    }

    .header__burger {
      display: block;
    }
  }

  @media only screen and (max-width: 767px) {
    header .text {
      align-self: baseline;
      padding: 0;
    }

    .header__text {
      align-self: center;
    }

    .header__text h2 {
      font-size: 1.5rem;
    }

    .header__subtitle {
      padding-left: 3.25rem;
    }

    .header__burger {
      margin-right: 1rem;
    }

    header .icons {
      padding-top: 0;
    }
  }
</style>
