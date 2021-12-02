import { v4 as uuid } from "@lukeed/uuid";
import { toastStore } from "$lib/stores/toast.store";
import { now } from "svelte/internal";

/**
 * Will show a toast notification
 * @param {String} [message="An error occured"] - The message that will be shown in the toast
 * @param {String} [color="error"] - The color of toast this is. Default is error, otherwise use success
 */
const showToast = (message = "An error occurred", color = "error") => {
  const id = uuid();

  toastStore.update((data) => {
    const toast = {
      message: message,
      color: color,
      active: true,
      id: id,
      timestamp: Date.now(),
    };

    if (data === undefined || data === null) {
      data = [];
    }
    data.unshift(toast);

    return data;
  });
};

export { showToast, toastStore };
