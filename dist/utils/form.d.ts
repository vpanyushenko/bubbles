/**
 * @template T
 * Gets an Object of input keys and their entered values
 * @param {import("$types").FormInput[]} inputs - The array of Select objects.
 * @param {Object} [options] - options you can pass
 * @param {boolean} [options.include_hidden_props = false] - if you want to include inputs that were hidden as a result of another input (logic set in the "hidden_if" property)
 * @param {string|number|boolean|null} [options.hidden_prop_values = null] - if you do want to include hidden inputs, you can set their value. By default, it will set the value to null, but you can pick any value you want. If you set this to the string "**"", if will include the last entered value of this input.
 * @param {boolean} [options.debug = false] - if you do want to include hidden inputs, you can set their value. By default, it will set the value to null, but you can pick any value you want. If you set this to the string "**"", if will include the last entered value of this input.
 * @returns {Promise<Record<import("$types").FormInput["id"], import("$types").FormInput["value"]>>} key value pairs of your inputs and their values
 */
export function getFormData<T>(inputs: import("$types").FormInput[], options?: {
    include_hidden_props?: boolean | undefined;
    hidden_prop_values?: string | number | boolean | null | undefined;
    debug?: boolean | undefined;
} | undefined): Promise<Record<import("$types").FormInput["id"], import("$types").FormInput["value"]>>;
export function getValidationRequirements(validation: any): any;
export function isValidInput(value: any, validation: any): boolean;
/**
 * Will validate the inputs based on the validation parameters you entered and add any errors to the page store.
 * @param {Array} inputs - The array of input objects you passed to the form
 * @returns {Promise<Array>} Returns an array of errors
 */
export function validateInputs(inputs: any[]): Promise<any[]>;
/**
 * @template T
 * Submits data to and endpoint after running `validateInputs` and `getFormData` functions
 * @param {Array<Object>} inputs - the inputs you used to create the form
 * @param {String} endpoint - The endpoint to submit the results to. If it's submitting to an internal endpoint, bubbles will prefix the URI from import.meta.env.VITE_API_URL
 * @param {Object} options
 * @param {String} [options.method="POST"] - method for the fetch function
 * @param {Boolean} [options.show_toast=true] - If a toast should me shown. Looks for a message property in the response
 * @param {Boolean} [options.toast=true] - An alias for show_toast
 * @param {Boolean} [options.hide_modal=true] - If a model is active, will hide the model
 * @param {?String} [options.loading=null] - The ID of the element to show a loading animation for and hide loading when the fetch is done.
 * @param {("include"|"same-origin"|"omit")} [options.credentials="include"] - If you want credentials to be sent with the request
 * @param {Boolean} [options.debug=false] - If you want debug logs for this function
 * @param {Boolean} [options.include_hidden_props=false] - if you want to include inputs that were hidden as a result of another input (logic set in the "hidden_if" property)
 * @param {?String} [options.bearer] - The bearer token to add to the authorization headers
 * @param {(String|Number|Boolean|null)} [options.hidden_prop_values = null] - if you do want to include hidden inputs, you can set their value. By default, it will set the value to null, but you can pick any value you want. If you set this to the string "**"", if will include the last entered value of this input.
 * @param {?Object} [options.data = null] - This object will be merged with the one generated from inputs. This will override any properties from inputs that conflict.
 * @returns {Promise<T>} The response from the api request
 */
export function submitForm<T>(inputs: Array<Object>, endpoint: string, options?: {
    method?: string | undefined;
    show_toast?: boolean | undefined;
    toast?: boolean | undefined;
    hide_modal?: boolean | undefined;
    loading?: string | null | undefined;
    credentials?: "include" | "same-origin" | "omit" | undefined;
    debug?: boolean | undefined;
    include_hidden_props?: boolean | undefined;
    bearer?: string | null | undefined;
    hidden_prop_values?: string | number | boolean | null | undefined;
    data?: Object | null | undefined;
}): Promise<T>;
