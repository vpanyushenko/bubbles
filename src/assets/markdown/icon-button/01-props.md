# IconButton

The `IconButton` is a circular button. It's best used in places like a `Header`, `CardHeader`, and `TableRow`. They have some cool features like the option to show a dropdown, which is useful for overflow options like you would find in the last cell of a `TableRow`.

<br>

---

<br>

## Props

<br>

**id** `string`<br>
You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there will be a unique id added to the component.

---

**icon** `string` <code class="blue">more</code><br>
You can pass an icon for the button. Import an svg icon as a variable reference it. There are a few bundled common icons you can select from, listed in the table below.

---

**color** `string` <code class="blue">primary</code><br>
Pass in one of the named color variables like `success` or `error-light`.

---

**onclick** `function`<br>
Pass a function that you would like to run when this button is clicked

---

**href** `string`<br>
If this button will taking a user to a different page, use href instead of directing them to the page with onclick. This will prefetch the data on hover to make the navigation faster.

---

**options** `array<object>` <br>
Pass `true` if you want this button to open the page contents in a new page.

If you add options, you'll get a dropdown of those options.

<details>
<summary>Show Details</summary>

|                                                                                                                                                                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| option[].**label** `string`<br> The text the user sees for the option                                                                                                                                                  |
| option[].**caption** `string`<br> Optional explanation for the choice                                                                                                                                                  |
| option[].**href** `string`<br> If this button will taking a user to a different page, use href instead of directing them to the page with onclick. This will prefetch the data on hover to make the navigation faster. |
| option[].**onclick** `function`<br> A function that will be called when the option is selected                                                                                                                         |

> To add a line break between filter options, you can just add an option with a string value of "break"

</details><br>

---
