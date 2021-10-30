<script>
  import Switch from "$lib/components/inputs/switch/LabledSwitch.svelte";
  import Input from "$lib/components/inputs/Input.svelte";
  import Select from "$lib/components/inputs/Select.svelte";
  import Button from "$lib/components/inputs/Button.svelte";
  import Divider from "$lib/components/Divider.svelte";

  export let blocks = [];
  export let center = false;

  $: inputs = blocks;
</script>

<div class="form">
  {#each inputs as input}
    {#if !input.hidden}
      <span class="row">
        {#if input.type === "text" || input.type === "email" || input.type === "password" || input.type === "date" || input.type === "number"}
          <Input {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "switch"}
          <Switch {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "select" || input.type === "select-number"}
          <Select {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "button"}
          <Button {...input} />
        {/if}

        {#if input.type === "divider"}
          <Divider {...input} />
        {/if}

        {#if input.type === "p"}
          <p>
            {input.value}
          </p>
        {/if}
      </span>
    {/if}
  {/each}
  <slot />
</div>

<style>
  :global(.form .select) {
    width: 100%;
  }
  span {
    display: flex;
    width: 100%;
    align-items: center;
  }
</style>
