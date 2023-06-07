<script>
  import { pageStore, configStore } from "$lib/utils/stores";
  import { isValidInput } from "$lib/utils/form";
  import { configLabel } from "$lib/utils/config";
  import Dropdown from "$lib/components/dropdown/Dropdown.svelte";
  import Tag from "./TagInput.svelte";
  import { showToast } from "$lib/utils/toast";
  import { onMount } from "svelte";
  import { showLoading, hideLoading } from "$lib/index";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import display_value_icon from "./delete-icon.svelte";

  // import DatePicker from "$lib/components/calendar/DatePicker.svelte";

  /** @type {import("$types").Input["id"]} id */
  export let id;

  /** @type {import("$types").Input["label"]} label */
  export let label;

  /** @type {import("$types").Input["type"]} type */
  export let type = "text";

  /** @type {import("$types").Input["error"]} [error="An error occurred"] */
  export let error = "An error occurred";

  /** @type {import("$types").Input["value"]} [value] */
  export let value = null;

  /** @type {import("$types").Input["desc"]} desc */
  export let desc = undefined;

  /** @type {import("$types").Input["margin"]} [margin] */
  export let margin = false;

  /** @type {import("$types").Input["bounds"]} [bounds] */
  export let bounds = undefined;

  /** @type {import("$types").Input["validation"]} [validation] */
  export let validation = undefined;

  /** @type {import("$types").Input["rows"]} [rows] */
  export let rows = 5;

  /** @type {import("$types").Input["typeahead"]} [typeahead] */
  export let typeahead = undefined;

  /** @type {import("$types").Input["autocomplete"]} [autocomplete] */
  export let autocomplete = true;

  /** @type {import("$types").Input["validate_on_blur"]} [validate_on_blur] */
  export let validate_on_blur = $configStore.validate_on_blur;

  /** @type {import("$types").Input["debounce"]} [debounce] */
  export let debounce = 350;

  /** @type {import("$types").Input["disabled"]} [disabled] */
  export let disabled = false;

  /** @type {import("$types").Input["extensions"]} extensions=[".png", ".jpg", ".jpeg", ".svg"] */
  export let extensions = [".png", ".jpg", ".jpeg", ".svg"];

  /** @type {import("$types").Input["typeahead_options"]} [typeahead_options] */
  export let typeahead_options = [];

  /** @type {import("$types").Input["onselect"]} [onselect] */
  export let onselect = undefined;

  /** @type {import("$types").Input["allow_multiple_files"]} [allow_multiple_files] */
  export let allow_multiple_files = true;

  /** @type {import("$types").Input["display_value"]} [display_value] */
  export let display_value = undefined;

  /** @type {import("$types").Input["width"]} [width=100] */
  export let width = 100;

  $: is_list_open = Array.isArray(typeahead_options) && typeahead_options.length > 0 ? true : false;

  let accept_extensions = Array.isArray(extensions)
    ? extensions.join(",")
    : [".png", ".jpg", ".jpeg", ".svg"].join(",");

  $: _label = configLabel(label, validation);
  let focused = false;
  let has_file = value ? true : false;
  let invalid_src, image_hover; //only used for files
  let was_typeahead_options_selected = false;
  // let show_datepicker = false;
  // let DatePicker;

  const PREVIEW_TYPES = [
    "image/png",
    "image/svg+xml",
    "image/gif",
    "image/jpeg",
    "image/webp",
    "image/avif",
    "image/apng",
    "image/bmp",
    "image/tiff",
  ];

  $: is_error = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  $: if (is_error) {
    setTimeout(() => {
      $pageStore.errors = $pageStore.errors.filter((a) => a !== id);
      is_error = false;
    }, $configStore.error_delay);
  }

  //options for typeahead inside of input or textarea elements
  // $: typeahead_options = [];
  $: is_loading = $pageStore.loading.includes(id);

  onMount(() => {
    if (type === "file" && value) {
      if (value.startsWith("http") || value.startsWith("https")) {
        fetch(value, {
          method: "GET",
        })
          .then((res) => {
            return res.blob();
          })
          .then(async (blob) => {
            value = await toBase64(blob);
          });
      }
    }
  });

  /**
   * @param {Event} event
   * @returns {void}
   */
  function dateFieldFocused(event) {
    event.currentTarget.type = "date";
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  function dateFieldBlurred(event) {
    if (!event?.currentTarget?.value) {
      event.currentTarget.type = "text";
    }
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  function timeFieldFocused(event) {
    event.currentTarget.type = "time";
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  function timeFieldBlurred(event) {
    if (!event.currentTarget.value) {
      event.currentTarget.type = "text";
    }
  }

  async function typeaheadOnInput(event) {
    const typeahead_value = event.target.value;
    was_typeahead_options_selected = false;
    display_value = null;

    await new Promise((resolve) => setTimeout(resolve, debounce));

    if (typeahead && typeahead_value === value && value) {
      showLoading(id);
      typeahead(typeahead_value)
        .then((options) => {
          hideLoading(id);

          if (options && options.length && was_typeahead_options_selected === false) {
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
          hideLoading(id);
          typeahead_options = [];
        });
    }

    if (!value) {
      hideLoading(id);
      typeahead_options = [];
    }
  }

  function inputFocused() {
    if (display_value) {
      value = "";
      display_value = null;
    }

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

    if (validate_on_blur === true) {
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

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  async function fileChanged(event) {
    value = null;
    _label = label;
    invalid_src = false;
    const input = event.target;

    if (input.files && input.files[0]) {
      const base64_values_promises = [...input.files].map(async (file) => {
        return toBase64(file);
      });

      const base64_values = await Promise.all(base64_values_promises);

      if (base64_values.length === 1) {
        value = base64_values[0];
      } else {
        value = base64_values;
      }

      if (!PREVIEW_TYPES.includes(input.files[0].type)) {
        _label = input.files[0].name;
        invalid_src = true;
      }
      has_file = true;
    } else {
      has_file = false;
    }
  }

  //tags

  let is_adding_tags = false;
  let tags = ["testing", "a long test", "a long test", "a long test", "a long test"];

  function toggleTags(event) {
    if (is_adding_tags) {
      is_adding_tags = false;
    } else {
      is_adding_tags = true;
    }
  }

  function tagCreated(new_value) {
    value = [...new Set([...value, new_value])];
  }
</script>

<div
  class="form__field__container js-bubbles-field-container"
  class:w-100={width == 100}
  class:w-75={width == 75}
  class:w-50={width == 50}
  class:w-25={width == 25}
  {id}
  class:mb-2={margin}
  in:scale|local={{
    duration: 750,
    opacity: 0,
    start: 0.5,
    easing: quintOut,
  }}
  out:scale|local={{
    duration: 600,
    opacity: 0,
    start: 0,
    easing: quintOut,
  }}
>
  {#if type === "text"}
    <div class="field" class:active={focused || value}>
      {#if display_value}
        <div class="display__value" on:mousedown={() => inputFocused()}>
          <span class="text">
            {display_value}
          </span>
          <span class="display_value_icon">
            <svelte:component this={display_value_icon} />
          </span>
        </div>
      {/if}

      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
      <div class="field__wrap">
        <input
          class:hide__text={display_value}
          class="field__input"
          class:error={is_error}
          type="text"
          autocomplete={autocomplete ? "on" : "nope"}
          spellcheck={display_value ? "false" : "true"}
          bind:value
          name={id}
          on:focus={inputFocused}
          on:blur={inputBlurred}
          on:input={typeaheadOnInput}
          {disabled}
        />
        {#if is_loading}
          <span class="spinner" />
        {/if}

        <Dropdown
          bind:options={typeahead_options}
          bind:is_list_open
          search={false}
          bind:value
          on:select={(event) => {
            was_typeahead_options_selected = true;
            typeahead_options.length = 0;
            is_list_open = false;

            if (onselect) {
              onselect(event?.detail?.value, event);
            }
          }}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "email"}
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
          name={id}
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
          {disabled}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "tel" || type === "phone"}
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
          name={id}
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
          {disabled}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "password"}
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
          name={id}
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
          {disabled}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "date"}
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
          max="9999-12-31"
          name={id}
          bind:value
          on:focus={inputFocused}
          on:focus={dateFieldFocused}
          on:blur={inputBlurred}
          on:blur={dateFieldBlurred}
          {disabled}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "number"}
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
          name={id}
          on:focus={inputFocused}
          on:blur={inputBlurred}
          min={bounds ? bounds[0] : null}
          max={bounds ? bounds[1] : null}
          {disabled}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "time"}
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
          type="text"
          bind:value
          name={id}
          on:focus={inputFocused}
          on:focus={timeFieldFocused}
          on:blur={inputBlurred}
          on:blur={timeFieldBlurred}
          {disabled}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "textarea"}
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
          name={id}
          on:focus={inputFocused}
          on:blur={inputBlurred}
          on:input={typeaheadOnInput}
          {disabled}
          bind:value
        />
        {#if is_loading}
          <span class="spinner" />
        {/if}

        {#if typeahead_options && typeahead_options.length > 0}
          <Dropdown
            bind:options={typeahead_options}
            bind:is_list_open
            search={false}
            bind:value
            on:select={(event) => {
              was_typeahead_options_selected = true;
              typeahead_options.length = 0;
              if (onselect) {
                onselect(event?.detail?.value, event);
              }
            }}
          />
        {/if}
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "file"}
    <div class="field">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <div
        class="image__preview"
        class:has_file
        on:click={(event) => {
          if (event.currentTarget.classList.contains("has_file")) {
            event.preventDefault();
            value = null;
            has_file = false;
            _label = label;
            showToast("File deleted", "success");
          }
        }}
        on:mouseover={(event) => {
          image_hover = true;
        }}
        on:mouseout={(event) => {
          image_hover = false;
        }}
      >
        {#if !value && !is_error}
          <span>{_label}</span>
        {:else if is_error}
          <span class="error">{error}</span>
        {/if}

        <input
          type="file"
          class="image__upload_button"
          on:change={fileChanged}
          {id}
          accept={accept_extensions}
          name={id}
          bind:value
          multiple={allow_multiple_files}
        />
        {#if value && !invalid_src && !image_hover && !Array.isArray(value)}
          <img src={value} alt={_label} />
        {:else if value && !invalid_src && !image_hover && Array.isArray(value)}
          <span>{value.length} files selected</span>
        {:else if value && !image_hover}
          <span>{_label}</span>
        {/if}
      </div>
    </div>
  {:else if type === "chip" || type === "tag"}
    <div class="field" class:active={tags && tags.length}>
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>

      <div class="field__wrap">
        <div class="field__tags" on:mousedown={toggleTags}>
          {#if Array.isArray(value)}
            {#each value as label}
              <Tag
                {label}
                margin="0 .5rem 0.5rem 0"
                on:click={(event) => {
                  // event.preventDefault();
                  console.log(event.detail);

                  const label = event.detail.label;
                  console.log(label);
                  console.log(value);
                  value = value.filter((item) => item !== label);
                  console.log(value);
                }}
              />
            {/each}
          {/if}
        </div>

        {#if is_loading}
          <span class="spinner" />
        {/if}

        {#if is_adding_tags && typeahead_options && typeahead_options.length > 0}
          <Dropdown
            bind:options={typeahead_options}
            bind:is_list_open
            placeholder="Type to add a tag..."
            {type}
            search_threshold={0}
            search={true}
            create_option={true}
            on:created={(event) => {
              console.log(event.detail);
              tagCreated(event?.detail?.value);
            }}
            on:select={(event) => {
              console.log(event.detail);
              tagCreated(event?.detail?.value);
            }}
            on:active={(event) => {
              if (event.detail === false) {
                is_adding_tags = false;
              }
            }}
          />
        {/if}
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else if type === "hidden"}
    <div class="field">
      <div class="field__wrap">
        <input class="field__input" type="hidden" bind:value name={id} />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {:else}
    <div class="field center" class:active={focused || value}>
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
          name={id}
          on:focus={inputFocused}
          on:blur={inputBlurred}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :global(input[type="time"]::-webkit-calendar-picker-indicator) {
    background: none;
    display: none;
  }

  :global(input[type="date"])::-webkit-inner-spin-button,
  :global(input[type="date"])::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  textarea:disabled,
  input:disabled {
    color: var(--gray);
    cursor: not-allowed;
  }

  .form__field__container {
    width: 100%;
  }

  .form__field__container .date__range .fields {
    display: flex;
    justify-content: space-between;
  }

  .date__range .fields .field {
    width: 50%;
  }
  .date__range .fields .field:first-child {
    margin-right: 1rem;
  }
  .date__range .fields .field:last-child {
    margin-left: 1rem;
  }
  .mb-2 {
    margin-bottom: 2rem;
  }

  .field {
    position: relative;
    box-sizing: border-box;
    text-align: left;
  }
  .field.center {
    text-align: center;
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

  .field__tags {
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
    padding: 15px 23px;
    min-height: 5rem;
    transition: all 0.2s;
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
    padding: 0.625rem 1.375rem 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  p.field__desc {
    margin-bottom: 0;
  }

  .spinner {
    position: absolute;
    top: 1.875rem;
    right: 1.25rem;
  }

  .image__preview {
    width: 100%;
    height: 200px;
    padding: 18px 22px;
    border-radius: 12px;
    background: rgba(228, 228, 228, 0.3);
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--blue);
    transition: all 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .image__preview:hover {
    background: var(--black);
    opacity: 0.82;
    color: var(--white);
    transition: all 0.5s;
    z-index: 99;
  }

  .image__preview.has_file:hover {
    background: var(--error);
    opacity: 0.82;
    color: var(--white);
    transition: all 0.5s;
    z-index: 99;
  }

  .image__preview.has_file:hover::before {
    content: "Delete File";
  }

  .image__preview > img {
    max-height: 160px;
    max-width: 100%;
  }

  .image__preview:hover > img {
    opacity: 0;
    display: none;
    transition: all 0.3s;
  }

  .image__preview:hover > span {
    display: block !important;
    position: relative;
    z-index: 10;
    filter: none;
  }

  .image__upload_button {
    position: absolute;
    width: 100%;
    height: 200px;
    margin-top: 0px;
    z-index: 10;
    opacity: 0;
    cursor: pointer;
    filter: blur(2px);
  }

  .display__value {
    width: 100%;
    height: 5rem;
    border-radius: 12px;
    border: 2px solid transparent;
    background: transparent;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    transition: all 0.2s;
    position: absolute;
    padding: 1.125rem 1.35rem 0;
    display: flex;
    justify-content: space-between;
  }

  .display__value span.text {
    font-size: 0.875rem;
    padding-top: 1.25rem;
  }

  .display__value span.display_value_icon {
    height: fit-content;
    padding-top: 0.5rem;
  }

  .display__value span svg {
    fill: var(--primary);
  }

  input.hide__text {
    color: transparent;
  }

  .w-100 {
    width: 100%;
  }

  .w-75 {
    width: 72.5%;
  }

  .w-50 {
    width: 47.5%;
  }

  .w-25 {
    width: 22.5%;
  }

  :global(html.dark) textarea:disabled,
  :global(html.dark) input:disabled {
    color: var(--gray);
  }
  :global(html.dark) .field__label {
    color: var(--gray-lighter);
  }

  :global(html.dark) .field__textarea,
  :global(html.dark) .image__preview,
  :global(html.dark) .field__input {
    background: var(--dark);
    color: var(--gray-lighter);
  }
  :global(html.dark) input,
  :global(html.dark) .display__value {
    caret-color: var(--white);
    color: var(--gray-lighter);
  }
</style>
