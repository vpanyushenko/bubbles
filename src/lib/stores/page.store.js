import { writable, derived } from "svelte/store";
import { modalStore } from "$lib/stores/modal.store";

export const pageStore = writable({
  title: null,
  sidebar: {
    is_toggled: false,
    active_item: null,
    notifications: {},
  },
  select: null,
  dropdown: null,
  is_fetching: false,
  loading: [],
  clicked: null,
  errors: [],
  host: null,
  is_mobile: false,
});

export const noscrollStore = derived([modalStore, pageStore], ([$modalStore, $pageStore]) => {
  if ($modalStore.active || $pageStore.sidebar.is_toggled) {
    return true;
  } else {
    return false;
  }
});
