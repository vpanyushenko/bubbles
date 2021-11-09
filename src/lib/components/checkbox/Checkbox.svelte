<script>
  export let value = null;
  export let onchange = null;
</script>

<label class="checkbox">
  <input class="checkbox__input" type="checkbox" bind:checked={value} on:change={onchange} />
  <span class="checkbox__in">
    <span class="checkbox__tick" />
  </span>
</label>

<style>
  .checkbox {
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .checkbox__input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .checkbox__input:checked + .checkbox__in .checkbox__tick {
    background: var(--primary);
    border-color: var(--primary);
  }

  .checkbox__input:checked + .checkbox__in .checkbox__tick:before {
    opacity: 1;
  }

  .checkbox__tick:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 10px;
    height: 9px;
    opacity: 0;
    background: url("data:image/svg+xml,%3Csvg width='10' height='9' viewBox='0 0 10 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3.5 5.375L1.5 3.375L0 4.875L3.5 8.375L10 1.875L8.5 0.375L3.5 5.375Z' fill='white'/%3E%3C/svg%3E%0A")
      no-repeat 50% 50%/100% auto;
    -webkit-transition: opacity 0.25s;
    -o-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }

  .checkbox__in {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .checkbox__tick {
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 20px;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 2px solid var(--gray-light);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }
</style>
