# CheckboxGroup

This is a component to include in a form when you want to user to select one or more options. If you want the user to only select one option, look into a [RadioGroup](/radio) instead.

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

|                                                                                                          |
| :------------------------------------------------------------------------------------------------------- |
| option[].**label** `string`<br> The text the user sees for the option                                    |
| option[].**value** `string`<br> The value will be added to the array of values bound to the whole input. |

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

**form_indent** `boolean` <code class="blue">true</code><br>
Causes the elements to have spacing on the left and right to align it better with other elements in a form.

---

**background** `boolean` <code class="blue">true</code><br>
Toggle a gray background around the element. This makes the element look in a form with other text and select input.
