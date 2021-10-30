<script>
  export let disabled = false;
  export let loading = false;
  export let onclick = null;
  export let value = true;

  $: active = value ? true : false;

  // $: console.log(value, active);

  function toggleSwitch(event) {
    value = !value ? true : false;
  }
</script>

<label class="switch" class:active class:disabled>
  <input type="checkbox" on:click={toggleSwitch} on:click={onclick} {value} />
  <span class="switch__in">
    <span class="switch__box" class:hidden={loading} />
    <span class="loading" class:hidden={!loading} />
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

  .switch.disabled {
    cursor: not-allowed;
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
    width: 64px;
    height: 24px;
    background: rgba(228, 228, 228, 0.5);
    border-radius: 16px;
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid #ffffff;
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
    background: var(--purple);
    -webkit-transform: translate(40px, -50%);
    -ms-transform: translate(40px, -50%);
    transform: translate(40px, -50%);
  }

  .loading:before {
    content: "";
    position: absolute;
    left: 2px;
    top: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 4px solid #ccc;
    border-top-color: #fff;
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
  }

  .switch.active .loading:before {
    left: 42px;
    background: var(--purple);
  }

  @media (hover: hover) {
    .switch:hover {
      opacity: 0.8;
    }
  }
</style>
