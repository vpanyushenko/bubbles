# SegmentedController

The `SegmentedController` is a series of buttons for dividing elements on the same page.

The segment will automatically transform into a select element when the screen is too small to support the full width bar.

<br>

---

<br>

## Props

<br>

**style** `string` <code class="blue">default</code><br>
"line" or "default"

---

**segments** `Array<Segment>` <br>
This is an array of options for all of the buttons to include

---

segment[].**label** `string` <br>
This is the label that the user will see

---

segment[].**onclick** `function` <br>
This is the function that will fire that will determine the logic for your segment. Typically you will want to hide some sections and show others.

---
