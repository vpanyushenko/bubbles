<script>
  import { pageStore, configStore, Spinner, uuid } from "$lib/index";
  import { navigating, page } from "$app/stores";
  import { browser } from "$app/env";
  import { hexToRgb, getColorFilter } from "$lib/utils/colors";
  import { onMount } from "svelte";

  export let sections = [];
  export let logo = null;
  export let href = "/";
  export let onclick = null;
  export let padding = $configStore.padding || "roomy";
  export let flat = true;

  sections = sections.filter((section) => section.hidden !== true);

  const has_groups = sections.find((a) => a.group);

  if (!has_groups) {
    flat = true;
  }

  const sectionsWithTitles = {};
  let path = $page.url.pathname;
  let activeSection = false;
  let open_section = null;
  let is_loading = false;

  $: if ($page.url.pathname) {
    path = $page.url.pathname;
    findActiveSection();
  }

  $: if (!$navigating) {
    $pageStore.sidebar.is_toggled = false;
    is_loading = false;
  } else {
    if ($navigating) {
      is_loading = true;
    }
  }

  sections.forEach((section, index) => {
    if (!section.id) {
      section.id = `sidebar_${index + 1}`;
    }

    let _id = section.id;

    if ($pageStore.sidebar?.notifications) {
      $pageStore.sidebar.notifications[_id] = section.notifications ? section.notifications : 0;
    }

    if (!section.href_aliases) {
      section.href_aliases = [];
    }

    section.href_aliases.push(section.href);

    if (path === "/" && section.href_aliases.includes("/")) {
      activeSection = true;
      $pageStore.sidebar.active_item = section.id;
    }

    if (!sectionsWithTitles[section.group]) {
      sectionsWithTitles[section.group] = [];
    }

    section = section;
    sectionsWithTitles[section.group].push(section);
  });

  if (!activeSection) {
    findActiveSection();
  }

  //make sure notifications cannot be below 0
  function sidebarItemSelected(obj) {
    $pageStore.sidebar.active_item = obj.id;
    $pageStore.clicked = obj.id;
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

  $: groups = formatSidebar(sectionsWithTitles, $pageStore);

  $: if (browser) document.body.classList.toggle("toggle", $pageStore.sidebar.is_toggled);

  function toggleSidebar(event) {
    $pageStore.sidebar.is_toggled = !$pageStore.sidebar.is_toggled ? true : false;
  }

  function toggleSection(index) {
    if (open_section === index) {
      open_section = null;
    } else {
      open_section = index;
    }
  }

  function findActiveSection() {
    activeSection = null;
    const params = path.split("/").filter(Boolean);
    const loops = params.length;

    for (let i = loops; i > 0; i--) {
      const param_path = `/${params.join("/")}`;

      if (!activeSection) {
        sections.forEach((section) => {
          if (section.href_aliases.find((a) => a === param_path)) {
            activeSection = true;
            $pageStore.sidebar.active_item = section.id;

            //if we found an active section and it's in a collapsed group, we should expand the group
            if (section.group) {
              const groups = [...new Set(sections.map((section) => section.group || uuid()))];
              let index = groups.findIndex((key) => key === section.group);

              if (open_section !== index) {
                toggleSection(index);
              }
            }
          }
        });

        params.pop();
      }
    }
  }

  onMount(() => {
    $pageStore.sidebar.is_mounted = true;
    const primaryhex = getComputedStyle(document.documentElement).getPropertyValue("--primary");

    if (primaryhex) {
      const rgb = hexToRgb(`${primaryhex.trim()}`);

      const iconFilter = getColorFilter(rgb);
      let filter = iconFilter.filter.split("filter: ")[1];
      filter = filter.substring(0, filter.length - 1);

      document.documentElement.style.setProperty("--sidebar-hover-filter", filter);
    }
  });
</script>

<nav class="sidebar" class:active={$pageStore.sidebar.is_toggled} class:compact={padding === "compact"}>
  <section class="top">
    {#if href}
      <a {href} on:click={onclick}>
        <img src={logo} alt="Logo" />
      </a>
    {:else}
      <img src={logo} alt="Logo" on:click={onclick} />
    {/if}
    <button on:click={toggleSidebar} />
  </section>

  <section class="sidebar__wrapper" class:flat>
    <div class="sidebar__inner">
      <div class="sidebar__list">
        {#each Object.keys(groups) as group, index}
          <div class="sidebar__group" class:open={open_section === index} class:flat>
            {#if group}
              {#if flat === true}
                {#if group !== "undefined"}
                  <div class="caption">{group}</div>
                {/if}
              {:else if groups?.[group] && groups?.[group].length > 1}
                <div class="group__dropdown cursor-pointer" on:click={() => toggleSection(index)}>
                  {#if groups?.[group] && groups[group]?.[0]?.icon}
                    <img src={groups[group][0].icon} alt="Icon" />
                  {/if}
                  <div class="group__dropdown__text">{group}</div>
                </div>
              {/if}
            {/if}
            <div
              class="sidebar__menu"
              class:hidden={!flat && open_section !== index && groups?.[group] && groups?.[group].length > 1}
            >
              {#each groups[group] as obj}
                <a
                  class="sidebar__item cursor-pointer"
                  class:active={obj.active}
                  sveltekit:prefetch
                  href={obj.href}
                  on:click={() => {
                    sidebarItemSelected(obj);
                  }}
                >
                  {#if (obj.icon && flat) || (obj.icon && groups[group].length === 1)}
                    <div class="sidebar__icon">
                      {#if !is_loading && !obj.href_aliases.includes($navigating?.to?.pathname) && $pageStore.clicked !== obj.id}
                        <!-- Hide the icon when the page is navigating and the to path and href are the same -->
                        <img src={obj.icon} alt="Icon" />
                      {:else if is_loading && obj.href_aliases.includes($navigating?.to?.pathname) && $pageStore.clicked === obj.id}
                        <Spinner />
                      {:else}
                        <img src={obj.icon} alt="Icon" />
                      {/if}
                    </div>
                  {:else if is_loading && obj.href_aliases.includes($navigating?.to?.pathname) && $pageStore.clicked === obj.id}
                    <span class="loading">
                      <Spinner />
                    </span>
                  {/if}

                  <div class="sidebar__text">{obj.label}</div>
                  {#if $pageStore.sidebar.notifications[obj.id]}
                    <div class="sidebar__counter">{$pageStore.sidebar.notifications[obj.id]}</div>
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
    z-index: 20;
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

  .flat.sidebar__group:not(:last-child) {
    position: relative;
    margin-bottom: 2.5rem;
    padding-bottom: 30px;
  }

  .flat.sidebar__group:not(:last-child):before {
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

  .group__dropdown {
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

  .sidebar.compact .group__dropdown {
    height: 3rem;
  }

  .group__dropdown:hover {
    cursor: pointer;
    color: var(--dark);
    /* background: var(--gray-lightest); */
  }

  .group__dropdown:before {
    content: "";
    position: absolute;
    right: 2rem;
    width: 0.75rem;
    height: 0.75rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8'%3E%3Cpath fill='%231b1d21' d='M.293.293A1 1 0 0 1 1.613.21l.094.083L7 5.585 12.293.293a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-6 6a1 1 0 0 1-1.32.083l-.094-.083-6-6a1 1 0 0 1 0-1.414z'/%3E%3C/svg%3E")
      no-repeat 50% 50%/100% auto;
    -webkit-transition: -webkit-transform 0.25s;
    transition: -webkit-transform 0.25s;
    -o-transition: transform 0.25s;
    transition: transform 0.25s;
    transition: transform 0.25s, -webkit-transform 0.25s;
  }

  .sidebar__group.open .group__dropdown:before {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  img + .group__dropdown__text {
    margin-left: 1.25rem;
  }

  .sidebar__menu {
    position: relative;
  }

  .sidebar__group.open:not(.flat) .sidebar__menu:before {
    content: "";
    position: absolute;
    top: 0.5rem;
    left: 1.85rem;
    bottom: 1.75rem;
    width: 2px;
    border-radius: 2px;
    background: #efefef;
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

  .sidebar.compact .sidebar__item {
    height: 3rem;
  }

  .sidebar__item:hover {
    color: var(--dark);
    /* background: var(--gray-lighter); */
  }

  .sidebar__item.active {
    color: var(--primary);
    background: var(--gray-lighter);
  }

  .group__dropdown + .sidebar__menu .sidebar__item {
    margin-left: 2rem;
    position: relative;
  }

  .group__dropdown + .sidebar__menu .sidebar__item:before {
    content: "";
    position: absolute;
    top: 1rem;
    left: -0.9rem;
    width: 0.75rem;
    height: 0.75rem;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' viewBox='0 0 14 14'%3E%3Cpath d='M1 1v4a8 8 0 0 0 8 8h4' stroke='%23efefef' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")
      no-repeat 50% 50%/100% auto;
  }

  .compact .group__dropdown + .sidebar__menu .sidebar__item:before {
    top: 0.75rem;
  }

  .group__dropdown + .sidebar__menu .sidebar__item {
    padding-right: 0.25rem;
    margin-left: 2.75rem;
  }

  img {
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
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
    /* margin-right: 1rem; */
    font-size: 0;
  }

  .group__dropdown img,
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
    filter: var(--sidebar-hover-filter);
  }
  .group__dropdown:hover img,
  .sidebar__item:hover img {
    opacity: 1;
  }

  .loading + .sidebar__text,
  .sidebar__icon + .sidebar__text {
    margin-left: 1.25rem;
  }

  .loading {
    width: 1.25rem;
    height: 1.25rem;
  }

  .sidebar__text {
    margin-right: auto;
    transition: all 0.25s;
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
    .flat.sidebar__group:not(:last-child) {
      margin-bottom: 1.25rem;
      padding-bottom: 15px;
    }
    .flat.sidebar__group:not(:last-child):before {
      left: 1.25rem;
      right: 1.25rem;
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

    .sidebar.active .caption {
      text-align: left;
      padding-left: 1.25rem;
    }
  }
</style>
