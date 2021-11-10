<script>
  import { pageStore } from "$lib/stores/stores";
  import { v4 as uuid } from "@lukeed/uuid";

  export let id = uuid();
  export let disabled = false;
  export let onclick = null;
  export let onselect = null;
  export let onchange = null;
  export let value = true;

  $: active = value ? true : false;
  let is_animation_compelted = true;
  $: is_loading = $pageStore.loading.includes(id) && is_animation_compelted;

  function toggleSwitch(event) {
    if (!disabled && !is_loading && is_animation_compelted) {
      value = !value ? true : false;

      is_animation_compelted = false;

      setTimeout(() => {
        is_animation_compelted = true;
      }, 250);
    }
  }
</script>

<label class="switch" class:active class:disabled>
  <input
    type="checkbox"
    on:change={toggleSwitch}
    on:change={onclick}
    on:change={onselect}
    on:change={onchange}
    {value}
    {id}
  />
  <span class="switch__in">
    <span class="switch__box" class:hidden={is_loading} />
    <span class="loading" class:hidden={!is_loading} />
  </span>
</label>

<style>
  @keyframes rotate-s-loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .switch {
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 0;
    -webkit-transition: opacity 0.25s;
    -o-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .switch__in {
    display: inline-block;
  }

  .loading,
  .switch__box {
    position: relative;
    display: block;
    width: 4rem;
    height: 1.5rem;
    background: rgba(228, 228, 228, 0.5);
    border-radius: 1rem;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .switch__box:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 2px;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 4px solid var(--white);
    -webkit-box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
    background: var(--gray);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .switch__box:before {
    background: var(--gray);
  }

  .switch.active .switch__box:before {
    background: var(--primary);
    -webkit-transform: translate(2.5rem, -50%);
    -ms-transform: translate(2.5rem, -50%);
    transform: translate(2.5rem, -50%);
  }

  .loading:before {
    content: "";
    position: absolute;
    left: 2px;
    top: 2px;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 4px solid var(--gray-light);
    border-top-color: var(--white);
    background: var(--gray);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    content: "";
    position: absolute;
    box-sizing: border-box;
    -webkit-box-shadow: none;
    box-shadow: none;
    animation-name: rotate-s-loader;
    animation-iteration-count: infinite;
    animation-duration: 0.8s;
    animation-timing-function: linear;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .switch.active .loading:before {
    left: 42px;
    background: var(--primary);
  }

  .switch.disabled {
    cursor: not-allowed;
  }
  .switch.disabled .switch__box:before {
    background: var(--gray);
  }

  @media (hover: hover) {
    .switch:hover {
      opacity: 0.8;
    }
  }
</style>
