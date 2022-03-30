import { getQueryParam } from "$lib/utils/url";

/**
 * Returns the API base path
 * @returns {String} - The API base path
 */
const api_url = import.meta.env.VITE_API_URL;

/**
 * Used to run authenticated get requests from the svelte kit load function
 * @param {String|Array<Object>} endpoint - The endpoint you want to hit. If you want to query multiple endpoint pass in an array of objects with the params endpoint and key
 * @param {Object} options - All options to pass to the fetch
 * @param {Function} options.fetch - pass through the fetch function from the svelte kit load function
 * @param {Object} options.url - pass through the url store from the svelte kit load function
 * @param {Object} options.session - pass through the session store from the svelte kit load function
 * @param {Object} options.params - pass through the params store from the svelte kit load function
 * @param {Boolean} [options.debug=false] - Adds debugging logs for the network requests
 * @returns {Promise<Object>} Returns an object with either props, redirect, or error
 */
const fetchData = async (endpoint, options = { fetch: null, url: null, session: null, params: null, debug: false }) => {
  if (options.debug) {
    console.log("Fetching data...");
  }

  const fetch = options.fetch;
  const url = options.url;
  const session = options.session;
  const params = options.params;

  async function getData(endpoint, key = "data") {
    let res, json, pagination;

    let uri = `${api_url}${endpoint}?`;

    if (endpoint.startsWith("http")) {
      uri = `${endpoint}?`;
    }

    if (options.debug) {
      console.log(`Base uri: ${uri}`);
    }

    const query_params = url ? getQueryParam(url) : [];
    const param_keys = Object.keys(query_params);

    param_keys.forEach((key, index) => {
      const value = query_params[key];
      uri += `${key}=${value}&`;
    });

    if (options.debug) {
      console.log(`Fetching: ${uri}`);
    }

    if (options.debug && !session?.token) {
      console.log(`There was no token found on the session store, cookie credentials will still be sent.`);
    }

    try {
      //do the initial get request
      res = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        credentials: "include",
      });

      json = await res.json();

      if (res.ok) {
        pagination = json?.pagination || null;

        return {
          props: {
            [key]: json.data,
            pagination: pagination,
          },
        };
      } else if (!res.ok && json.error_code === "auth.invalid_token") {
        //the session token has expired. We should try to create a new token
        //locally and then set the cookie again
        //if that fails, then redirect to auth

        session.update(() => {
          console.log("Clearing session...");
          return {};
        });
        return { status: 300, redirect: "/auth" };
      } else {
        console.log("There was an error", json.message);
        return { status: json.status, error: json.message };
      }
    } catch (err) {
      console.error(err);
      return { status: 500, error: "Something went wrong. Please reload the page and try again" };
    }
  }

  if (typeof endpoint === "string") {
    return getData(endpoint, "data");
  }

  if (Array.isArray(endpoint)) {
    const promises = endpoint.map((obj) => {
      return getData(obj.endpoint, obj.key);
    });

    return Promise.all(promises)
      .then((array) => {
        const props = {};
        let redirect = null;
        let status = 200;
        let pagination = null;

        array.forEach((obj, index) => {
          if (obj.redirect) {
            redirect = obj.redirect;
            status = obj.status;
          }

          if (obj.pagination) {
            pagination = obj.props.pagination;
          }

          props[endpoint[index].key] = obj.props?.[endpoint[index].key];
        });

        let response = {
          status: status,
          props: props,
          pagination: pagination || null,
          redirect: redirect,
        };

        if (options.debug) {
          console.table(response);
        }

        return response;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export { api_url, fetchData };
