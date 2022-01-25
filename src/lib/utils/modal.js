import { modalStore } from "$lib/stores/modal.store";

/**
 * Shows a modal
 * @param {String} title - The title of the modal
 * @param {Object} options - Options for the modal
 * @param {Array} options.img - An image to include at the top of the modal
 * @param {String} options.message - If you want the modal to display a message.
 * @param {Array} options.form - An array of form inputs
 * @param {Array} options.footer - An array of buttons for the modal footer. Usually cancel and confirm combos.
 */
const showModal = (title, options = { message: "", form: [], footer: [], img: null, height: null }) => {
  const _options = {
    message: options.message,
    form: options.form ? options.form : [],
    footer: options.footer ? options.footer : [],
    img: options?.img || null,
    height: options.height || null,
  };

  modalStore.update((data) => {
    data.title = title;
    data.active = true;
    data.form = _options.form;
    data.message = _options.message;
    data.footer = _options.footer;
    data.img = _options.img;
    data.height = _options.height;
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

export { showModal, modalStore, hideModal };
