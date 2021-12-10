---
component: inputs
---

```svelte
<script>
  import { Input, fuzzySearch } from "bubbles-ui";

  //The fuzzy search is built into the bubbles package but is not ready as a general purpose
  //utility function yet. It's essentially a wrapper around fuze search
</script>

<Input
  id="name"
  type="text"
  label="Full Name"
  error="Please add your name"
  validation="string|required|min:3"
  vob={true}
  desc="This is a text input that has validation that checks for a string with a minimum length of 3"
  margin={true}
/>

<Input
  id="password"
  type="password"
  label="Passphrase"
  error="Your passphrase must be at least 10 characters"
  validation="string|required|min:10"
  vob={true}
  desc="This is a password field that has a minimum requirement of 10 characters."
  margin={true}
/>

<Input
  id="date_of_birth"
  type="date"
  label="Date Of Birth"
  error="This is not a valid date"
  validation="required|date"
  desc="This is a date field"
  margin={true}
/>

<Input
  id="age"
  type="number"
  label="What is your age"
  error="Please select a number between 13 and 150"
  validation="required|number|min:13|max:150"
  desc="Type a number between 13 and 150"
  margin={true}
  bounds="{[13, 150]},"
/>

<Input
  id="address"
  type="textarea"
  label="Enter your address"
  error="Enter your address"
  validation="string"
  vob={true}
  desc="This is a textarea field with a height of 5 rows."
  margin={true}
  rows="5"
/>

<Input
  id="favorite"
  type="text"
  label="Favorite U.S. State"
  error="we can't find that one!"
  desc="This is an example of typeahead to get results based on what the user is typing. It can be used on text and textarea inputs. Just add a function to the typeahead property that accepts the current value and responds with a Promise that array of options. Each option is the completed string. "
  margin={true}
  autocomplete={false}
  typeahead={(input) => {
    const states = [
      {
        name: "Alabama",
        abbreviation: "AL",
      },
      {
        name: "Alaska",
        abbreviation: "AK",
      },
      ...,
      {
        name: "Wyoming",
        abbreviation: "WY",
      },
    ];

    const fuse = new fuzzySearch(states, {
      shouldSort: false,
      keys: ["name", "abbreviation"],
      minMatchCharLength: 2,
      threshold: 0.4,
    });

    return Promise.resolve(fuse.search(input).map((obj) => obj.item.name));
  }}
/>
```
