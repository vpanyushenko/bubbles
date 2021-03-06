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
| option[].**href** `string`<br> Will navigate to the new page                                                                                              |
| option[].**new_page** `boolean`<br> Used with `href`. If true will open a new tab.                                                                        |

</details><br>

---

**search** `Boolean`<br>
Will transform the button into a search element when clicked. Pairs nicely with the "search" icon you can add. When using search, you can either enter the string into the input and press enter. This will update the query paramiter search with that input, and will trigger the load function to re-run. You can also use the `typeahead` property, and get a dropdown list of options.

---

**typeahead** `function(query<String>)`<br>
This is a function that will provide one input, which is whatever data is entered into the search string. It expects a promise to be returned with an Array of options in the format of `options`, just like in the "Show Details" summary above.

---
