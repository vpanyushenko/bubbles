# Tag

The tag is a good way to accent what would be a text element. For example the status of something.

<br>

---

<br>

## Props

<br>

**label** `string` <br>
The text inside of that tag that the user will see.

---

**color** `string` <code class="blue">primary-light</code><br>
Pass a color variable

---

**color_options** `Array<{label: String, color: String}>` <code class="blue">[]</code><br>
Often you may want to change the color of your tag depending on the label. Instead of passing in a color, you can pass in an array of options. If there is no match, it will default to the color property.

---

**small** `boolean` <code class="blue">false</code><br>
A boolean to make the tag small. By default this is false but is helpful if you are using it inline with text like in a Table.

---

**min_width** `number` <code class="blue">3</code><br>
Will make sure the tag maintains a minimum width value since cause the contents of the tag are very sort. You can pass a value in `rem` values. The default is 3.

---

**margin** `string` <code class="blue">0 0 0 0</code><br>
You can set margins for the tag using the css shorthand method. By default the top, right, bottom, and left values are set to 0 0 0 0

---
