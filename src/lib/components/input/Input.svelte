<script>
  import { pageStore, configStore } from "$lib/stores/stores";
  import { isValidInput } from "$lib/utils/form";
  import { configLabel } from "$lib/utils/config";
  import { v4 as uuid } from "@lukeed/uuid";

  export let id;
  export let label;
  export let error = "An error occurred";
  export let type = "text";
  export let desc;
  export let value = null;
  export let margin = false;
  export let bounds = null;
  export let validation = null;
  export let rows = 5;
  export let typeahead = null;
  export let autocomplete = true;
  export let validate_on_blur = $configStore.validate_on_blur;
  export let vob = $configStore.validate_on_blur;

  const _uuid = uuid();
  let _label = configLabel(label, validation);
  let focused = false;
  let selectedIndex = 0;

  $: is_error = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  $: if (is_error) {
    setTimeout(() => {
      $pageStore.errors = $pageStore.errors.filter((a) => a !== id);
      is_error = false;
    }, $configStore.error_delay);
  }

  //options for typeahead inside of input or textarea elements
  $: typeahead_options = [];
  $: is_loading = false;

  function dateFieldFocused(event) {
    event.currentTarget.type = "date";
  }

  function dateFieldBlurred(event) {
    if (!event.currentTarget.value) {
      event.currentTarget.type = "text";
    }
  }

  function typeaheadOnInput(event) {
    const value = event.target.value;

    if (typeahead && value) {
      is_loading = true;
      typeahead(value)
        .then((options) => {
          is_loading = false;
          if (options && options.length) {
            //check if the typeahead options that were passed were strings and format them correctly
            typeahead_options = options.map((option) => {
              if (typeof option === "string") {
                const obj = {
                  label: option,
                  value: option,
                };

                return obj;
              } else {
                return option;
              }
            });
          } else {
            typeahead_options = [];
          }
        })
        .catch((err) => {
          console.error(err);
          is_loading = false;
          typeahead_options = [];
        });
    }

    if (!value) {
      is_loading = false;
      typeahead_options = [];
    }
  }

  function selectOption(event) {
    const option = event.currentTarget;
    value = option.querySelector("input").value;
    typeahead_options = [];
  }

  function hoverOption(event) {
    const option = event.currentTarget;

    const _value = option.querySelector("input").value;
    const index = typeahead_options.findIndex((item) => item.value === _value);
    selectedIndex = index;
  }

  function keydown(event) {
    if (typeahead_options && typeahead_options.length > 0 && !event.defaultPrevented) {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          event.stopPropagation();

          if (selectedIndex === typeahead_options.length - 1) {
            selectedIndex = 0;
          } else {
            selectedIndex++;
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          event.stopPropagation();
          if (selectedIndex === 0) {
            selectedIndex = typeahead_options.length - 1;
          } else {
            selectedIndex--;
          }
          break;
        }
        case "Enter": {
          event.preventDefault();
          event.stopPropagation();
          value = typeahead_options[selectedIndex].value;
          typeahead_options = [];
          break;
        }
      }
    }
  }

  function inputFocused() {
    const index = $pageStore?.errors?.findIndex((item) => item === id);
    if (index > -1) {
      $pageStore.errors.splice(index, 1);
    }
    focused = true;
    is_error = false;
  }

  function inputBlurred() {
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

    //set timeout so the blur happens at the end of the event loop
    //this lets the onclick handler finish
    //can perhaps come up with a better solution in the future
    setTimeout(() => {
      typeahead_options = [];
    }, 100);
  }
</script>

<svelte:body on:keydown={keydown} />

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
          autocomplete={autocomplete ? "on" : "nope"}
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
          on:input={typeaheadOnInput}
        />
        {#if is_loading}
          <span class="spinner" />
        {/if}

        {#if typeahead_options && typeahead_options.length > 0}
          <div class="options">
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            {#each typeahead_options as option, index}
              <div
                class="option"
                on:click={selectOption}
                on:mouseover={hoverOption}
                tabindex="-1"
                class:selected={option.value === value}
                class:focused={selectedIndex === index}
              >
                <div class="title">{option.label}</div>
                <input class="hidden" value={option.value} />
                {#if option.caption}
                  <div class="select__info caption">{option.caption}</div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
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
          autocomplete={autocomplete ? "on" : "nope"}
          type="email"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "tel" || type === "phone"}
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
          autocomplete={autocomplete ? "on" : "nope"}
          type="tel"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
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
          autocomplete={autocomplete ? "on" : "nope"}
          type="password"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
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
          autocomplete={autocomplete ? "on" : "nope"}
          type="text"
          bind:value
          on:focus={inputFocused}
          on:focus={dateFieldFocused}
          on:blur={inputBlurred}
          on:blur={dateFieldBlurred}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
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
          autocomplete={autocomplete ? "on" : "nope"}
          type="number"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
          min={bounds ? bounds[0] : null}
          max={bounds ? bounds[1] : null}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
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
          {rows}
          class:error={is_error}
          autocomplete={autocomplete ? "on" : "nope"}
          on:focus={inputFocused}
          on:blur={inputBlurred}
          on:input={typeaheadOnInput}
          bind:value
        />
        {#if is_loading}
          <span class="spinner" />
        {/if}

        {#if typeahead_options && typeahead_options.length > 0}
          <div class="options">
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            {#each typeahead_options as option, index}
              <div
                class="option"
                on:click={selectOption}
                on:mouseover={hoverOption}
                tabindex="-1"
                class:selected={option.value === value}
                class:focused={selectedIndex === index}
              >
                <div class="title">{option.label}</div>
                <input class="hidden" value={option.value} />
                {#if option.caption}
                  <div class="select__info caption">{option.caption}</div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "hidden"}
  <div class="form__field__container hidden" {id}>
    <div class="field">
      <div class="field__wrap">
        <input class="field__input" type="hidden" bind:value />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
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
          autocomplete={autocomplete === true ? "on" : "nope"}
          type="text"
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
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

  .field__textarea {
    /* padding: 15px 23px; */
    resize: none;
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

  .error {
    color: var(--error) !important;
    border-color: var(--error) !important;
  }

  .field__input {
    width: 100%;
    height: 5rem;
    padding: 1.125rem 1.375rem 0;
    border-radius: 12px;
    border: 2px solid transparent;
    background: rgba(228, 228, 228, 0.3);
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    transition: all 0.2s;
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

  .field__desc {
    padding: 0.625rem 1.375rem 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  .spinner {
    position: absolute;
    top: 1.875rem;
    right: 1.25rem;
  }

  .options {
    position: absolute;
    left: 0;
    z-index: 20;
    width: 100%;
    margin: auto;
    margin-top: 8px;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border: 1px solid #e4e4e4;
    background: #ffffff;
    border-radius: 1.5rem;
    -webkit-box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    max-height: 400px;
    overflow-y: auto;
  }

  .option {
    display: block;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
  }

  .title {
    position: relative;
    margin-bottom: 3px;
    padding-right: 30px;
    color: var(--black);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
    line-height: 1.1875;
    font-weight: 600;
  }

  .caption {
    color: var(--gray);
    -webkit-transition: color 0.25s;
    -o-transition: color 0.25s;
    transition: color 0.25s;
  }

  .option:hover .title:before,
  .option.focused .title:before {
    -webkit-transform: translateX(5px);
    -ms-transform: translateX(5px);
    transform: translateX(5px);
  }
  .option.selected .title,
  .option.selected .title,
  .option:hover .title,
  .option.focused .title,
  .option:hover .select__info {
    color: #6c5dd3;
  }

  .option.focused {
    background-color: var(--gray-lightest);
    border-radius: 12px;
  }
</style>
