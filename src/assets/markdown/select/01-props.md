# Select

The select element lets the user select from one of multiple options.

<br>

---

<br>

## Props

<br>

**id** `string`<br>
If you're using this inside of the form, you'll want to include the id value, which will be the property value in JSON data when the form is submitted.

---

**options** `array<Object>`<br>
An array that will contain the options the user can select.

<details>
<summary>Show Details</summary>

|                                                                                                                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| option[].**label** `string`<br> The text the user sees for the option                                                                                     |
| option[].**value** `string`<br> The value that will be added for the url query param                                                                      |
| option[].**caption** `string`<br> More details to give about the option                                                                                   |
| option[].**img** `string`<br> An image that will be displayed on the left of the text                                                                     |
| option[].**icon** `string`<br> An icon to display on the right. Defaults to an arrow. You can remove this by setting this value to null                   |
| option[].**onselect** `function`<br> A function that can be run if this option is selected                                                                |
| option[].**hidden** `boolean`<br> Will hide the option if set to true, defaults to false                                                                  |
| option[].**break** `boolean`<br> Will create a line break as this option. The line break is not rendered as a clickable option, it's just for aesthetics. |

</details><br>

---

**value** `boolean`<br>
If the component is checked or not.

---

**label** `string` <br>
The label you want explaining what the checkbox is.

---

**desc** `string` <br>
The option to add more text to explain the option the user is selecting in more detail. This element allows you to include html elements, so you can add an outbound link with an anchor tag.

---

**error** `string` <code class="blue">An error occurred</code><br>
The error text you want to show if this item fails validation.

---

**validation** `string`<br>
The validation string you want to use for this form. See [validateInputs](/validate-inputs) for more information.

---

**type** `string` <code class="blue">select</code><br>
The default type is select but if it's really important for you to have values that are numbers, you can change the type to `select-number`.

---

**validate_on_blur** `boolean` <br>
If true, runs the validation checks when focus is lost from the input.

---

**vob** `boolean` <br>
Just an alias for `validate_on_blur`. Set whichever is best for you.

---

**search** `boolean` <br>
If you want the select element to be searchable. By default, if you have more than 5 options, the search will be turned on. You can override this behavior if you want to.

---

**onselect** `function(value)` <br>
A function that will fire every time an item is selected. The function will be provided one argument, which will be the value of the value of the selected option.

---
