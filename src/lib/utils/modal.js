import { modalStore } from "$lib/stores/modal.store";

/**
 * Shows a modal
 * @param {String} title - The title of the modal
 * @param {Array<Objects>} blocks - The blocks of inputs that you want to include
 */
const showModal = (title, blocks) => {
  modalStore.update((data) => {
    data.title = title;
    data.active = true;
    data.inputs = blocks ? blocks : [];
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
