<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/utils/stores";
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import IconButton from "$lib/components/button/IconButton.svelte";

  export let title = "";
  export let subtitle = "";
  export let caption = "";

  /**
   * @prop {Boolean|Array<Object>} - false to disable. {label: String, href: String} for custom ones.
   * @example
   *
   * breadcrumbs={[{ label: "hello", href: "/hello" }, { label: "World", href: "/hello/world" }]}
   *
   */
  export let breadcrumbs = true;
  export let buttons = [];
  export let breadcrumb_labels = [];
  // export let sticky = true;

  $: if (!subtitle) {
    subtitle = caption;
  }

  const icon_id = uuid();
  const header_id = uuid();

  let y = 0; //TODO: Add options to sticky headers
  // $: _sticky = y >= 200 ? true : false;
  let _sticky = false; //TODO:

  $: intersection_ratio = 1;

  $: if (title) {
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

        if (index === 0) {
          obj.label = "🏠";
        }

        return obj;
      });

      return breadcrumbs;
    }
  }

  // --gutterWidth: calc(var(--windowWidth)/2 - var(--layoutWidth)/2);
</script>

<svelte:head>
  <title>{$pageStore.title}</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<!-- {#if intersection_ratio !== 0} -->

<header id={header_id} style="opacity: {intersection_ratio * 3}" class:sticky={_sticky}>
  <div class="header__row">
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
    </div>
    <div class="icons">
      <div class="header__buttons">
        {#each buttons as button}
          <span class="header__button">
            <IconButton {...button} />
          </span>
        {/each}
      </div>
    </div>
  </div>

  <div class="breadcrumb__row" class:burger__indent={breadcrumbs}>
    <div class:header__subtitle={breadcrumbs && _breadcrumbs && _breadcrumbs.length ? true : false}>
      <slot>
        {#if subtitle}
          <p>{@html subtitle}</p>
        {:else if !subtitle && breadcrumbs && _breadcrumbs && _breadcrumbs.length}
          <p class="breadcrumbs">
            {#each _breadcrumbs as breadcrumb, index}
              <a sveltekit:prefetch href={breadcrumb.href} on:click={() => ($pageStore.clicked = icon_id)}
                >{breadcrumb.label}</a
              >
              {#if index !== _breadcrumbs.length - 1}
                <span> / </span>
              {/if}
            {/each}
          </p>
        {/if}
      </slot>
    </div>
  </div>
</header>

{#if _sticky}
  <div class="sticky" />
{/if}

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
    flex-direction: column;
    width: 100%;
    padding: 3rem 4rem 2.75rem;
  }

  header.sticky {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    /* background-color: red; */
    position: sticky;
    top: 0px;
    /* margin-left: calc(50% - 50vw - 426px); */
    z-index: 10;
    /* position: fixed;
    width: 100vw;
    top: 0px;
    left: 0px; */
    /* width: calc((100vw - 0px) / 2 - (1200px / 2)); */
  }
  /* 
  div.sticky {
    width: 100vw;
    left: 0px;
    position: fixed;
    margin: 0;
    height: 70px;
    top: 0px;
    z-index: 9;
    background-color: aquamarine;
  } */

  header .breadcrumb__row,
  header .header__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header .header__row {
    width: 100%;
  }

  header .breadcrumb__row p {
    margin-bottom: 0;
  }
  /* header .breadcrumb__row a {
    color: transparent;
    text-shadow: 0 0 0 var(--gray-dark);
  } */

  .burger__indent {
    margin-left: 3.75rem;
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

  /* .header {
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
  } */

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
    margin-right: 0.25rem;
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
      display: flex;
      justify-content: end;
      width: 0;
    }
  }

  @media only screen and (max-width: 1179px) {
    header {
      padding-top: 3rem;
    }

    header .text {
      width: 100%;
      max-width: 100%;
    }
    header .icons {
      margin: 0;
      padding-top: 0;
      align-self: flex-start;
    }

    .header__text {
      align-self: flex-start;
    }

    .header__burger {
      display: block;
    }
  }

  @media only screen and (max-width: 1062px) {
    .burger__indent {
      margin-left: 3.5rem;
    }
  }

  @media only screen and (max-width: 767px) {
    header .text {
      align-self: baseline;
      padding: 0;
    }

    header .icons {
      -ms-flex: 0;
      flex: 0;
    }

    .header__text {
      align-self: center;
    }

    .header__text h2 {
      font-size: 1.5rem;
    }

    .header__burger {
      margin-right: 1rem;
    }

    header .icons {
      padding-top: 0;
    }

    .burger__indent {
      margin-left: 3rem;
    }
  }
</style>
