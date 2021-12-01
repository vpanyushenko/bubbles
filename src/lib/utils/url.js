// function pagination(action) {
//   event.preventDefault();
//   button.disabled = true;

//   const urlParams = new URLSearchParams(window.location.search);
//   // const limit = urlParams.get("limit");
//   const page = urlParams.get("page");

//   if (action === "next") {
//     button.querySelectorAll("span")[1].classList.remove("hidden");
//     button.querySelector("svg").classList.add("hidden");
//     if (!page) {
//       addQueryParam("page", 2);
//     } else {
//       addQueryParam("page", parseInt(page) + 1);
//     }
//   }

//   if (action === "prev") {
//     button.querySelectorAll("span")[0].classList.remove("hidden");
//     button.querySelector("svg").classList.add("hidden");
//     if (!page) {
//       addQueryParam("page", 1);
//     } else {
//       let newPageNumber = parseInt(page) - 1 < 1 ? 1 : parseInt(page) - 1;
//       addQueryParam("page", newPageNumber);
//     }
//   }

//   if (action === "all") {
//     button.querySelectorAll("span")[0].classList.remove("hidden");
//     if (button.querySelector("svg")) {
//       button.querySelector("svg").classList.add("hidden");
//     }
//     addQueryParam("page", "all");
//   }
// }

/**
 * Adds a url query param based on a key value pair
 * @param {String} key - The key for the url param you want to add
 * @param {String} value - The value for the key
 */
const addQueryParam = (key, value) => {
  const queryParams = new URLSearchParams(window.location.search);
  queryParams.set(key, value);
  history.replaceState(null, null, "?" + queryParams.toString());
};

export { addQueryParam };
