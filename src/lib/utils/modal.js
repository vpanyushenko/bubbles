import { modalStore } from "$lib/stores/modal.store";

/**
 * Shows a modal
 * @param {String} title - The title of the modal
 * @param {Object} options - Options for the modal
 * @param {String} options.message - If you want the modal to display a message.
 * @param {Array} options.form - An array of form inputs
 * @param {Array} options.footer - An array of buttons for the modal footer. Usually cancel and confirm combos.
 */
const showModal = (title, options = { message: "", form: [], footer: [] }) => {
  const _options = {
    message: options.message,
    form: options.form ? options.form : [],
    footer: options.footer ? options.footer : [],
  };

  modalStore.update((data) => {
    data.title = title;
    data.active = true;
    data.form = _options.form;
    data.message = _options.message;
    data.footer = _options.footer;
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
