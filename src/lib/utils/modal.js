//import { modalStore } from "$lib/utils/stores";
import { modalStore } from "../utils/stores";

/**
 * Shows a modal
 * @param {String} title - The title of the modal
 * @param {Object} options - Options for the modal
 * @param {?String} options.img - An image to include at the top of the modal
 * @param {?String} options.message - If you want the modal to display a message.
 * @param {?Array<Object>} options.form - An array of form inputs
 * @param {?Object} options.file - File form inputs
 * @param {?Array} options.footer - An array of buttons for the modal footer. Usually cancel and confirm combos.
 */
const showModal = (title, options = { message: "", form: [], footer: [], img: null, height: null, file: null }) => {
  modalStore.update((data) => {
    data.title = title;
    data.active = true;
    data.form = options.form || [];
    data.file = options.file || null;
    data.message = options.message || null;
    data.footer = options.footer;
    data.img = options.img || null;
    data.height = options.height || null;
    return data;
  });
};

/**
 * Hides the current modal if there is one
 */
const hideModal = () => {
  modalStore.update((data) => {
    return {};
  });
};

export { showModal, hideModal };
