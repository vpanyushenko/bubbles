// import { merge } from "lodash-es";

// const getFormInputs = (inputs) => {
//   const data = {};
//   const types = [
//     "text",
//     "phone",
//     "tel",
//     "switch",
//     "textarea",
//     "phone",
//     "select",
//     "select-number",
//     "checkbox",
//     "radio",
//     "date",
//     "password",
//     "email",
//     "search",
//     "time",
//     "url",
//     "number",
//     "hidden",
//   ];

//   inputs.forEach((input) => {
//     //defaults to getting the form input from the svelte binding, otherwise will search the dom
//     const type = input.type ? input.type : input.querySelector("input").type;

//     if (types.includes(type)) {
//       let id = input.id;

//       //defaults to getting the form input from the svelte binding, otherwise will search the dom
//       let value = input.value ? input.value : input.querySelector("input").value;

//       if (type === "number") {
//         value = Number(value);
//       }

//       console.log(id, value);

//       if (id) {
//         let array = id.split(".").filter(Boolean);
//         let obj = array.reduceRight((obj, elem) => ({ [elem]: obj }), value);
//         merge(data, obj);
//       }
//     }
//   });

//   return data;
// };

// export { getFormInputs };
