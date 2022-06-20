import { writable, derived } from "svelte/store";

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
});

const modalStore = writable({ title: "", active: false, form: [], message: "", img: null, footer: [] });

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
  table: {
    selected_table_rows: 0,
    checkbox_options: [],
    id: null,
  },
  search: null,
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
