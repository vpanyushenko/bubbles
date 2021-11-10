<script>
  import { pageStore, configStore } from "$lib/stores/stores";
  import { isValidInput } from "$lib/utils/form";

  export let id;
  export let label;
  export let error = "An error occured";
  export let type = "text";
  export let desc;
  export let margin = false;
  export let value = null;
  export let bounds = null;
  export let validation = null;
  export let validate_on_blur = $configStore.validate_on_blur;
  export let vob = $configStore.validate_on_blur;

  const _label =
    $configStore.show_required && validation && validation.split("|").includes("required") ? `${label}*` : label;

  let focused = false;
  $: is_error = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  $: if (is_error) {
    setTimeout(() => {
      const index = $pageStore?.errors?.findIndex((item) => item === id);
      if (index > -1) {
        $pageStore.errors.splice(index, 1);
      }
      is_error = false;
    }, 5000);
  }

  function inputFocused() {
    const index = $pageStore?.errors?.findIndex((item) => item === id);
    if (index > -1) {
      $pageStore.errors.splice(index, 1);
    }
    focused = true;
    is_error = false;
  }

  function inputBlured() {
    focused = false;

    if (type === "number" && value === 0) {
      focused = true;
      return;
    }

    if (validate_on_blur === true && vob === true) {
      if (validation && !isValidInput(value, validation)) {
        if ($pageStore.errors === undefined) {
          $pageStore.errors = [];
        }

        if (!$pageStore.errors.includes(id)) {
          $pageStore.errors.push(id);
          $pageStore.errors = $pageStore.errors;
        }
      }
    }
  }

  function dateFieldFocused(event) {
    event.currentTarget.type = "date";
  }

  function dateFieldBlurred(event) {
    if (!event.currentTarget.value) {
      event.currentTarget.type = "text";
    }
  }
</script>

{#if type === "text"}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field" class:active={focused || value}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <input
          class="field__input"
          class:error={is_error}
          type="text"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlured}
        />
      </div>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "email"}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field" class:active={focused || value}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <input
          class="field__input"
          class:error={is_error}
          type="email"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlured}
        />
      </div>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "password"}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field" class:active={focused || value}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <input
          class="field__input"
          class:error={is_error}
          type="password"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlured}
        />
      </div>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "date"}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field" class:active={focused || value}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <input
          class="field__input"
          class:error={is_error}
          type="text"
          bind:value
          on:focus={inputFocused}
          on:focus={dateFieldFocused}
          on:blur={inputBlured}
          on:blur={dateFieldBlurred}
        />
      </div>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "number"}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field" class:active={focused || value || value === 0 || value === "0"}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <input
          class="field__input"
          class:error={is_error}
          type="number"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlured}
          min={bounds ? bounds[0] : null}
          max={bounds ? bounds[1] : null}
        />
      </div>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "textarea"}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field" class:active={focused || value || value === 0 || value === "0"}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <!-- <input type="hidden" class="hidden" bind:value /> -->
        <textarea
          class="field__textarea"
          class:error={is_error}
          on:focus={inputFocused}
          on:blur={inputBlured}
          bind:value
        />
      </div>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </div>
  </div>
{:else}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field" class:active={focused || value}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <input
          class="field__input"
          class:error={is_error}
          type="text"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlured}
        />
      </div>
      {#if desc}
        <p class="field__desc">{desc}</p>
      {/if}
    </div>
  </div>
{/if}

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
  .form__field__container {
    width: 100%;
  }
  .mb-2 {
    margin-bottom: 2rem;
  }

  .field {
    position: relative;
    box-sizing: border-box;
    text-align: left;
  }

  .field__input,
  .field__textarea {
    width: 100%;
    border-radius: 8px;
    background: rgba(228, 228, 228, 0.3);
    border: 2px solid transparent;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
  }

  .field__input {
    height: 56px;
    padding: 0 23px;
  }

  .field__textarea {
    height: 157px;
    padding: 15px 23px;
    resize: none;
  }

  .input__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .input__row .field {
    width: 100%;
  }

  .input__row .field + .field {
    margin-left: 1rem;
  }

  .field__label {
    position: absolute;
    top: 2rem;
    right: 1.5rem;
    left: 1.5rem;
    pointer-events: none;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
    margin-bottom: 0px !important;
  }

  .field__label.center {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    right: 0;
    left: 0;
  }

  .field__label.icon {
    position: relative;
    bottom: -3px;
    margin-left: 5px;
    font-size: 0.875rem;
    color: var(--black);
  }

  .field__max {
    position: absolute;
    top: 0;
    right: 0;
    text-transform: none;
    color: var(--info);
  }

  .error {
    color: var(--error) !important;
    border-color: var(--error) !important;
  }

  .field__input {
    width: 100%;
    height: 5rem;
    padding: 1.125rem 1.375rem 0 !important;
    border-radius: 12px;
    border: 2px solid transparent;
    background: rgba(228, 228, 228, 0.3);
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    transition: all 0.2s;
  }

  .field__input.center {
    text-align: center;
    right: 0;
    left: 0;
  }

  .field__textarea {
    width: 100%;
    padding: 2.5rem 1.375rem 0 !important;
    border-radius: 12px;
    border: 2px solid transparent;
    background: rgba(228, 228, 228, 0.3);
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    transition: all 0.2s;
    height: 157px;
    padding: 15px 23px;
    resize: none;
  }

  .field__textarea:focus,
  .field__input:focus {
    border-color: var(--primary);
    background: var(--white);
  }

  .field.active .field__label {
    -webkit-transform: translateY(-12px);
    -ms-transform: translateY(-12px);
    transform: translateY(-12px);
  }

  .field.success:before {
    content: "";
    position: absolute;
    right: 1.5rem;
    bottom: 1.5rem;
    width: 23px;
    height: 1.125rem;
    background: url("data:image/svg+xml,%3Csvg width='23' height='18' viewBox='0 0 23 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 18L0 10L3 7L8 12L20 0L23 3L8 18Z' fill='%234FBF67'/%3E%3C/svg%3E%0A")
      no-repeat 50% 50%/100% auto;
  }

  .field__desc {
    padding: 0.625rem 1.375rem 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  body.dark .field__label .icon {
    fill: var(--white);
  }

  body.dark .field__input {
    background: rgba(228, 228, 228, 0.03);
    color: var(--white);
  }
</style>
