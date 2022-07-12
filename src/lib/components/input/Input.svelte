<script>
  import { pageStore, configStore } from "$lib/utils/stores";
  import { isValidInput } from "$lib/utils/form";
  import { configLabel } from "$lib/utils/config";
  import Dropdown from "$lib/components/dropdown/Dropdown.svelte";
  import { showToast } from "$lib/utils/toast";
  import { onMount } from "svelte";
  // import DatePicker from "$lib/components/calendar/DatePicker.svelte";

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
  export let debounce = 350;
  export let disabled = false;
  export let extensions = [".png", ".jpg", ".jpeg", ".svg"];
  export let multply_by;
  export let to_js_date = false;
  export let show_calendar = false;
  export let onselect = null;

  if (Array.isArray(extensions)) {
    extensions = extensions.join(",");
  }

  let _label = configLabel(label, validation);
  let focused = false;
  let has_file = value ? true : false;
  let invalid_src, image_hover; //only used for files
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
  $: typeahead_options = [];
  $: is_loading = false;

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

  async function dateFieldFocused(event) {
    if (show_calendar) {
      // if (!DatePicker) {
      //   console.log("importing datepicker");
      //   DatePicker = await import("$lib/components/calendar/DatePicker.svelte");
      // }
      show_datepicker = true;
    }
    event.currentTarget.type = "date";
  }

  function dateFieldBlurred(event) {
    show_datepicker = false;

    if (!event.currentTarget.value) {
      event.currentTarget.type = "text";
    }
  }

  function timeFieldFocused(event) {
    event.currentTarget.type = "time";
  }

  function timeFieldBlurred(event) {
    if (!event.currentTarget.value) {
      event.currentTarget.type = "text";
    }
  }

  async function typeaheadOnInput(event) {
    const typeahead_value = event.target.value;

    await new Promise((resolve) => setTimeout(resolve, debounce));

    if (typeahead && typeahead_value === value && value) {
      is_loading = true;
      typeahead(typeahead_value)
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

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getExtension = (file) => {
    const type = file.split(";")[0].split("/")[1];
  };

  async function fileChanged(event) {
    value = null;
    _label = label;
    invalid_src = false;
    const input = event.target;

    if (input.files && input.files[0]) {
      value = await toBase64(input.files[0]);
      //Check if we can show the preview, or if it's a file that does not support
      //a preview like a csv or pdf

      // getExtension(value);

      if (!PREVIEW_TYPES.includes(input.files[0].type)) {
        _label = input.files[0].name;
        invalid_src = true;
      }
      has_file = true;
    } else {
      has_file = false;
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
          autocomplete={autocomplete ? "on" : "nope"}
          bind:value
          on:focus={inputFocused}
          on:blur={inputBlurred}
          on:input={typeaheadOnInput}
          {disabled}
        />
        {#if is_loading}
          <span class="spinner" />
        {/if}

        {#if typeahead_options && typeahead_options.length > 0}
          <Dropdown
            bind:options={typeahead_options}
            search={false}
            bind:value
            on:select={(event) => {
              if (onselect) {
                onselect(event?.detail?.value);
              }
            }}
          />
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
          {disabled}
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
          {disabled}
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
          {disabled}
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
          {disabled}
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
          {disabled}
        />
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "time"}
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
          type="text"
          bind:value
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
          {disabled}
          bind:value
        />
        {#if is_loading}
          <span class="spinner" />
        {/if}

        {#if typeahead_options && typeahead_options.length > 0}
          <Dropdown
            bind:options={typeahead_options}
            search={false}
            bind:value
            on:select={(event) => {
              if (onselect) {
                onselect(event?.detail?.value);
              }
            }}
          />
        {/if}
      </div>
      {#if desc}
        <p class="field__desc">{@html desc}</p>
      {/if}
    </div>
  </div>
{:else if type === "file"}
  <div class="form__field__container" {id} class:mb-2={margin}>
    <div class="field">
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

        <input type="file" class="image__upload_button" on:change={fileChanged} {id} accept={extensions} bind:value />
        {#if value && !invalid_src && !image_hover}
          <img src={value} alt={_label} />
        {:else if value && !image_hover}
          <span>{_label}</span>
        {/if}
      </div>
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

  .form__field__container.date__range .fields {
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
  :global(html.dark) input {
    caret-color: var(--white);
    color: var(--gray-lighter);
  }
</style>
