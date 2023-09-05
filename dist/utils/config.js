//import { configStore } from "./stores";
import { configStore } from "../utils/stores";
import { get } from "svelte/store";

/**
 * Adds a * to the label of an input if the it's required
 * @param {String} label - the label for an input
 * @param {String} validation - The validations string for the input
 * @returns {String} if the validation is required and the show_required is true in the configStore, will add a * to the end of the label
 */
function configLabel(label, validation) {
  const config = get(configStore);
  return config.show_required && validation && validation.split("|").includes("required") ? `${label}*` : label;
}

export { configLabel };
