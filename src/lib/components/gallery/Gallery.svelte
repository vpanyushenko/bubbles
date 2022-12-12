<script>
  import { uuid, Overlay, Button, ButtonGroup, CardHeader, pageStore } from "$lib/index";

  import icon_add from "./add.svg";

  export let id = uuid();
  export let images = [];
  export let grid = null;
  export let page = 1;
  export let overlay_buttons = [];
  export let title = null;
  export let pagination = false;
  export let buttons = [];
  export let previous_icon = "__default";
  export let next_icon = "__default";
  /**@type {?Function} new_image - A function to add a new image */
  export let new_image = null;

  let calculated_page = 1;
  let show_details = false;
  let selected_image;
  $pageStore.focused_gallery_id = null;

  if (!images) images = [];
  if (!grid) grid = "1x1";

  let columns = 1;
  let rows = 1;
  let style = "";
  let items_per_page = columns * rows;
  let total_pages = Math.ceil(images.length / items_per_page) || 1;
  let paginated_images = [[]];
  let __current_page = 1;
  let __pagination_added = false;

  const pagination_buttons = [
    { icon: previous_icon === "__default" ? "arrowLeft" : previous_icon, onclick: () => page-- },
    { icon: next_icon === "__default" ? "arrowRight" : next_icon, onclick: () => page++ },
  ];

  if (!Array.isArray(buttons)) buttons = [];

  $: if (pagination && images.length > 0 && images.length + 1 > items_per_page && !__pagination_added) {
    __pagination_added = true;
    buttons = buttons.concat(pagination_buttons);
  }

  $: selected_image_index = images.findIndex((image) => image === selected_image);

  if (new_image && !images.find((a) => a === "add")) {
    images.push("add");
  }

  $: if (page <= 0) {
    const total = Math.floor(page / total_pages) * total_pages;

    calculated_page = page - total;

    if (calculated_page === 0) {
      calculated_page = total_pages;
    }
  } else if (page > total_pages) {
    calculated_page = page - Math.floor(page / total_pages) * total_pages;

    if (calculated_page === 0) {
      calculated_page = total_pages;
    }
  } else {
    calculated_page = page;
  }

  $: if (images) {
    //reset values
    show_details = false;

    paginated_images = [[]];
    __current_page = 1;

    //Create the dynamic style
    let fr_columns = [];
    let fr_rows = [];

    const split = grid ? grid.toLowerCase().split("x") : ["1", "1"];

    if (split.length == 2) {
      columns = split[0];
      rows = split[1];
    }

    for (let i = 0; i < columns; i++) {
      fr_columns.push("1fr");
    }

    for (let i = 0; i < rows; i++) {
      fr_rows.push("1fr");
    }

    items_per_page = columns * rows;
    total_pages = Math.ceil(images.length / items_per_page) || 1;
    style += `grid-template-columns: ${fr_columns.join(" ")};`;
    style += `grid-template-rows: ${fr_rows.join(" ")};`;

    if (new_image && !images.find((a) => a === "add")) {
      images.push("add");
    }

    images.forEach((image, index) => {
      let page = Math.ceil((index + 1) / (columns * rows));

      if (page > __current_page) {
        paginated_images.push([]);
        __current_page = page;
      }

      paginated_images[page - 1].push(image);
    });

    paginated_images = paginated_images;
  }

  async function keydown(event) {
    let __selected_image_index = selected_image_index;

    //wait for 50 ms in case we are inside of a modal to make sure the modal is not dismissed since
    //we have two overlays on top of each other
    await new Promise((resolve) => setTimeout(resolve, 50));

    if (event.code === "Escape" && show_details) {
      event.preventDefault();
      show_details = false;
      selected_image = null;
      $pageStore.focused_gallery_id = null;
      return;
    }

    if (event.code === "ArrowRight") {
      if (show_details && $pageStore.focused_gallery_id === id) {
        event.preventDefault();
        let next_image = images[selected_image_index + 1];
        __selected_image_index++;

        if (next_image === "add") {
          next_image = images[selected_image_index + 2];
          __selected_image_index++;
        }

        if (next_image) {
          selected_image = next_image;
          selected_image_index = __selected_image_index;
        } else {
          selected_image = images[0];
          selected_image_index = 0;
        }
      } else {
        event.preventDefault();
        if (document.querySelectorAll(".js-bubbles-gallery")?.length === 1) page++;
      }
    }

    if (event.code === "ArrowLeft") {
      if (show_details && $pageStore.focused_gallery_id === id) {
        event.preventDefault();
        let next_image = images[selected_image_index - 1];
        __selected_image_index--;

        if (next_image === "add") {
          next_image = images[selected_image_index - 2];
          __selected_image_index--;
        }

        if (next_image) {
          selected_image = next_image;
          selected_image_index = __selected_image_index;
        } else {
          selected_image = images[images.length - 1] === "add" ? images[images.length - 2] : images[images.length - 1];
          selected_image_index = images.length - 1 === "add" ? images.length - 2 : images.length - 1;
        }
      } else {
        event.preventDefault();
        if (document.querySelectorAll(".js-bubbles-gallery")?.length === 1) page--;
      }
    }
  }

  function viewImageDetails(image, gallery_id) {
    show_details = true;
    selected_image = image;
    $pageStore.focused_gallery_id = gallery_id;
  }
</script>

<svelte:body on:keydown={keydown} />

{#if title || (Array.isArray(buttons) && buttons.length)}
  <CardHeader {title} px={2} {buttons} />
{/if}

<div class="gallery js-bubbles-gallery" {style} {id}>
  {#if calculated_page > 0 && calculated_page <= total_pages}
    {#each paginated_images[calculated_page - 1] as image, i}
      <div class="grid__img">
        {#if image === "add" && new_image}
          <div class="add" on:click={() => new_image()}>
            <img src={icon_add} alt="Add File" />
          </div>
        {:else}
          <img src={image} alt={`Gallery Image ${i}`} on:click={() => viewImageDetails(image, id)} loading="lazy" />
        {/if}
      </div>
    {/each}
  {/if}
</div>

{#if show_details}
  <Overlay onclick={() => (show_details = false)} transition_duration={200}>
    <div class="buttons">
      <ButtonGroup larger={false}>
        {#each overlay_buttons as button, i}
          <Button icon="more" color="gray-lighter" id={selected_image} {...button} larger={false} />
        {/each}
        <Button icon="close" color="gray-lighter" larger={false} />
      </ButtonGroup>
    </div>
    <img class="details" src={selected_image} alt={`Gallery photo ${selected_image + 1}`} loading="lazy" />
  </Overlay>
{/if}

<style>
  .gallery {
    display: grid;
  }

  .grid__img {
    aspect-ratio: 1;
    cursor: pointer;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  img.details {
    max-width: 100vw;
    max-height: 100vh;
  }

  img:hover {
    opacity: 80%;
    transition: all;
    transition-duration: 500ms;
  }

  img.details:hover {
    opacity: 100%;
  }

  .add {
    width: 100%;
    height: 100%;
    background-color: var(--gray-lighter);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add:hover {
    background-color: var(--gray-light);
  }

  .add img {
    width: 2rem;
    height: 2rem;
  }

  .buttons {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  :global(html.dark) .add {
    background-color: var(--dark);
  }

  :global(html.dark) .add:hover {
    background-color: var(--dark-darker);
    transition: all;
    transition-duration: 500ms;
  }

  :global(html.dark) .add img {
    width: 2rem;
    height: 2rem;
    filter: invert();
  }
</style>
