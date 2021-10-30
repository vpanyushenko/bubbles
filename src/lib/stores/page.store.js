import { writable, derived } from "svelte/store";
import { modalStore } from "$lib/stores/modal.store";

export const pageStore = writable({
  title: null,
  sidebar: null,
  sidebar_active: false,
  layout: "one-col",
  select: null,
  dropdown: null,
  fetching: false,
  clicked: null,
  errors: [],
  host: null,
});

export const noscrollStore = derived([modalStore, pageStore], ([$modalStore, $pageStore]) => {
  if ($modalStore.active || $pageStore.sidebar_active) {
    return true;
  } else {
    return false;
  }
});
