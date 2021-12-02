<script>
  import { configStore, pageStore } from "$lib/stores/stores";

  export let id = null;
  export let options = [];
  export let value = [];
  export let error = "An error occured";
  export let label = "";
  export let desc = "";
  export let validation = null;

  const _label =
    $configStore.show_required && validation && validation.split("|").includes("required") ? `${label}*` : label;

  $: is_error = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  $: if (is_error) {
    setTimeout(() => {
      $pageStore.errors = $pageStore.errors.filter((a) => a !== id);
      is_error = false;
    }, $configStore.error_delay);
  }
</script>

<div class="form__field__container" {id}>
  <div class="field style__indent">
    <span>
      <p class="error" class:hidden={!is_error}>{error}</p>
      <p class="label" class:hidden={is_error}>{_label}</p>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </span>

    <div class="options">
      {#each options as option}
        <label class="checkbox">
          <input
            class="checkbox__input"
            type="checkbox"
            value={option.value}
            bind:group={value}
            checked={value.includes(option.value)}
            on:click={() => {
              const index = $pageStore.errors.findIndex((item) => item === id);
              if (index > -1) {
                $pageStore.errors.splice(index, 1);
              }
            }}
          />
          <span class="checkbox__in">
            <span class="checkbox__tick" />
            <span class="checkbox__text">{option.label}</span>
          </span>
        </label>
      {/each}
    </div>
  </div>
</div>

<style>
  .form__field__container {
    width: 100%;
  }

  .field {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    /* border-radius: 8px;
    border: 1px solid var(--gray-light); */
  }

  .error {
    color: var(--error);
    transition: transform 0.2s;
  }

  .field__desc {
    padding: 0.625rem 0 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  .options {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  label {
    display: inline-block;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0px;
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

  .checkbox__text {
    margin-left: 8px;
    padding-top: 3px;
    /* font-size: 13px;
    line-height: 1.2; */

    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
  }
</style>
