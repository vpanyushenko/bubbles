/**
 * Adds a * to the label of an input if the it's required
 * @param {String} label - the label for an input
 * @param {String} validation - The validations string for the input
 * @returns {String} if the validation is required and the show_required is true in the configStore, will add a * to the end of the label
 */
export function configLabel(label: string, validation: string): string;
