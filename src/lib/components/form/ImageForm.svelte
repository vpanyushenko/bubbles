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
  export let button = { color: "primary", label: "Upload Image" };

  function imageAdded(event) {
    const input = event.target;

    console.log(input);
    if (input.files && input.files[0]) {
      src = URL.createObjectURL(input.files[0]);
    }
  }

  function submit(event) {
    const button_id = event.currentTarget.id;

    showLoading(button_id);

    const file = document.getElementById(id).files[0];

    const data = new FormData();
    data.append("image", file);

    fetch_options.body = data;

    fetch(endpoint, fetch_options)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (toast) {
          showToast(res.message, "success");
        }
      })
      .catch((err) => {
        if (toast) {
          showToast(err.message, "error");
        }
      })
      .finally(() => {
        hideLoading(button_id);
      });
  }
</script>

<div class="field">
  <div class="image__preview">
    <span class:hidden={src}>Upload Image</span>
    <input type="file" class="upload__button" on:change={imageAdded} {id} />
    {#if src}
      <img {src} alt="Upload Preview" />
    {/if}
  </div>
</div>

<Button {...button} onclick={submit} onsubmit={submit} />

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
  }

  .upload__button {
    position: absolute;
    width: 100%;
    height: 200px;
    margin-top: 0px;
    z-index: 10;
    opacity: 0;
    cursor: pointer;
  }
</style>
