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

<br>
<br>

**Below are specific properties you can add to an input when used with a form:**

<br>

**input[].width** `number` <br>
You can add inputs next to each other instead of stacking them simply by passing the width as a percentage. If you wanted two inputs side by side, you would passing 50 as the width for both of them. If you wanted three inputs all in one row, you would pass in 33 as the width for all of the inputs.

---

**input[].hide** `function` <br>
A function that returns `true` if the input should be hidden.

---
