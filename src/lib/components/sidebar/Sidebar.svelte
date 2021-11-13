<script>
  import { onMount } from "svelte";
  import { pageStore } from "$lib/stores/stores";
  import { navigating, page } from "$app/stores";
  import { browser } from "$app/env";
  import { hexToRgb, getColorFilter } from "$lib/utils/colors";

  export let sections = [];
  export let logo = null;

  onMount(() => {
    const primaryhex = getComputedStyle(document.documentElement).getPropertyValue("--primary");

    if (primaryhex) {
      const rgb = hexToRgb(`${primaryhex.trim()}`);

      const iconFilter = getColorFilter(rgb);
      let filter = iconFilter.filter.split("filter: ")[1];
      filter = filter.substring(0, filter.length - 1);

      document.documentElement.style.setProperty("--sidebar-hover-filter", filter);
    }
  });

  const sectionsWithTitles = {};
  const path = $page.path.split("/").filter(Boolean)[0];
  let activeSection = sections.find((a) => a.active === true);

  sections.forEach((section, index) => {
    if (!section.id) {
      section.id = index + 1;
    }

    if (!activeSection) {
      if (path === section.href.split("/").filter(Boolean)[0]) {
        activeSection = true;

        $pageStore.sidebar.active_item = section.id;
      } else if (section.href_aliases) {
        const urls = section.href_aliases.map((href) => href.split("/").filter(Boolean)[0]);
        const aliasActiveSection = urls.find((a) => a === path);

        if (aliasActiveSection) {
          activeSection = true;

          $pageStore.sidebar.active_item = section.id;
        }
      }
    }

    if (!sectionsWithTitles[section.section]) {
      sectionsWithTitles[section.section] = [];
    }

    section = section;
    sectionsWithTitles[section.section].push(section);
  });

  function sidebarItemSelected(obj) {
    $pageStore.sidebar.active_item = obj.id;
  }

  function formatSidebar(sections, pageStore) {
    const keys = Object.keys(sections);

    keys.forEach((key) => {
      const array = sections[key];
      array.forEach((sidebarItem) => {
        if (sidebarItem.id === pageStore.sidebar.active_item) {
          sidebarItem.active = true;
        } else {
          sidebarItem.active = false;
        }
      });
    });

    return sections;
  }

  $: _sections = formatSidebar(sectionsWithTitles, $pageStore);

  $: if (browser) document.body.classList.toggle("toggle", $pageStore.sidebar.is_toggled);

  function toggleSidebar(event) {
    $pageStore.sidebar.is_toggled = !$pageStore.sidebar.is_toggled ? true : false;
  }
</script>

<nav class="sidebar" class:active={$pageStore.sidebar.is_toggled}>
  <section class="top">
    <a href="/">
      <img src={logo} alt="Logo" />
    </a>
    <button on:click={toggleSidebar} />
  </section>

  <section class="sidebar__wrapper">
    <div class="sidebar__inner">
      <div class="sidebar__list">
        {#each Object.keys(_sections) as section}
          <div class="sidebar__group">
            <div class="caption">{section}</div>
            <div class="sidebar__menu">
              {#each _sections[section] as obj}
                <a
                  class="sidebar__item cursor-pointer"
                  class:active={obj.active}
                  sveltekit:prefetch
                  href={obj.href}
                  on:click={() => ($pageStore.sidebar.is_toggled = false)}
                  on:click={() => {
                    sidebarItemSelected(obj);
                  }}
                >
                  {#if obj.icon}
                    <div class="sidebar__icon">
                      <!-- <Icon src={obj.icon} href={obj.href} /> -->
                      <span class="spinner" class:hidden={!$navigating || $navigating.to.path !== obj.href} />
                      <img class:hidden={$navigating && $navigating.to.path === obj.href} src={obj.icon} alt="Icon" />
                    </div>
                  {/if}

                  <div class="sidebar__text">{obj.title}</div>
                  {#if obj.notifications}
                    <div class="sidebar__counter">{obj.notifications}</div>
                  {/if}
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 256px;
    height: 100vh;
    padding: 2.5rem 0 4.5rem;
    background: #ffffff;
    border-right: 1px solid var(--gray-light);
    z-index: 5;
    overflow-y: scroll;
  }

  .top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: flex-start;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 96px;
    padding-left: 2.5rem;
  }

  nav .top > a > img {
    max-width: 176px;
    max-height: 2.5rem;
    justify-content: flex-start;
  }

  .sidebar.active .top img {
    opacity: 0;
  }

  .sidebar.active {
    overflow-y: scroll;
    padding-bottom: 0;
  }

  nav button {
    position: absolute;
    top: 0;
    right: 0;
    display: none;
    width: 96px;
    height: 96px;
    padding: 1.25rem;
    border-bottom: 1px solid transparent;
    font-size: 0;
  }

  nav button:before,
  nav button:after {
    content: "";
    display: inline-block;
    width: 2rem;
    height: 2px;
    margin: 3px auto;
    border-radius: 1px;
    background: var(--dark);
  }

  .caption {
    margin-bottom: 1rem;
    padding-left: 1.25rem;
    color: var(--gray);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
  }

  .sidebar__group:not(:last-child) {
    position: relative;
    margin-bottom: 2.5rem;
    padding-bottom: 30px;
  }

  .sidebar__group:not(:last-child):before {
    content: "";
    position: absolute;
    left: 1.25rem;
    right: 1.25rem;
    bottom: 0;
    height: 1px;
    background: var(--gray-light);
  }

  .sidebar__wrapper {
    padding: 72px 24px 0px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .sidebar__wrapper::-webkit-scrollbar {
    display: none;
  }

  .sidebar__inner {
    width: 215px;
    overflow: hidden;
    -webkit-transition: width 0.25s;
    -o-transition: width 0.25s;
    transition: width 0.25s;
  }

  .sidebar__list {
    margin-bottom: 1.25rem;
  }

  .sidebar__item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 56px;
    padding: 0 1.25rem;
    border-radius: 12px;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--gray);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .sidebar__item:hover {
    color: var(--primary);
    background: var(--gray-lighter);
  }

  .sidebar__item.active {
    background: var(--primary);
    color: var(--white);
  }

  .sidebar__icon {
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
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    font-size: 0;
  }
  .sidebar__icon img {
    font-size: 1.25rem;
    opacity: 0.4;
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0;
  }

  .sidebar__item.active .sidebar__icon img {
    opacity: 1;
    filter: invert(1);
  }

  .sidebar__item:hover img {
    filter: var(--sidebar-hover-filter);
    opacity: 1;
  }

  .sidebar__text {
    margin-right: auto;
    margin-left: 1.25rem;
  }

  .sidebar__icon + .sidebar__text {
    margin-left: 0rem;
  }

  .sidebar__bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 4.5rem;
    padding: 0 2.5rem;
  }

  .sidebar__bottom:hover img {
    filter: none;
    opacity: 1;
  }

  .sidebar__counter {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    min-width: 1.5rem;
    margin-left: 0.625rem;
    padding: 0 3px;
    border-radius: 12px;
    background: #ff754c;
    text-align: center;
    font-size: 12px;
    line-height: 1.5rem;
    font-weight: 500;
    color: #ffffff;
  }

  .sidebar__profile {
    color: var(--black);
    -webkit-box-direction: normal;
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    outline: none;
    margin-top: 25px;
  }

  .sidebar__user {
    position: relative;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0 1.25rem;
    height: 62px;
    border-radius: 12px;
    color: var(--black);
    cursor: pointer;
    transition: background 0.25s;
  }

  .avatar {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }

  /* @media only screen and (max-width: 1179px) {
    .sidebar {
      padding-top: 96px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-transition: width 0.25s, -webkit-transform 0.25s;
      transition: width 0.25s, -webkit-transform 0.25s;
      -o-transition: width 0.25s, transform 0.25s;
      transition: width 0.25s, transform 0.25s;
      transition: width 0.25s, transform 0.25s, -webkit-transform 0.25s;
    }
    .top {
      -webkit-box-pack: stretch;
      -ms-flex-pack: stretch;
      justify-content: stretch;
      height: 96px;
      padding-left: 2.5rem;
      -webkit-transition: all 0.25s;
      -o-transition: all 0.25s;
      transition: all 0.25s;
    }

    .sidebar .top > a > img {
      -webkit-transition: opacity 0.2s;
      -o-transition: opacity 0.2s;
      transition: opacity 0.2s;
    }

    .sidebar__wrapper {
      padding-top: 24px;
    }
    nav button {
      display: inline-block;
    }
    .sidebar__group:not(:last-child):before {
      -webkit-transition: all 0.25s;
      -o-transition: all 0.25s;
      transition: all 0.25s;
    }

    .caption {
      white-space: nowrap;
      -webkit-transition: padding 0.25s;
      -o-transition: padding 0.25s;
      transition: padding 0.25s;
    }
    .sidebar__item {
      position: relative;
      padding-left: 3px;
    }
    .sidebar__icon {
      width: 56px;
      height: 56px;
      margin-right: 0;
      -webkit-transition: margin 0.25s;
      -o-transition: margin 0.25s;
      transition: margin 0.25s;
    }
    .sidebar__counter {
      -webkit-transition: all 0.25s;
      -o-transition: all 0.25s;
      transition: all 0.25s;
    }
    .sidebar.active {
      width: 96px;
    }
    .sidebar.active .sidebar__inner {
      width: 56px;
    }
    .sidebar.active .sidebar__group:before {
      left: -1.25rem;
      right: -1.25rem;
    }
    .sidebar.active .sidebar__item {
      padding-left: 0;
    }
    .sidebar.active .sidebar__counter {
      position: absolute;
      top: 15px;
      left: 1.375rem;
      min-width: 0.625rem;
      height: 0.625rem;
      font-size: 0;
    }
    .sidebar.active .caption {
      text-align: center;
      padding-left: 0px;
    }
  }
  @media only screen and (max-width: 1023px) {
    nav {
      z-index: 10;
      width: 96px;
    }
    .sidebar__inner {
      width: 56px;
    }
    .top {
      padding: 0;
    }
    nav .top > a > img {
      opacity: 0;
    }
    nav .top {
      border-bottom: 1px solid var(--gray-light);
    }

    .sidebar__group:not(:last-child):before {
      left: -1.25rem;
      right: -1.25rem;
    }
    .caption {
      padding-left: 0;
      text-align: center;
    }

    .caption:first-child {
      margin-top: 1.5rem;
    }
    .sidebar__item {
      padding-left: 0;
    }
    .sidebar__item:hover {
      color: var(--gray);
    }
    .sidebar__icon {
      margin-right: 1.25rem;
    }
    .sidebar__counter {
      position: absolute;
      top: 15px;
      left: 1.375rem;
      min-width: 0.625rem;
      height: 0.625rem;
      font-size: 0;
    }
    .sidebar.active {
      width: 256px;
    }
    .sidebar.active .sidebar__inner {
      width: 100%;
    }

    .sidebar.active .sidebar__icon {
      margin-right: 0;
    }
    .sidebar.active .sidebar__group:before {
      left: 1.25rem;
      right: 1.25rem;
    }
    .sidebar.active .sidebar__item {
      padding-left: 3px;
    }
    .sidebar.active .sidebar__counter {
      position: static;
      min-width: 1.5rem;
      height: 1.5rem;
      font-size: 12px;
    }
    .top {
      padding-left: 2.5rem;
    }
    .sidebar.active .top img {
      opacity: 1;
    }
    .sidebar.active .caption {
      text-align: left;
      padding-left: 1.25rem;
    }
  } */

  @media only screen and (max-width: 1179px) {
    .sidebar {
      padding-top: 96px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-transition: width 0.25s, -webkit-transform 0.25s;
      transition: width 0.25s, -webkit-transform 0.25s;
      -o-transition: width 0.25s, transform 0.25s;
      transition: width 0.25s, transform 0.25s;
      transition: width 0.25s, transform 0.25s, -webkit-transform 0.25s;
    }

    nav {
      width: 256px;
      -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    .sidebar__wrapper {
      padding: 1.25rem;
    }
    .sidebar__inner {
      width: 100%;
    }

    .top {
      -webkit-box-pack: stretch;
      -ms-flex-pack: stretch;
      justify-content: stretch;
      height: 96px;
      padding-left: 2.5rem;
      -webkit-transition: all 0.25s;
      -o-transition: all 0.25s;
      transition: all 0.25s;
    }

    .sidebar .top > a > img {
      -webkit-transition: opacity 0.2s;
      -o-transition: opacity 0.2s;
      transition: opacity 0.2s;
    }

    .sidebar.active .top img {
      opacity: 1;
    }
    nav button {
      opacity: 1;
    }
    nav button {
      display: none;
    }
    .sidebar__list {
      margin: 0;
    }
    .sidebar__group:not(:last-child) {
      margin-bottom: 1.25rem;
      padding-bottom: 15px;
    }
    .sidebar__group:not(:last-child):before {
      left: 1.25rem;
      right: 1.25rem;
    }
    .caption {
      padding-left: 1.25rem;
      text-align: left;
    }

    .sidebar__item {
      position: relative;
      padding-left: 3px;
    }
    .sidebar__icon {
      width: 56px;
      height: 56px;
      margin-right: 0;
      -webkit-transition: margin 0.25s;
      -o-transition: margin 0.25s;
      transition: margin 0.25s;
    }
    .sidebar__counter {
      -webkit-transition: all 0.25s;
      -o-transition: all 0.25s;
      transition: all 0.25s;
    }
    .sidebar__counter {
      position: static;
      min-width: 1.5rem;
      height: 1.5rem;
      font-size: 12px;
    }
    .sidebar.active {
      -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
      transform: translateX(0);
    }
    .sidebar.active .sidebar__item {
      padding-left: 0;
    }

    .sidebar.active .caption {
      text-align: left;
      padding-left: 1.25rem;
    }
  }
</style>
