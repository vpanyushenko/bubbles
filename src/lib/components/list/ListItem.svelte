<script>
  import { pageStore } from "$lib/stores/page.store";
  import { v4 as uuid } from "@lukeed/uuid";
  import Tag from "$lib/components/tag/Tag.svelte";

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
  export let tag = null;
  export let new_page = true;
  export let onclick = null;
  export let id = uuid();
  export let timeline = false;

  $: is_loading = $pageStore.loading.includes(id);

  const target = new_page === true ? "_blank" : "self";
</script>

<div class="list__item" {id}>
  {#if timeline}
    <span class="timeline__item">
      <div class="timeline__ring__container">
        <div class="circle" />
        <div class="timeline__active" />
      </div>
    </span>
  {/if}
  {#if label}
    <div class="content">
      <div class="label">{label}</div>
      {#if text}
        {#if href}
          <a {href} {target}>{text}</a>
        {:else}
          <span>{text}</span>
        {/if}
      {:else if tag}
        <Tag {...tag} />
      {/if}
    </div>
    {#if icon}
      <div class="icon__container">
        <span class="spinner" class:hidden={!is_loading} />
        <img class="icon" class:hidden={is_loading} on:click={onclick} src={icons[icon] || icon} alt="Icon" {id} />
      </div>
    {/if}
  {:else if tag}
    <div class="center">
      <Tag {...tag} />
    </div>
  {:else}
    <div class="center">
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
    min-height: 4rem;
    margin-bottom: 1.5rem;
  }

  .label {
    margin-bottom: 0 !important;
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
    padding-top: 1rem;
    padding-bottom: 1rem;
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

  .center {
    align-self: center;
  }
</style>
