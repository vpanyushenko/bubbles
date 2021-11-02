<script>
  import { pageStore } from "$lib/stores/stores";
  import { navigating, page } from "$app/stores";
  import { browser } from "$app/env";

  export let sections = [];
  export let logo = null;

  const sectionsWithTitles = {};

  let activeSection = sections.find((a) => a.active === true);

  sections.forEach((section, index) => {
    if (!section.id) {
      section.id = index + 1;
    }

    if (!activeSection) {
      const path = $page.path.split("/").filter(Boolean)[0];

      if (path === section.href.split("/").filter(Boolean)[0]) {
        activeSection = true;

        $pageStore.sidebar.active_item = section.id;
      }
    }

    section = section;

    if (sectionsWithTitles[section.section]) {
      sectionsWithTitles[section.section].push(section);
    } else {
      sectionsWithTitles[section.section] = [];
      sectionsWithTitles[section.section].push(section);
    }
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
                  <div class="sidebar__icon">
                    <span class="spinner" class:hidden={!$navigating || $navigating.to.path !== obj.href} />
                    <img class:hidden={$navigating && $navigating.to.path === obj.href} src={obj.icon} alt="Icon" />
                  </div>

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
    padding: 140px 0 72px;
    background: #ffffff;
    border-right: 1px solid var(--gray-light);
    z-index: 5;
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
    padding-left: 40px;
  }

  nav .top > a > img {
    max-width: 176px;
    max-height: 40px;
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
    padding: 20px;
    border-bottom: 1px solid transparent;
    font-size: 0;
  }

  nav button:before,
  nav button:after {
    content: "";
    display: inline-block;
    width: 32px;
    height: 2px;
    margin: 3px auto;
    border-radius: 1px;
    background: var(--dark);
  }

  .caption {
    margin-bottom: 16px;
    padding-left: 20px;
    color: var(--gray);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
  }

  .sidebar__group:not(:last-child) {
    position: relative;
    margin-bottom: 40px;
    padding-bottom: 30px;
  }

  .sidebar__group:not(:last-child):before {
    content: "";
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 0;
    height: 1px;
    background: var(--gray-light);
  }

  .sidebar__wrapper {
    /* max-height: 100%; */
    padding: 0 20px 0px;
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
    margin-bottom: 20px;
  }

  .sidebar__item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 56px;
    padding: 0 20px;
    border-radius: 12px;
    background: transparent;
    font-size: 14px;
    font-weight: 600;
    color: #808191;
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .sidebar__item:hover {
    color: #6c5dd3;
  }

  .sidebar__item.active {
    background: #6c5dd3;
    color: #ffffff;
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
    width: 24px;
    height: 24px;
    margin-right: 16px;
    font-size: 0;
  }
  .sidebar__icon img {
    font-size: 21px;
    fill: #1b1d21;
    opacity: 0.4;
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    font-size: 0;
  }

  .sidebar__item.active .sidebar__icon img {
    opacity: 1;
    filter: invert(1);
  }

  .sidebar__item:hover img {
    filter: invert(44%) sepia(7%) saturate(6567%) hue-rotate(212deg) brightness(89%) contrast(90%);
    opacity: 1;
  }

  .sidebar__item .sidebar__text {
    margin-right: auto;
  }

  .sidebar__item .sidebar__text.stacked {
    margin-right: auto;
    display: flex;
    flex-direction: column;
    text-align: start;
  }

  .stacked > p:last-child {
    font-size: smaller;
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
    height: 72px;
    padding: 0 40px;
  }

  .sidebar__bottom:hover img {
    filter: none;
    opacity: 1;
  }

  .sidebar__counter {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    min-width: 24px;
    margin-left: 10px;
    padding: 0 3px;
    border-radius: 12px;
    background: #ff754c;
    text-align: center;
    font-size: 12px;
    line-height: 24px;
    font-weight: 500;
    color: #ffffff;
  }

  .sidebar__profile {
    color: #11142d;
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
    padding: 0 20px;
    height: 62px;
    border-radius: 12px;
    color: #11142d;
    cursor: pointer;
    transition: background 0.25s;
  }

  .avatar {
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }

  @media only screen and (max-width: 1179px) {
    .sidebar {
      padding-top: 96px;
      overflow: hidden;
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
      padding-left: 40px;
      -webkit-transition: all 0.25s;
      -o-transition: all 0.25s;
      transition: all 0.25s;
    }

    .sidebar .sidebar__top > a > img {
      -webkit-transition: opacity 0.2s;
      -o-transition: opacity 0.2s;
      transition: opacity 0.2s;
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
      left: -20px;
      right: -20px;
    }
    .sidebar.active .sidebar__item {
      padding-left: 0;
    }
    .sidebar.active .sidebar__counter {
      position: absolute;
      top: 15px;
      left: 22px;
      min-width: 10px;
      height: 10px;
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
      left: -20px;
      right: -20px;
    }
    .caption {
      padding-left: 0;
      text-align: center;
    }

    .caption:first-child {
      margin-top: 24px;
    }
    .sidebar__item {
      padding-left: 0;
    }
    .sidebar__item:hover {
      color: #808191;
    }
    .sidebar__icon {
      margin-right: 21px;
    }
    .sidebar__counter {
      position: absolute;
      top: 15px;
      left: 22px;
      min-width: 10px;
      height: 10px;
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
      left: 20px;
      right: 20px;
    }
    .sidebar.active .sidebar__item {
      padding-left: 3px;
    }
    .sidebar.active .sidebar__counter {
      position: static;
      min-width: 24px;
      height: 24px;
      font-size: 12px;
    }
    .top {
      padding-left: 40px;
    }
    .sidebar.active .top img {
      opacity: 1;
    }
    .sidebar.active .caption {
      text-align: left;
      padding-left: 20px;
    }
  }

  @media only screen and (max-width: 767px) {
    nav {
      width: 256px;
      -webkit-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      transform: translateX(-100%);
    }
    .sidebar__wrapper {
      padding: 20px;
    }
    .sidebar__inner {
      width: 100%;
    }
    .top {
      padding-left: 40px;
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
      margin-bottom: 20px;
      padding-bottom: 15px;
    }
    .sidebar__group:not(:last-child):before {
      left: 20px;
      right: 20px;
    }
    .caption {
      padding-left: 20px;
      text-align: left;
    }
    .caption span {
      display: inline;
    }
    .sidebar__item {
      padding-left: 3px;
    }
    .sidebar__icon {
      margin-right: 0;
    }
    .sidebar__counter {
      position: static;
      min-width: 24px;
      height: 24px;
      font-size: 12px;
    }
    .sidebar.active {
      -webkit-transform: translateX(0);
      -ms-transform: translateX(0);
      transform: translateX(0);
    }
    .sidebar.active .sidebar__caption {
      padding-left: 15px;
    }
    .sidebar.active .sidebar__item {
      padding-left: 0;
    }
  }
</style>
