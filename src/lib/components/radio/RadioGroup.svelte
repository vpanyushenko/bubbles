<script>
  import { configStore, pageStore } from "$lib/utils/stores";

  export let options = [];
  export let id = null;
  export let value = null;
  export let error = "An error occurred";
  export let label = "";
  export let desc = "";
  export let validation = null;
  export let form_indent = false;
  export let background = false;
  export let focus = false;

  if (background) {
    form_indent = true;
  }

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

<div class="form__field__container" {id} class:background>
  <div class="field" class:style__indent={form_indent}>
    <span>
      <p class="error" class:hidden={!is_error}>{error}</p>
      <p class="label" class:hidden={is_error}>{_label}</p>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </span>

    <div class="options">
      {#each options as option}
        <label class="radio">
          <input type="radio" name={id} value={option.value} bind:group={value} on:focus={focus} />
          <span class="radio__in">
            <span class="radio__tick" />
            <span class="radio__text">{option.label}</span>
          </span>
        </label>
      {/each}
    </div>
  </div>
</div>

<style>
  .form__field__container {
    width: 100%;
    border: 2px solid transparent;
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
    /* padding-left: 1.375rem;
    padding-right: 1.375rem; */
    /* border-radius: 8px;
    border: 1px solid var(--gray-light); */
  }

  .background {
    background: rgba(228, 228, 228, 0.3);
    border-radius: 12px;
    padding: 1.125rem 0;
  }

  .error {
    color: var(--error);
    transition: transform 0.2s;
  }

  .field__desc {
    font-size: 0.75rem;
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

  label:hover .radio__in .radio__tick {
    background-color: var(--primary);
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .radio__in {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .radio__tick {
    position: relative;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 20px;
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #e4e4e4;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  input:checked + .radio__in .radio__tick {
    background: var(--primary);
  }

  .radio__text {
    margin-left: 8px;
    /* padding-top: 3px; */
    /* font-size: 13px;
    line-height: 1.2; */

    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
  }

  p {
    margin: 0px;
  }

  input:checked + .radio__in .radio__tick:before {
    opacity: 1;
  }
  .radio__tick:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--white);
    -webkit-box-shadow: 0px 2px 4px rgb(0 0 0 / 50%);
    box-shadow: 0px 2px 4px rgb(0 0 0 / 50%);
    opacity: 0;
    -webkit-transition: opacity 0.25s;
    -o-transition: opacity 0.25s;
    transition: opacity 0.25s;
  }

  .style__indent {
    padding-left: 1.375rem;
    padding-right: 1.375rem;
  }

  .form__field__container:focus,
  .background:focus,
  .background:focus-visible,
  .form__field__container:focus-within {
    border-color: var(--primary);
  }
</style>
