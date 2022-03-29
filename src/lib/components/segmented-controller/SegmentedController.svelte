<script>
  import Select from "$lib/components/select/Select.svelte";
  import { v4 as uuid } from "@lukeed/uuid";
  import { Spinner } from "$lib/index";
  import { navigating } from "$app/stores";

  export let segments = [];
  export let style = "default";

  const selectOptions = segments.map((segment) => {
    return {
      label: segment.label,
      onselect: segment.onclick,
      value: segment.label,
    };
  });

  const id = uuid();

  let expanded = true;
  let items = [];
  let selected = 0;
  let wrapper, dom_component_width, nav, button_wrapper_width;

  $: selectedItem = items[selected];
  $: left = selectedItem?.getBoundingClientRect().left - wrapper?.getBoundingClientRect().left + 4;
  $: width = selectedItem?.getBoundingClientRect().width - 8;

  $: if (dom_component_width && style === "default") {
    button_wrapper_width = nav.querySelector(".buttons")?.getBoundingClientRect()?.width || segments.length * 190;

    if (button_wrapper_width > dom_component_width) {
      expanded = false;
    } else {
      expanded = true;
    }
  }

  $: if (dom_component_width && style === "line") {
    button_wrapper_width = nav.querySelector(".buttons")?.getBoundingClientRect()?.width || segments.length * 100;

    if (button_wrapper_width > dom_component_width) {
      expanded = false;
    } else {
      expanded = true;
    }
  }
</script>

<nav
  bind:clientWidth={dom_component_width}
  class:line={style === "line"}
  class:border={style === "line" && expanded}
  bind:this={nav}
>
  {#if expanded}
    <div bind:this={wrapper} class="wrapper" style="--left: {left}px; --width: {width}px;">
      <div class="buttons">
        {#each segments as segment, i}
          {#if segment.href}
            <a
              class="segment"
              href={segment.href}
              sveltekit:prefetch
              class:active={i === selected}
              on:click={() => (selected = i)}
              bind:this={items[i]}
              on:click={segment.onclick}
              id={segment.id ? segment.id : `${id}_${i}`}
            >
              <span>
                {#if $navigating?.to?.pathname === segment?.href}
                  <Spinner size={1} />
                {:else}
                  {segment.label}
                {/if}
              </span>
            </a>
          {:else}
            <button
              class:active={i === selected}
              on:click={() => (selected = i)}
              bind:this={items[i]}
              on:click={segment.onclick}
              id={segment.id ? segment.id : `${id}_${i}`}
            >
              <span>
                {segment.label}
              </span>
            </button>
          {/if}
        {/each}
      </div>
    </div>
  {:else}
    <Select options={selectOptions} label="Navigation" value={selectedItem ? selectedItem : selectOptions[0].value} />
  {/if}
</nav>

<style>
  nav {
    position: relative;
    margin-bottom: 2rem;
  }

  a.segment {
    display: inline-flex;
    background: aqua;
    align-items: center;
  }

  a,
  button {
    background: transparent;
    text-align: center;
    z-index: 1;
    height: 2.625rem;
    border-radius: 0.625rem;
    font-weight: bolder;
    color: var(--gray);
    min-width: 7rem;
    width: fit-content;
  }

  a.active,
  button.active {
    color: var(--black);
  }
  a > span,
  button > span {
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
  }

  .wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 3.125rem;
    align-items: center;
    border-radius: 0.75rem;
    overflow: hidden;
    position: relative;
    width: max-content;
  }

  .wrapper:after {
    background-color: var(--input-bg);
    content: "";
    inset: 0 0 0 0;
    position: absolute;
    z-index: -2;
  }

  .wrapper:before {
    background-color: var(--white);
    border-radius: 0.625rem;
    bottom: 0;
    content: "";
    left: var(--left);
    position: absolute;
    top: 0;
    transition: left 0.3s;
    width: var(--width);
    z-index: -1;
    height: 2.625rem;
    top: 4px;
  }

  .border {
    border-bottom: 1px solid var(--gray-light);
  }

  .line a,
  .line button {
    min-width: none;
    background: transparent;
    text-align: center;
    z-index: 1;
    border-radius: 0;
    min-width: auto;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-bottom: 4px;
    padding-top: 4px;
    border-bottom: 2px solid transparent;
    border-radius: 12px;
  }

  .line a:hover,
  .line button:hover {
    background-color: var(--input-bg);
  }

  .line a.active,
  .line button.active {
    color: var(--black);
    border-bottom: 2px solid var(--black);
    border-radius: 12px 12px 0 0;
    transition-duration: 150ms;
  }

  .line .wrapper:after {
    background-color: transparent;
    content: "";
    inset: 0 0 0 0;
    position: absolute;
    z-index: -2;
    transition-duration: 150ms;
  }

  .line .wrapper {
    height: auto;
    border-radius: 0px;
  }

  @media only screen and (max-width: 767px) {
    a,
    button {
      width: fit-content;
    }
  }
</style>
