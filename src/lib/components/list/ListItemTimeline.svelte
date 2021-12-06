<script>
  import { pageStore } from "$lib/stores/page.store";
  import { v4 as uuid } from "@lukeed/uuid";

  import copy from "./copy.svg";
  import download from "./download.svg";
  import edit from "./edit.svg";
  import trash from "./trash.svg";

  const icons = {
    copy: copy,
    download: download,
    edit: edit,
    trash: trash,
  };

  export let label = "";
  export let text = "";
  export let href = null;
  export let icon = null;
  export let new_page = true;
  export let onclick = null;
  export let id = uuid();
  export let active = false;
  export let pulse = true;

  $: is_loading = $pageStore.loading.includes(id);

  const target = new_page === true ? "_blank" : "self";
</script>

<div class="list__item" {id}>
  <span class="timeline__bubble">
    <div class="timeline__bubble__container">
      {#if active}
        <div class="active__circle" />
        {#if pulse}
          <div class="pulse" />
        {/if}
      {/if}
    </div>
  </span>

  {#if label || text}
    <div class="content">
      <div class="label">{label}</div>
      {#if href}
        <a {href} {target}>{text}</a>
      {:else}
        <span>{text}</span>
      {/if}
    </div>
    {#if icon}
      <div class="icon__container">
        <span class="spinner" class:hidden={!is_loading} />
        <img class="icon" class:hidden={is_loading} on:click={onclick} src={icons[icon] || icon} alt="Icon" {id} />
      </div>
    {/if}
  {:else}
    <div class="content">
      <slot />
    </div>
  {/if}
</div>

<style>
  .list__item {
    display: flex;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    padding: 4px;
    border: 1px solid var(--gray-light);
    border-radius: 16px;
    font-weight: 600;
    padding: 0 1.25rem 0 1.25rem;
    min-height: 5rem;
    margin-bottom: 1.5rem;
  }

  .label {
    margin-bottom: 0 !important;
    padding-top: 16px;
    padding-bottom: 4px;
    pointer-events: none;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.6;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
  }

  .content {
    flex-basis: max-content;
  }

  .icon__container {
    align-self: center;
  }

  .icon {
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
    font-size: 0;
  }
  .icon__container img {
    font-size: 1.25rem;
    opacity: 0.4;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    fill: var(--black);
  }

  .spinner {
    display: block;
  }

  .icon__container img:hover {
    cursor: pointer;
    filter: var(--sidebar-hover-filter);
    opacity: 1;
  }

  @keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      opacity: 0;
    }
  }

  .timeline__bubble {
    width: 2px;
    height: calc(100% + 2rem);
    left: -30px;
    top: 0;
    position: absolute;
  }
  .timeline__bubble:before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    background: var(--gray-light);
    left: -6px;
    top: calc((100% - 2rem) / 2 - 6px);
  }
  .timeline__bubble:after {
    top: 100%;
  }

  .timeline__bubble__container {
    position: relative;
    top: calc((100% - 2rem) / 2 - 6px);
    left: -7px;
  }

  .active__circle {
    margin: 0px;
    width: 15px;
    height: 15px;
    background-color: var(--success);
    border-radius: 50%;
    position: absolute;
  }

  .pulse {
    margin: 0px;
    border: 3px solid var(--success);
    -webkit-border-radius: 30px;
    border-radius: 30px;
    height: 25px;
    width: 25px;
    position: absolute;
    left: -5px;
    top: -5px;
    animation: pulsate 2s ease-out;
    -webkit-animation: pulsate 2s ease-out;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    opacity: 0;
  }
</style>
