import { writable, derived } from "svelte/store";
import { browser } from "$app/environment";

const configStore = writable({
  validate_on_blur: true,
  show_required: false,
  toast_delay: 5500,
  error_delay: 4500,
  debug: true,
  padding: "roomy",
  radius: "rounded",
  max_content_width: 1200,
  dark_mode_invert: true,
  back_nav: "history",
});

const modalStore = writable({
  title: "",
  active: false,
  form: [],
  message: "",
  img: null,
  footer: [],
  type: "default",
  gallery: null,
});

const pageStore = writable({
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
  focused_gallery_id: null,
  table: {
    selected_table_rows: 0,
    checkbox_options: [],
    id: null,
  },
  search: null,
  is_search_active: false,
  dark_mode: browser && localStorage.getItem("bubbles-color-scheme") === "dark" ? true : false,
});

const noscrollStore = derived([modalStore, pageStore], ([$modalStore, $pageStore]) => {
  if ($modalStore.active || $pageStore.sidebar.is_toggled) {
    return true;
  } else {
    return false;
  }
});

const toastStore = writable([]);

export { pageStore, noscrollStore, modalStore, toastStore, configStore };
