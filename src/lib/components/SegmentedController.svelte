<script>
  import Select from "$lib/components/inputs/Select.svelte";
  let expanded = true;

  const segments = [
    {
      label: "Info",
      href: "/info",
      hidden: false,
    },
    {
      label: "Communication",
      href: "/communication",
      hidden: false,
    },
    {
      label: "Tasks",
      href: "/tasks",
      hidden: false,
    },
    {
      label: "Calendar",
      href: "/calender",
      hidden: true,
    },
    {
      label: "Billing",
      href: "/billing",
      hidden: false,
    },
    {
      label: "Expenses",
      href: "/expenses",
      hidden: false,
    },
  ];

  let items = [];
  let selected = 0;
  let wrapper;

  $: selectedItem = items[selected];
  $: left = selectedItem?.getBoundingClientRect().left - wrapper?.getBoundingClientRect().left + 4;
  $: width = selectedItem?.getBoundingClientRect().width - 8;

  let pageWidth = 0;

  $: if (segments.filter((a) => a.hidden === false).length * 120 <= pageWidth) {
    expanded = true;
  } else {
    expanded = false;
  }
</script>

<svelte:window bind:innerWidth={pageWidth} />

<nav>
  {#if expanded}
    <div bind:this={wrapper} class="wrapper" style="--left: {left}px; --width: {width}px;">
      {#each segments as segment, i}
        <button class:active={i === selected} on:click={() => (selected = i)} bind:this={items[i]}
          >{segment.label}</button
        >
      {/each}
    </div>
  {:else}
    <Select options={segments} label="Navigation" />
  {/if}
</nav>

<style>
  nav {
    position: relative;
    margin-bottom: 2rem;
  }
  button {
    background: transparent;
    text-align: center;
    z-index: 1;
    height: 42px;
    border-radius: 0.625rem;
    min-width: 11.25rem;
    font-weight: bolder;
    color: var(--gray);
  }

  button.active {
    color: var(--black);
  }

  .wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 50px;
    align-items: center;
    border-radius: 12px;
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
    height: 42px;
    top: 4px;
  }
</style>
