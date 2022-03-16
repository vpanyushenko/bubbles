---
width: 50
height: 100
---

After running `validateInputs` you will most likely want to get the data to end to and endpoint. `getFormData` will make an object with the same inputs that you passed into `validateInputs`.

The properties of the object will be the `id` props that you passed into the input. If you separated any `id`s with a period, like name.first the property will be nested for you.

<br>

---

<br>

## Props

<br>

**inputs** `array<Input>`<br>
The array of inputs you passed into the Form. You'll be calling with function within the onsubmit function of a button in the form

---

<br>

**options?** `Object`<br>
Options you can pass to this function. All are optional.

---

<br>

**options?.include_hidden_props** `boolean`<br>
Defaults to `false`. If you want to include hidden inputs in the form data. Hidden inputs are only those that were removed from the DOM using the `hidden_if` property on the Form

---

**options?.hidden_prop_values** `any`<br>
Defaults to null. If you do want to include hidden inputs in your data (which you normally should not since your backend would normally take care of those cases) you can specify what value you want the input to have.

By default, the value will be null but you can change it to whatever you'd like. If you want to value to be set to whatever value the input currently has (not recommended), you can set this property to "\*\*".

---

<br>

## Returns

<br>

`Promise<Object>`<br>
The value of this promise does not matter. If it's successful it doesn't return anything and if it fails it will automatically trigger error states on the appropriate components.

---
