# Form

Forms are not created like most components. Instead of importing a `Form` component then importing the various inputs to use, this is all done through props.

To use forms, you'll pass in your objects indicating the type of input you want. One of your inputs (usually the last one) should be a button, which will have an `onsubmit` handler that will deal with your form submission.

Bubbles provides two utility functions called `getFormData`, which will give you an object of your data and `validateInputs` which will validate the inputs based on the validation params that you supply to each of the inputs. Learn more about [getFormData](/get-form-data) and [validateInputs](/validate-inputs)

All of the inputs that you provide to the form should have an id property. This will end up being the property name/key on the JSON object. If your id includes any periods in it like profile.name, the "name" will be nested under "profile".

<br>

---

<br>

## Props

<br>

**id** `string` <br>
You can set an ID for the form, otherwise an unique ID will automatically be applied.

---

**inputs** `array<Object>` <br>
An array of input values that you want to add. See the individual articles for inputs like [Input](/input), [Select](/select), and [Button](/button) to understand what kind of properties to add to each.

---

**input.width** `number` <br>
You can add inputs next to each other instead of stacking them simply by passing the width as a percentage. If you wanted two inputs side by side, you would passing 50 as the width for both of them. If you wanted three inputs all in one row, you would pass in 33 as the width for all of the inputs.

---

**input.hidden_if** `array<Object>` <br>
When used with a `Form`, each input has a special property called `hidden_if`, which is an array of objects with an `id` and `value`. The `id` corresponds to another element in the form. It's that element's value is the same as the `value` provided in this prop, this input will be hidden.

TL;DR: You can hide this input, if a different input in the form has a certain value.

See the example for more details. From a UX point of view, hidden_if is best used with Select, Radio, and Switch elements.

<details>
<summary>Show Details</summary>

|                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------- |
| hidden_if[].**id** `string`<br> The ID of another form element.                                                 |
| hidden_if[].**value** `string`<br> Will hide this element if the other elements value equals this prop's value. |

</details><br>

---

**input.hidden_unless** `array<Object>` <br>
This works in the reverse way of `hidden_if`, when you want to hide this input if the value(s) of another input DO NOT equal something else. The ideal use case for this is when you have a Select with many options like payment methods, and want to show components to add new payment details ONLY IF (aka unless) the user selects the option to add a new payment method.

<details>
<summary>Show Details</summary>

|                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------------ |
| hidden_unless[].**id** `string`<br> The ID of another form element.                                                 |
| hidden_unless[].**value** `string`<br> Will show this element if the other elements value equals this prop's value. |

</details><br>
