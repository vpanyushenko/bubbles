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
export function showModal(title: string, options?: {
    img: string | null;
    message: string | null;
    form: Array<any> | null;
    file: any | null;
    footer: any[] | null;
}): void;
/**
 * Hides the current modal if there is one
 */
export function hideModal(): void;
