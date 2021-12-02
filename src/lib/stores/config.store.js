import { writable } from "svelte/store";

export const configStore = writable({
  validate_on_blur: true,
  show_required: false,
  toast_delay: 5500,
  error_delay: 4500,
});
