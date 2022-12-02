## Components

The Gallery is made up of the main `Gallery` component and two optional components.

- Gallery - the main component for the images
- GalleryCard - this is an instance of the `Card` component with prebuilt margins.

<br>

**id** `string`<br>
You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there will be a unique id added to the component.

---

**images** `Array.<String>` <code class="blue">[]</code><br>
All of of the images for the gallery.

---

**grid** `string` <code class="blue">1x1</code><br>
All the grid size for the gallery like 1x1, 2x2, 3x3, etc..

---

**page** `integer` <code class="blue">1</code><br>
The page to start with, defaults to 1

---

**overlay_buttons** `array.<Button>`<br>
Buttons that will show up when an image from the gallery is clicked.

---

**new_image** `array.<Button>`<br>
A function that can be added which will add a section on the last gallery image that will let the user add a new image.

---

<br>
<br>

**The rest of these properties work the the header of the `Gallery`, so it's advised to wrap the Gallery in the `GalleryCard` if you're using these.**
<br>
<br>

**title** `String` <code class="blue">Gallery</code><br>
The title to add to the Gallery

---

**pagination** `boolean` <code class="blue">true</code><br>
If you want pagination to be enabled. If there are more images than your grid, this will add pagination as buttons in the header.

---

**buttons** `Array.<Button>` <code class="blue">[]</code><br>
Button to add the the header in the gallery. These will be added next to the pagination buttons if pagination is enabled.
