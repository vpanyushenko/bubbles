<script>
  import { createEventDispatcher } from "svelte";
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "../../utils/stores";
  import { onMount } from "svelte";

  const id = `dropdown-${uuid()}`;
  const search_input_id = uuid();

  const dispatch = createEventDispatcher();

  export let value = null;

  let height, y; //window bindings

  let is_focused = false;
  let selected_index = 0;
  let is_search_focused = false;
  let is_using_pointer_device = true;

  // onMount(() => {
  //   //check to see if inside of a model
  //   //if we are, we should adjust the dropdown so it's visible in the modal
  //   const dropdown = document.getElementById(id);
  //   const modal = dropdown ? dropdown.closest(".js-bubbles-modal") : null;
  //   const rect = dropdown ? dropdown.getBoundingClientRect() : null;

  //   //TODO: Not sure why scrollintoView not working
  //   //dropdown.scrollIntoView({ behavior: "smooth", block: "end" });

  //   if (!modal) {
  //     if (rect.bottom + y + 100 > height + y) {
  //       let diff = rect.bottom + 100 - height;

  //       y += diff;
  //     }
  //   } else if (rect) {
  //     const modal_rect = modal.querySelector("main").getBoundingClientRect();

  //     let scroll = rect.bottom - modal_rect.bottom;

  //     if (scroll > 25) {
  //       modal.querySelector("main").scroll({ top: scroll + rect.height, behavior: "smooth" });
  //     }
  //   }
  // });

  // const startOfWeekIndex = 0;

  // const legend = Array(7)
  //   .fill(0)
  //   .map((d, i) =>
  //     dayjs()
  //       .day((startOfWeekIndex + i) % 7)
  //       .format("ddd")
  //   );

  // $: console.log(legend);
</script>

<!-- <svelte:body on:keydown={keydown} /> -->
<svelte:window bind:innerHeight={height} bind:scrollY={y} />

<div class="datepicker" />

<style>
  .datepicker {
    position: absolute;
    /* left: 0; */
    z-index: 9999;
    width: 100%;
    margin: auto;
    margin-top: 8px;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border: 1px solid var(--gray-light);
    background: #ffffff;
    border-radius: 1.5rem;
    cursor: pointer;
    box-shadow: 0 1.25rem 1rem rgba(227, 230, 236, 0.6);
    transition: all 0.25s;
    max-height: 400px;
    overflow-y: auto;
    min-width: 22rem;
    /* left: 0;
    right: 0; */
  }

  :global(html.dark) .datepicker {
    border: 1px solid var(--dark);
    background: var(--dark-darker);
    box-shadow: 0 1.25rem 1rem rgba(0, 0, 0, 0);
  }

  :global(html.dark) hr {
    color: var(--dark-light);
    background-color: var(--dark-light);
  }
  :global(html.dark) .title {
    color: var(--gray-lighter);
  }
  :global(html.dark) .caption {
    color: var(--gray);
  }
  :global(html.dark) .search {
    background: var(--dark);
    color: var(--white);
  }
  :global(html.dark) .option.focused {
    background-color: var(--dark);
  }
  :global(html.dark) img {
    filter: invert();
  }</style>
