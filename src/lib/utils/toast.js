import { v4 as uuid } from "@lukeed/uuid";
import { toastStore } from "$lib/stores/toast.store";

/**
 * Will show a toast notification
 * @param {String} [message="An error occured"] - The message that will be shown in the toast
 * @param {String} [type="error"] - The type of toast this is. Default is error, otherwise use success
 */
const showToast = (message = "An error occured", type = "error") => {
  const id = uuid();

  toastStore.update((data) => {
    const toast = {
      message: message,
      type: type,
      active: true,
      id: id,
    };

    if (data === undefined || data === null) {
      data = [];
    }
    data.unshift(toast);
    console.log(data);
    return data;
  });
};

export { showToast, toastStore };
