<script>
  import Button from "$lib/components/button/Button.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { showToast } from "$lib/utils/toast";
  import { v4 as uuid } from "@lukeed/uuid";

  let id = uuid();
  export let src = null;
  export let fetch_options = {
    method: "POST",
  };
  export let endpoint = ``;
  export let toast = true;
  export let button = { color: "primary", label: "Submit" };
  export let extensions = [".png", ".jpg", ".jpeg", ".svg"];
  export let label = "Select File";
  export let callback = null;

  let value;

  $: disabled = src ? false : true;

  let _placeholder_src = null;

  if (Array.isArray(extensions)) {
    extensions = extensions.join(",");
  }

  function fileAdded(event) {
    src = null;
    const input = event.target;

    if (input.files && input.files[0]) {
      src = URL.createObjectURL(input.files[0]);
      //Check if we can show the preview, or if it's a file that does not support
      //a preview like a csv or pdf

      const preview_types = [
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

      if (!preview_types.includes(input.files[0].type)) {
        _placeholder_src = input.files[0].name;
      }
    }
  }

  function submit(event) {
    const button_id = event.currentTarget.id;

    showLoading(button_id);

    const file = document.getElementById(id).files[0];

    const data = new FormData();
    data.append("file", file);

    fetch_options.body = data;

    fetch(endpoint, fetch_options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (toast) {
          showToast(res.message, "success");
        }

        if (callback) {
          callback();
        }
      })
      .catch((err) => {
        if (toast) {
          showToast(err.message, "error");
        }
      })
      .finally(() => {
        src = null;
        hideLoading(button_id);
      });
  }
</script>

<div class="field">
  <div class="image__preview">
    <span class:hidden={src}>{label}</span>
    <input
      bind:value
      type="file"
      class="upload__button"
      on:change={fileAdded}
      {id}
      accept={extensions}
      on:click={() => (src = null)}
    />
    {#if src && !_placeholder_src}
      <img {src} alt="Upload Preview" />
    {:else if src && _placeholder_src}
      <p>{_placeholder_src}</p>
    {/if}
  </div>
</div>

<Button {...button} onsubmit={submit} {disabled} />

<style>
  .field {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 1.5rem;
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

  .upload__button {
    position: absolute;
    width: 100%;
    height: 200px;
    margin-top: 0px;
    z-index: 10;
    opacity: 0;
    cursor: pointer;
    filter: blur(2px);
  }

  p {
    position: absolute;
    margin-bottom: 0;
    opacity: 1;
  }

  .image__preview:hover > p {
    display: none;
  }
</style>
