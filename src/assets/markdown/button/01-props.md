## Props

<br>

**id** `string`<br>
You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there will be a unique id added to the component.

---

**label** `string` <code class="blue">Submit</code><br>
This is the text label that the button will have. Defaults to "Submit".

---

**color** `string` <code class="blue">primary</code><br>
Pass in one of the named color variables like `success` or `error-light`.

---

**onclick** `function`<br>
Pass a function that you would like to run when this button is clicked

---

**onsubmit** `function`<br>
If you are using the button as part of a `Form` element, use onsubmit _instead_ of onclick.

---

**href** `string`<br>
If this button will taking a user to a different page, use href instead of directing them to the page with onclick. This will prefetch the data on hover to make the navigation faster.

---

**new_page** `boolean` <code class="blue">false</code><br>
Pass `true` if you want this button to open the page contents in a new page.

---

**wide** `boolean` <code class="blue">true</code><br>
Pass `true` if you want the button to take the full width of it's parent container.

---

**mt** `number` <code class="blue">0</code><br>
The top margin in `rem` values.

---

**mb** `number` <code class="blue">0</code><br>
The bottom margin in `rem` values.

---
