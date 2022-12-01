---
width: 50
height: 100
---

Some form elements have options to validate the inputs when blurred but other, like a checkbox, don't have a that. After a user submits a form, but before the request is made to your endpoint, you'll want to validate the inputs again to catch any errors.

Any elements that have been removed from a Form using the `hidden_if` property will not be included in the validation.

Front end validation is done for user experience, you should incorporate server side validation for the actual check, and never trust the data coming from a client.

Error states will automatically be shown for any component that fails validation.

<br>

---

<br>

## Props

<br>

**inputs** `array<Input>`<br>
The array of inputs you want to validate. These inputs should be declared in your script tag and passed into the `Form` element as a prop. The validation will look at the validation property of each input.

---

<br>

## Returns

<br>

`Promise<Object>`<br>
The value of this promise does not matter. If it's successful it doesn't return anything and if it fails it will automatically trigger error states on the appropriate components.

---
