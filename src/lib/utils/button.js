/**
 * Gets the ID of the parent button after an item was selected
 * @param {String} element - the DOM element. Use event.currentTarget after clicking on an option
 * @returns {String}
 */
const getButtonIDFromDropdownOption = (element) => {
  return element.closest(".icon__btn").querySelector("button").id ?? null;
};

export { getButtonIDFromDropdownOption };
