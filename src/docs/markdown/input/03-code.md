---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { Input, fuzzySearch } from "bubbles-ui";
</script>

<Input
  id="name"
  type="text"
  label="Full Name"
  error="Please add your name"
  validation="string|required|min:3"
  desc="This is a text input that has validation that checks for a string with a minimum length of 3"
  margin={true}
/>

<Input
  id="password"
  type="password"
  label="Passphrase"
  error="Your passphrase must be at least 10 characters"
  validation="string|required|min:10"
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
  id="phone"
  type="tel"
  label="Enter your phone number"
  error="Enter your phone number"
  validation="required"
  desc="Enter your phone number. If your country code is not +1, enter your country code first."
  margin={true}
/>

<Input
  id="address"
  type="textarea"
  label="Enter your address"
  error="Enter your address"
  validation="string"
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
      //...,
      {
        name: "Wyoming",
        abbreviation: "WY",
      },
    ];

    const filtered = fuzzySearch(input, states, { keys: ["name", "abbreviation"], sort: true });
    return Promise.resolve(filtered.map((obj) => obj.item.name));
  }}
/>

<Input
  id="stripe"
  type="stripe-card"
  desc="Enter your credit card information. Stripe will load completely asynchronously when you request the component, after everything else mounts. You don't have to worry about performance issues."
  margin={true}
  stripe_key_name="VITE_STRIPE_PUBLIC_KEY"
/>

<Input
  id="disabled"
  type="text"
  label="Disabled"
  error="Please add your name"
  margin={true}
  disabled={true}
  value="This is disabled"
/>

<Input
  id="loading"
  type="text"
  label="Loading"
  error="Please add your name"
  margin={true}
  disabled={true}
  desc="Inputs can show a loading state by adding their ID to the loading store."
/>
```
