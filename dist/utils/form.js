import { v4 as uuid } from "@lukeed/uuid";
import { pageStore, modalStore, toastStore } from "../utils/stores";
import { showLoading, hideLoading } from "../utils/loading";
import merge from "../utils/merge";
import { api_url } from "../utils/fetch";

const _getSize = (value) => {
  if (value instanceof Array) {
    return value.length;
  }

  if (typeof value === "number") {
    return value;
  }

  if (!value) {
    return 0;
  }

  return value.length;
};

const _leapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const _checkFalsePositiveDates = (dateString = "") => {
  if (dateString.length === 10) {
    // massage input to use yyyy-mm-dd format
    // we support yyyy/mm/dd or yyyy.mm.dd
    let normalizedDate = dateString.replace(".", "-").replace("/", "-");
    let parts = normalizedDate.split("-");
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // yyyy-mm-dd format
        let y = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        let d = parseInt(parts[2]);
        if (m === 2) {
          // return _leapYear(y) ? d <= 29 : d <= 28;
          if (_leapYear(y)) {
            if (d > 29) {
              return false;
            }
          } else {
            if (d > 28) {
              return false;
            }
          }
        }
        if (m === 4 || m === 6 || m === 9 || m === 11) {
          if (d > 30) {
            return false;
          }
        }
      }
    }
    return true; // we are not in february, proceed
  }
  return true; // we are not testing formatted date, proceed to rest of validation
};

const _isValidDate = (dateString) => {
  let testDate;
  if (typeof dateString === "number") {
    testDate = new Date(dateString);
    if (typeof testDate === "object") {
      return true;
    }
  }
  // first convert incoming string to date object and see if it correct date and format
  testDate = new Date(dateString);
  if (typeof testDate === "object") {
    if (testDate.toString() === "Invalid Date") {
      return false;
    }

    /**
     * Check for false positive dates
     * perform special check on february as JS `new Date` incorrectly returns valid date
     * Eg.  let newDate = new Date('2020-02-29')  // returns as March 02 2020
     * Eg.  let newDate = new Date('2019-02-29')  // returns as March 01 2020
     * Eg.  let newDate = new Date('2019-04-31')  // returns as April 30 2020
     */
    if (!_checkFalsePositiveDates(dateString)) {
      return false;
    }

    // valid date object and not a february date
    return true;
  }

  // First check for the pattern
  let regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

  if (!regex_date.test(dateString)) {
    return false;
  }

  // Parse the date parts to integers
  let parts = dateString.split("-");
  let day = parseInt(parts[2], 10);
  let month = parseInt(parts[1], 10);
  let year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }

  let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

const _validation = {
  required: (val, req) => {
    let str;

    if (val === undefined || val === null) {
      return false;
    }

    str = String(val).replace(/\s/g, "");
    return str.length > 0 ? true : false;
  },

  boolean: (val, req) => {
    return (
      val === true ||
      val === false ||
      val === 0 ||
      val === 1 ||
      val === "0" ||
      val === "1" ||
      val === "true" ||
      val === "false"
    );
  },

  string: function (val, req) {
    return typeof val === "string";
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  min: function (val, req) {
    const size_value = req.split(":")[1];
    const size = _getSize(val);
    return size >= size_value;
  },

  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  max: function (val, req) {
    const size_value = req.split(":")[1];
    const size = _getSize(val);
    return size <= size_value;
  },

  email: function (val, req) {
    let re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(val)) {
      re =
        /^((?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]|[^\u0000-\u007F])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)+)*$/;
    }
    return re.test(val);
  },

  numeric: function (val, req) {
    let num;

    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

    if (typeof num === "number" && !isNaN(num) && typeof val !== "boolean") {
      return true;
    } else {
      return false;
    }
  },

  number: function (val, req) {
    let num;

    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

    if (typeof num === "number" && !isNaN(num) && typeof val !== "boolean") {
      return true;
    } else {
      return false;
    }
  },

  array: function (val, req) {
    return val instanceof Array;
  },

  url: function (val, req) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(val);
  },

  alpha: function (val, req) {
    return /^[a-zA-Z]+$/.test(val);
  },

  alpha_dash: function (val, rqe) {
    return /^[a-zA-Z0-9_\-]+$/.test(val);
  },

  alpha_num: function (val, req) {
    return /^[a-zA-Z0-9]+$/.test(val);
  },

  accepted: function (val, req) {
    if (
      val === "on" ||
      val === "yes" ||
      val === 1 ||
      val === "1" ||
      val === true ||
      val === "true" ||
      val === "checked"
    ) {
      return true;
    }

    return false;
  },

  integer: function (val, req) {
    return String(parseInt(val, 10)) === String(val);
  },

  match: function (val, req) {
    req = req.split(":")[1];

    if (req) {
      req = req.toString().toLowerCase();
    }

    if (val) {
      val = val.toString().toLowerCase();
    }

    if (val === req) {
      return true;
    }

    return false;
  },

  regex: function (val, req) {
    req = req.split(":")[1];
    let mod = /[g|i|m]{1,3}$/;
    let flag = req.match(mod);
    flag = flag ? flag[0] : "";

    req = req.replace(mod, "").slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },

  date: function (val, req) {
    if (!val) {
      return false;
    }

    return _isValidDate(val);
  },
};

const _inputTypes = [
  "text",
  "phone",
  "tel",
  "switch",
  "textarea",
  "phone",
  "select",
  "select-number", //custom type for bubbles
  "checkbox",
  "checkbox-group", //custom type for bubbles
  "radio",
  "radio-group",
  "date",
  "password",
  "email",
  "search",
  "time",
  "url",
  "number",
  "hidden",
  "stripe",
  "stripe-card",
  "file",
  "tag",
  "chip",
];

/**
 * Creates a stripe token from a card input
 * @param {Object} stripe_input - the input that has the stripe element data
 * @param {Object} inputs - the rest of the inputs from the form
 */
const createStripeToken = (stripe_input, inputs) => {
  return new Promise((resolve, reject) => {
    //we should check if there is a card token already here. This could happen if the card was created
    //during data validation, and then this function is called again when getting the form data since
    //some users may forgo doing data validation on the front end.

    if (stripe_input?.value?.card?.id) {
      return resolve(stripe_input?.value);
    }

    const stripe = stripe_input.__stripe;
    const card = stripe_input.__stripe_card;

    //we need to find any other inputs that the user wanted to
    //add to the stripe token, usually the name
    const dictionary = stripe_input.stripe_token_values;
    const keys = Object.values(dictionary);
    const options = {};

    keys.forEach((key) => {
      const input = inputs.find((a) => a.id === key);
      const stripe_key = Object.keys(dictionary).find((a) => dictionary[a] === key);
      options[`${stripe_key}`] = input.value;
    });

    stripe
      .createToken(card, options)
      .then((result) => {
        if (result.error) {
          const err = {};
          err.message = result.error.message;
          throw err;
        }

        resolve(result.token);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

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
const getFormData = async (
  inputs,
  options = { include_hidden_props: false, hidden_prop_values: null, debug: false }
) => {
  if (!options) options = {};

  options.include_hidden_props = options.include_hidden_props === true ? true : false;
  options.hidden_prop_values = options.hidden_prop_values === undefined ? null : options.hidden_prop_values;
  options.debug = options.debug || false;

  let data = {};

  //remove inputs from data if the use does not want to input hidden items
  const filtered_inputs = !options.include_hidden_props ? inputs.filter((input) => input.is_hidden === false) : inputs;

  const promises = filtered_inputs.map((input) => {
    return new Promise(async (resolve, reject) => {
      const type = input.type;

      //if there were any inputs that were hidden, we need to check what the user wants to do with them

      if (_inputTypes.includes(type)) {
        let id = input.id;

        let value = input.value;

        if (value === undefined || value === "") {
          value = null;
        }

        if (input.is_hidden && options.hidden_prop_values !== "**") {
          value = options.hidden_prop_values;
        } else if (type === "number") {
          value = Number(value);

          if (typeof input.multiply_by === "number") {
            value = input.multiply_by * value;
          }
        } else if (type === "date") {
          if (input.to_js_date === true) {
            value = new Date(value);
          }
        } else if (type === "stripe" || type === "stripe-card") {
          //We'll need to find the stripe element that was created in the dom and get the token for the user
          try {
            value = await createStripeToken(input, filtered_inputs);
          } catch (err) {
            return reject(err);
          }
        }

        if (input.split) {
          if (typeof value === "string") {
            value = value
              .split(input.split)
              .filter(Boolean)
              .map((a) => a.trim());
          }

          if (typeof value === "number") {
            value = [value];
          }
        }

        if (id) {
          let array = id.split(".").filter(Boolean);
          let obj = array.reduceRight((obj, elem) => ({ [elem]: obj }), value);

          data = merge(data, obj);
          resolve();
        } else {
          console.error(`No ID provided for input: ${input?.label}`);
          resolve();
        }
      } else {
        resolve();
      }
    });
  });

  return Promise.all(promises)
    .then(() => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};

const getValidationRequirements = (validation) => {
  if (validation) {
    return validation.split("|").filter(Boolean);
  } else {
    return [];
  }
};

const isValidInput = (value, validation) => {
  const requirements = getValidationRequirements(validation) || [];

  //if validation is requested but not required and the field is empty
  if (!value && !requirements.includes("required")) {
    return true;
  }

  const booleans = requirements.map((requirement) => {
    //check each requirement property against the value and see if the condition is met
    requirement = requirement.toLowerCase();

    //some of the requirements have a value like min:3 so we'll just check for the "min"
    const req = requirement.split(":")[0];

    if (_validation[req]) {
      return _validation[req](value, requirement);
    } else {
      console.error(`Bubbles does not support the ${requirement} validation, so it defaulted to true`);
      return true;
    }
  });

  const filtered = booleans.filter(Boolean);

  if (booleans.length === filtered.length) {
    return true;
  } else {
    return false;
  }
};

/**
 * Will validate the inputs based on the validation parameters you entered and add any errors to the page store.
 * @param {Array} inputs - The array of input objects you passed to the form
 * @returns {Promise<Array>} Returns an array of errors
 */
const validateInputs = (inputs) => {
  return new Promise((resolve, reject) => {
    const _inputs = [];

    //make sure we only validate the inputs what are field and not buttons
    inputs.forEach((input) => {
      const type = input.type;

      if (_inputTypes.includes(type)) {
        _inputs.push(input);
      }
    });

    const errors = [];

    const promises = _inputs.map((input) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Some inputs may be dependent on others. If any dependant inputs were removed from the dom,
          // we should not validate them
          if (input.is_hidden) {
            // console.log("hidden", input.id);
            return resolve();
          }

          if (input.type === "stripe" || input.type === "stripe-card") {
            //We'll need to find the stripe element that was created in the dom and get the token for the user
            const value = await createStripeToken(input, _inputs);
            input.value = value;
            return resolve();
          } else if (!isValidInput(input.value, input.validation)) {
            console.log(input.id, input.validation);
            errors.push(input.id);
            return reject(input.id);
          } else {
            resolve();
          }
        } catch (err) {
          errors.push(input.id);
          return reject(input.id);
        }
      });
    });

    Promise.all(promises)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        //show the error indicator for all inputs with issues
        if (errors.length) {
          pageStore.update((obj) => {
            if (obj.errors === undefined || obj.errors === null) {
              obj.errors = [];
            }

            errors.forEach((error) => {
              obj.errors.push(error);
            });

            return obj;
          });
        }

        reject({
          errors: errors,
          failed_validation: true,
          message: "Please make sure all inputs are filled in correctly",
        });
      });
  });
};

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
const submitForm = (
  inputs,
  endpoint,
  options = {
    method: "POST",
    show_toast: true,
    toast: true,
    hide_modal: true,
    include_hidden_props: false,
    hidden_prop_values: null,
    debug: false,
    credentials: "include",
    loading: null,
    bearer: null,
    data: null,
  }
) => {
  return new Promise((resolve, reject) => {
    if (!options.toast || !options.show_toast) {
      options.show_toast = false;
    }

    const METHOD = options.method || "POST";
    const CREDENTIALS = options.credentials || "include";
    const SHOW_TOAST = options.show_toast === false ? false : true;
    const HIDE_MODAL = options.hide_modal === false ? false : true;

    if (options?.debug) {
      console.log(options);
      console.log("method:", METHOD);
      console.log("credentials:", CREDENTIALS);
      console.log("Show Toast:", SHOW_TOAST);
      console.log("Hide Modal:", HIDE_MODAL);
    }

    let data;

    showLoading(options?.loading);

    const loading_button = document.getElementById(options?.loading);
    if (loading_button) loading_button.disabled = true;

    const api = endpoint.startsWith("http") ? endpoint : `${api_url}${endpoint}`;

    if (options?.debug) {
      console.log(`Method: ${METHOD}`);
      console.log(api);
    }

    validateInputs(inputs)
      .then(() => {
        return getFormData(inputs, {
          include_hidden_props: options?.include_hidden_props,
          hidden_prop_values: options?.hidden_prop_values,
          debug: options?.debug,
        });
      })
      .then((obj) => {
        data = obj;

        if (options.data && typeof options.data === "object") {
          console.log("Adding custom data to final object...");
          data = { ...data, ...options.data };
        }

        if (options?.debug) {
          console.log(data);
        }

        /** @type {HeadersInit} */
        const headers = {
          "Content-Type": "application/json",
        };

        if (options.bearer) {
          headers.Authorization = `Bearer ${options.bearer}`;
          if (options?.debug) {
            console.log("Added Bearer token to Authorization header");
          }
        }

        return fetch(api, {
          method: METHOD,
          credentials: CREDENTIALS,
          headers: headers,
          body: JSON.stringify(data),
        });
      })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        hideLoading(options?.loading);
        if (loading_button) loading_button.disabled = false;

        if (options?.debug) {
          console.log(res.message);
        }

        if (res.status >= 200 && res.status < 300) {
          //check if the user wanted to hide the modal
          if (HIDE_MODAL) {
            modalStore.update(() => {
              return {};
            });
          }

          if (SHOW_TOAST) {
            toastStore.update((data) => {
              const toast = {
                message: res.message,
                color: "success",
                active: true,
                id: uuid(),
              };
              data.unshift(toast);
              return data;
            });
          }

          return resolve(res);
        }

        //   //check if the user wanted to redirect to another page
        //   if (options?.goto) {
        //     const array = options?.goto.split("/").filter(Boolean);

        //     if (array) {
        //       let index = array.findIndex((a) => a === ":id");

        //       if (index > 0) {
        //         array[index] = res.data.id;
        //       }

        //       const path = array.join("/");
        //       goto(`/${path}`);
        //     } else {
        //       goto(options?.goto);
        //     }
        //   }
        // }

        if (res.status >= 300 && res.status < 400) {
          console.log("Redirect requested");
          resolve(res);
        }

        if (res.status >= 400) {
          throw res;
        }
      })
      .catch((err) => {
        //this error happened because of a client error
        if (options.debug) {
          console.error(err);
          console.error(err.errors);
        }

        pageStore.update((data) => {
          data.errors = err.errors ? err.errors : data.errors;
          data.is_fetching = false;
          return data;
        });

        toastStore.update((data) => {
          const toast = {
            message: err.message,
            color: "error",
            active: true,
            id: uuid(),
          };
          data.unshift(toast);
          return data;
        });
        hideLoading(options?.loading);
        if (loading_button) loading_button.disabled = false;

        reject(err);
      });
  });
};

export { getFormData, getValidationRequirements, isValidInput, validateInputs, submitForm };
