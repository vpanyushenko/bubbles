# Input

All of the text based inputs are housed under one `Input` component. You can specify the type of input that you want to use using the `type` property.

With Bubbles, you'll normally never actually import any `Input` components, you'll just programmatically add them directly to the [Form](/form).

<br>

---

<br>

## Types

`text` <br>
The general purpose text input you'll use for the majority of your forms.

---

`email` <br>
Email input, will enable autocomplete on compatible devices.

---

`tel` <br>
Will get you the "tel" input, which will suggest phone numbers for the user.

In a future update, this input will also have properties to let the user select their country code via dropdown, but that is on the roadmap.

[Github Link](https://github.com/vpanyushenko/bubbles/issues/33)

---

`phone` <br>
Same as `tel`, just an alias.

---

`password` <br>
Standard password input. Browsers will let users autofill these passwords.

---

`date` <br>
The date input is _not_ a calendar input. Bubbles has an opinion that entering a date is just easier by typing it in rather than selecting from a calendar. This will let the user enter the date in mm/dd/yyyy format.

**This still needs to be localized**.

---

`number` <br>
This will render a number input.

---

`time` <br>
This will render a time input.

---

`textarea` <br>
This will render a textarea element.

---

`stripe-card` <br>
This will render a stripe elements input get get credit card information from the user. You'll need to have a stripe account set up. View the second demo in the [Form](/form) section section about specifically setting up Stripe.

---

<br>

## Props

<br>

**id** `string` <br>
All of the inputs that you provide to the form should have an `id` property. This will end up being the property name on the JSON object. If your `id` includes any periods in it like profile.name, the "name" will be nested under "profile".

---

**type** `string` <br>
Specifies what input will be rendered from one of the choices above.

---

**label** `string` <br>
The label that will describe what information needs to be entered. Will float up when the input is in focus. Best to keep this as short as possible.

---

**error** `string` <br>
The error text that you want to display if this input fails validation. Best to keep this as short as possible.

---

**validation** `string` <br>
The validation string you want to use for this form. See [validateInputs](/validate-inputs) for more details.

---

**validate_on_blur** `boolean` <br>
If true, runs the validation checks when focus is lost from the input.

---

**validate_on_blur** `boolean` <br>
Just an alias for `validate_on_blur`. Set whichever is best for you.

---

**desc** `string` <br>
This will be the small text below the input to describe it in more detail. It supports html so you can add anchor tags that will get rendered correctly.

---

**value** `any` <br>
The value for this input it you want to pre-fill it.

---

**autocomplete** `boolean` <code class="blue">true</code><br>
If you want to browser to autocomplete fields for the user.

---

**margin** `boolean` <br>
Adds margin to the input.

---

**bounds** `Array` <code class="red">number</code><br>
This is an array with the min and max values for an input. It's used only with the number input type.

---

**rows** `number` <code class="red">textarea</code><br>
Specifies the height in rows to be used. It's used only with the textarea input type.

---

**typeahead** `function` <code class="red">text</code> <code class="red">textarea</code><br>
This lets you show a list of suggestions for a user as they are typing in a value. This is useful for helping populate an address, for example. The typeahead property is a function which takes in value the current value of the input and should return an array of string as possible suggestions.

---

**multiply_by** `number` <code class="red">number</code><br>
The value of a numeric input will be multiplied by this number when calling the getFormData function.

---

**stripe_key_name** `string` <code class="red">stripe-input</code><br>
To initialize Stripe, you'll need to pass in your stripe public_key. This variable is safe to expose to front end code. Save it in your .env file, and pass in the name of the key. The default key Bubbles will check for is "VITE_STRIPE_PUBLIC_KEY". Remember, only keys prefixed with `VITE-` are exposed to the front end by default, unless you have made a change to this.
