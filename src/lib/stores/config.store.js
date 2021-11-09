import { writable } from "svelte/store";

export const configStore = writable({
  validate_on_blur: true,
  show_required: false,
});
