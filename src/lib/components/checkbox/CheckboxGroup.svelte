<script>
  import { configStore, pageStore } from "$lib/utils/stores";
  import { uuid } from "$lib/index";

  export let id = uuid();

  /** @type {{value: string|number, label: string}[]}*/
  export let options = [];

  /** @type {(string|number)[]}*/
  export let value = [];
  export let error = "An error occurred";
  export let label = "";
  export let desc = "";
  export let validation = null;
  export let form_indent = false;
  export let background = false;

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

  function keydown(event) {
    if (
      document &&
      options &&
      event.key === "ArrowUp" &&
      event?.target?.closest(".form__field__container")?.id === id
    ) {
      event.preventDefault();
      let index = options.findIndex((a) => a.value === event.target.value);

      if (index === 0) {
        index = options.length;
      }

      document.getElementById(id).querySelectorAll("input")[index - 1].focus();
    }

    if (
      document &&
      options &&
      event.key === "ArrowDown" &&
      event?.target?.closest(".form__field__container")?.id === id
    ) {
      event.preventDefault();
      let index = options.findIndex((a) => a.value === event.target.value);

      if (index === options.length - 1) {
        index = -1;
      }

      document.getElementById(id)?.querySelectorAll("input")[index + 1].focus();
    }

    if (document && options && event.key === "Enter" && event?.target?.closest(".form__field__container")?.id === id) {
      let index = options.findIndex((a) => a.value === event.target.value);
      document.getElementById(id)?.querySelectorAll("input")[index].focus();

      if (value.includes(event.target.value)) {
        value = value.filter((a) => a !== event.target.value);
        event.target.checked = false;
      } else {
        value.push(event.target.value);
        event.target.checked = true;
      }
    }
  }
</script>

<svelte:body on:keydown={keydown} />

<div class="form__field__container" {id} class:background>
  <div class="field" class:style__indent={form_indent}>
    <span>
      <p class="error" class:hidden={!is_error}>{error}</p>
      <p class="label" class:hidden={is_error}>{_label}</p>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </span>

    <input type="hidden" name={id} bind:value />

    <div class="options">
      {#if options && Array.isArray(options)}
        {#each options as option}
          <label class="checkbox">
            <input
              class="checkbox__input"
              type="checkbox"
              value={option.value}
              bind:group={value}
              on:click={() => ($pageStore.errors = $pageStore.errors.filter((a) => a === id))}
            />
            <span class="checkbox__in">
              <span class="checkbox__tick" />
              <span class="checkbox__text">{option.label}</span>
            </span>
          </label>
        {/each}
      {/if}
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
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
  }

  .style__indent {
    padding-left: 1.375rem;
    padding-right: 1.375rem;
  }

  .form__field__container:focus,
  .background:focus,
  .form__field__container:focus-within {
    border-color: var(--primary);
  }

  input:focus + .checkbox__in .checkbox__tick {
    border: 1px solid var(--primary);
    /* background-color: var(--primary-light) !important; */
  }

  :global(html.dark) .field {
    color: var(--gray-lighter);
  }
  :global(html.dark) .background {
    background: var(--dark);
    color: var(--gray-lighter);
  }
  :global(html.dark) .field__desc {
    color: var(--gray);
  }
  :global(html.dark) .checkbox__text {
    color: var(--gray-light);
  }
</style>
