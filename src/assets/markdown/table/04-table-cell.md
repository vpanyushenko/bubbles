# TableCell

The cell that is inside of the `TableRow`.

When a user is viewing your table on a mobile device, we'll need the table to be responsive. You can attempt to make the whole table row overflow but that is a bad user experience. Ideally, on a smaller screen, you'll want to present less information on your table, and let the user navigate to a page with more details.

There are specific mobile properties on for the `TableCell` to help you deal with small screen devices.

There are some predefined props for the table for standard layouts. You can of course just add your own custom markup as a slot.

<br>

---

<br>

## Props

<br>

**text** `string`<br>
This will add a string of text to the cell

---

**href** `string`<br>
Will cause the text to be an href. This is different than setting the `TableRow` as an href, since only this part will be clickable. Best used on complex tables that may have multiple clickable parts.

---

**caption** `string`<br>
This will add a second line of text below in grey below the text

---

**large** `boolean` <code class="blue">false</code> <br>
Make the text in the cell large. Best used for simple tables like settings screens

---

**bold** `boolean` <code class="blue">false</code> <br>
Will make the text in this cell bold. Great for complex table to show the most import piece of information.

---

**align** `string` <code class="blue">left</code> <br>
By default the text in the cell is left aligned, but you can change that to "right"

---

**img.src** `string` <br>
If you pass in an img, Bubbles will assume you want to add an image to the cell, like someone's profile picture. The image will be added and all text properties will be ignored.

---

**img.alt** `string` <br>
If you pass an image, add an alt tag for accessibility.

---

**tag** `object` <br>
ou can add a tag into your cell. See the [tag section](/tag)for more details.

---

**button** `object` <br>
If you add a button property, Bubbles will assume you want to add an `IconButton` to that cell. See the props needed for an [IconButton here](/icon-button)

---

**mobile_width** `number` <br>
Select the width this cell will take up on small screens. If you want to hide the cell on mobile, set the value to 0.

---

**mobile_order** `number` <br>
This is the `order` css property. You can change the order or elements by passing in larger integers and move them left in the stack by passing in larger negative integers.
