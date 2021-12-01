---
component: inputs
---

```js
import { Input } from "bubbles-ui";

const text = {
  id: "name",
  type: "text",
  label: "Full Name",
  error: "Please add your name",
  validation: "string|required|min:3",
  vob: true,
  desc: "This is a text input that has validation that checks for a string with a minimum length of 3",
  margin: true,
};

const password = {
  id: "password",
  type: "password",
  label: "Passphrase",
  error: "Your passphrase must be at least 10 characters",
  validation: "string|required|min:10",
  vob: true,
  desc: "This is a password field that has a minimum requirement of 10 characters.",
  margin: true,
};

const date = {
  id: "date_of_birth",
  type: "date",
  label: "Date Of Birth",
  error: "This is not a valid date",
  validation: "required|date",
  vob: true,
  desc: "This is a date field",
  margin: true,
};

const number = {
  id: "age",
  type: "number",
  label: "What is your age?",
  error: "Please select a number between 13 and 150",
  validation: "required|number|min:13|max:150",
  vob: true,
  desc: "Type a number between 13 and 150",
  margin: true,
  bounds: [13, 150],
};

const typeahead = {
  id: "state",
  type: "text", //or textarea
  label: "Favorite U.S. State",
  margin: true,
  autocomplete: false,
  typeahead: (input) => {
    fetch("/myapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: input }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //the data returned from your Promise should be an array of values for the autocomplete
        //you might be using this with an address autocomplete for example
        //the array returned should be an array of strings

        //you can add additional logic to limit how many result you want to show
        if (data.length > 5) {
          data.length = 5;
        }

        return data;
      })
      .catch((err) => {
        return [];
      });
  },
};
```
