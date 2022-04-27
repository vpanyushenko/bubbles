# Overlay

The overlay puts a page overtop of the whole page. It's useful if you want to temporarily block the current page content without navigating to a new page.

For example, the `Error` and `Modal` components use overlays to show content without navigating to a new page.

You'll want to include functionality to hide an show the `Overlay`, otherwise it will block all content on the screen.

<br>

---

<br>

## Props

<br>

**background** `"solid"|"gradient"` <code class="blue">null</code><br>
Normally the overlay is a transparent black background, but you can force it to be a solid white background or gradient background

---

**transition_duration** `number` <code class="blue">0</code> <br>
Add the time in milliseconds that you want the overlay to fade in

---

**onclick** `function`<br>
An function that will be fired when the overlay is clicked.
