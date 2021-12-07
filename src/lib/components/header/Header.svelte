<!--
  @component

  ### Add a header with a title, breadcrumbs, and action buttons
  ---
  #### Inputs
  - `@param {String} title` - The string for the header. You can also add a `title` property to the `pageStore`, which will add the title to the header
  - `@param {Boolean} [true] breadcrumbs` - Selects if you want to include breadcrumbs, defaults to true. The breadcrumbs will be automatically set for you but if you want to manually set them, use `pageStore`
  - `@param {Array<Object>} buttons - An array of buttons that you want to add. 
  ---
  #### Example

  ```js
  {
    title: "Page Title",
    breadcrumbs: false,
    buttons: [
      {
        icon: "add" //use one of the bundled icons or pass in your own svg
        onclick: () => someFunction(), //you can all a function on click, like opening a moda;
        href: null, //if you want this button to bring you to a different page. The benefit of href instead of onclick here is that the page will prefetch on hover for a faster load
        dropdown: [] //if you want to open a menu of options, you can pass them in here
      },
      {
        icon: "more" //use one of the bundled icons or pass in your own svg
        onclick: null,
        href: null,
        dropdown: [
          {
            label: "Option 1",
            caption: "This is an option caption"
            href: "/about"
          },
          {
            label: "Option 2",
            caption: "This is an example with onclick",
            onclick: () => someFunction() //can use onclick instead of href
          }
        ]
      }
    ]
  }
  
  ```

  ---
-->
<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/stores";
  import { page } from "$app/stores";
  import { browser } from "$app/env";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import { onMount } from "svelte";

  export let title = "";
  export let subtitle = "";
  export let breadcrumbs = true;
  export let breadcrumb_labels = [];
  export let buttons = [];
  export let sticky = true;

  const icon_id = uuid();
  const header_id = uuid();

  let y = 0; //TODO: Add options to sticky headers

  $: intersection_ratio = 1;

  // onMount(() => {
  //   if (sticky) {
  //     const header = document.getElementById(header_id);

  //     function buildThresholdList() {
  //       let thresholds = [];
  //       let numSteps = 100;

  //       for (let i = 1.0; i <= numSteps; i++) {
  //         let ratio = i / numSteps;
  //         thresholds.push(ratio);
  //       }

  //       thresholds.push(0);
  //       return thresholds;
  //     }

  //     console.log(buildThresholdList());

  //     function handleIntersect(entries, observer) {
  //       entries.forEach((entry) => {
  //         // console.log(entry);

  //         if (entry.intersectionRatio < 0.33) {
  //           intersection_ratio = entry.intersectionRatio;
  //         } else {
  //           intersection_ratio = 1;
  //         }

  //         // if (entry.intersectionRatio > prevRatio) {
  //         //   entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
  //         // } else {
  //         //   entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
  //         // }

  //         // prevRatio = entry.intersectionRatio;
  //       });
  //     }

  //     const observer = new IntersectionObserver(handleIntersect, {
  //       threshold: buildThresholdList(),
  //       rootMargin: "-100px",
  //     });

  //     observer.observe(header);
  //   }
  // });

  if (title) {
    $pageStore.title = title;
  }

  $: if (browser) document.body.classList.toggle("toggle", $pageStore.sidebar.is_toggled);
  $: if (browser)
    document.querySelector(".sidebar")
      ? document.querySelector(".sidebar").classList.toggle("active", $pageStore.sidebar.is_toggled)
      : null;

  $: _breadcrumbs = calcBreadcrumbs($page.path);
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

    if (pathArray.length <= 1) {
      return [];
    } else {
      const breadcrumbs = pathArray.map((crumb, index) => {
        let href = "";

        for (let i = 0; i <= index; i++) {
          href += `/${pathArray[i]}`;
        }

        if (pathArray.length - 1 === index && $pageStore.title) {
          crumb = $pageStore.title;
        }

        if (breadcrumb_labels && breadcrumb_labels.length > 0 && breadcrumb_labels[index]) {
          crumb = breadcrumb_labels[index];
        }

        const obj = {
          text: pathArray.length - 3 >= index ? "..." : crumb,
          href: href,
        };
        return obj;
      });

      return breadcrumbs;
    }
  }

  // $: console.log(_breadcrumbs);
</script>

<svelte:head>
  <title>{$pageStore.title}</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<!-- {#if intersection_ratio !== 0} -->
<header id={header_id} style="opacity: {intersection_ratio * 3}">
  <div class="text">
    <div class="header__title">
      {#if !subtitle && breadcrumbs && _breadcrumbs && _breadcrumbs.length}
        <IconButton icon="arrowLeft" href={back} id={icon_id} />
      {/if}

      <div class="header__text">
        <h2>{$pageStore.title}</h2>

        {#if subtitle}
          <h6>{@html subtitle}</h6>
        {/if}

        {#if !subtitle && breadcrumbs && _breadcrumbs && _breadcrumbs.length}
          <h6 class="breadcrumbs">
            {#each _breadcrumbs as breadcrumb, index}
              <a sveltekit:prefetch href={breadcrumb.href} on:click={() => ($pageStore.clicked = icon_id)}
                >{breadcrumb.text}</a
              >
              {#if index !== _breadcrumbs.length - 1}
                <span> / </span>
              {/if}
            {/each}
          </h6>
        {/if}
      </div>
    </div>
  </div>
  <div class="icons">
    <div class="header">
      <button class="header__burger" on:click={toggleSidebar} />
      <div class="header__buttons">
        {#each buttons as button}
          <IconButton {...button} />
        {/each}
      </div>
    </div>
  </div>
</header>

<!-- {#if sticky && intersection_ratio <= 0.5}
  <header class="sticky" style="opacity: .2">
    <div class="text">
      <div class="header__title">
        {#if !subtitle && breadcrumbs && _breadcrumbs && _breadcrumbs.length}
          <IconButton icon="arrowLeft" href={back} id={icon_id} />
        {/if}

        <div class="header__text">
          <h2>{$pageStore.title}</h2>

          {#if subtitle}
            <h6>{@html subtitle}</h6>
          {/if}

          {#if !subtitle && breadcrumbs && _breadcrumbs && _breadcrumbs.length}
            <h6 class="breadcrumbs">
              {#each _breadcrumbs as breadcrumb, index}
                <a sveltekit:prefetch href={breadcrumb.href} on:click={() => ($pageStore.clicked = icon_id)}
                  >{breadcrumb.text}</a
                >
                {#if index !== _breadcrumbs.length - 1}
                  <span> / </span>
                {/if}
              {/each}
            </h6>
          {/if}
        </div>
      </div>
    </div>
    <div class="icons">
      <div class="header">
        <button class="header__burger" on:click={toggleSidebar} />
        <div class="header__buttons">
          {#each buttons as button}
            <IconButton {...button} />
          {/each}
        </div>
      </div>
    </div>
  </header>
{/if} -->

<!-- {/if} -->
<style>
  :global(header .icon__btn:not(:last-child)) {
    margin-right: 1rem;
  }

  :global(header .header__title .icon__btn) {
    margin-right: 8px;
    padding-bottom: 1.6rem;
  }

  .sticky {
    /* position: -webkit-sticky; */
    position: fixed;
    top: 0;
    align-self: flex-start;
    background-color: red;
    z-index: 10;
    /* left: 0;
    right: 0; */
    /* width: 100%; */
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 3rem 4rem 2.75rem;
  }

  header.sticky {
    padding: 1rem 4rem 1rem;
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
    width: 2.5rem;
    height: 2.5rem;
    font-size: 0;
  }

  .header__pic {
    width: 100%;
    min-height: 100%;
    border-radius: 50%;
  }

  .header__burger {
    display: none;
    width: 2rem;
    height: 2.5rem;
    margin-right: auto;
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

    /* h2 {
      display: flex;
      white-space: normal;
      text-overflow: ellipsis;
      overflow: auto;
    } */
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

  /* @media only screen and (max-width: 1023) {
    .breadcrumbs {
      margin-left: 3rem;
    }

    header {
      -webkit-box-orient: vertical;
      -webkit-box-direction: reverse;
      -ms-flex-direction: column-reverse;
      margin: 0;
      padding: 25px 0;
    }
  } */

  @media only screen and (max-width: 1179px) {
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
      max-width: calc(100% + 2rem);
      margin: 0 -1rem;
      padding: 0px;
      border-bottom: 1px solid #e4e4e4;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    header .text {
      padding: 1rem 0px 28px;
      width: 100%;
      max-width: 100%;
    }
    header .icons {
      margin: 0;
      padding-top: 0;
    }

    .header__burger {
      display: inline-block;
    }
  }

  @media only screen and (max-width: 767px) {
  }

  :global(header .header__title .icon__btn) {
    padding-bottom: 1.7rem;
  }
</style>
