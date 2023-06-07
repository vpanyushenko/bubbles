<script>
  import { Tag } from "$lib/index.js";

  /** @type {string=}*/
  export let label;
  /** @type {string=}*/
  export let image;
  /** @type {import("$types").Tag=}*/
  export let tag;
</script>

<div class="divider" tabindex="-1">
  <hr class="left" />
  <div class="flex">
    {#if image} <img src={image} alt={label || "Divider"} /> {/if}
    {#if tag?.label} <Tag {...tag} margin="0 0 0.5rem 0" /> {/if}
    {#if label} <span>{label}</span> {/if}
  </div>
  <hr class="right" />
</div>

<style>
  .divider {
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 100%;
    display: flex;
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 15rem;
    text-align: center;
  }

  img {
    width: 10rem;
    height: 5rem;
    margin-bottom: 0.5rem;
    object-fit: cover;
  }

  span {
    padding: 0 1.25rem;
  }

  .left,
  .right {
    flex-grow: 1;
    margin: 0;
  }

  .left,
  .right {
    flex-grow: 1;
    margin: 0;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-light);
    clear: both;
    margin-bottom: 1rem;
  }

  :global(html.dark) hr {
    border-top: 1px solid var(--dark);
  }

  :global(html.dark) span {
    color: var(--gray);
  }
</style>
