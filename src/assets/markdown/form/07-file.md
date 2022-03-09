# FileForm

Generally your backend will accept images as FormData instead of JSON. The FileForm is a pre-made form that will allow the user to select an image or file and upload it to your backend as FormData.

<br>

---

<br>

## Props

<br>

**button** `object` <br>
These are all of the the properties for the [Button](/button). You don't need to pass an `onclick` or `onsubmit` function as a prop because the form will handle that for you.

---

**endpoint** `String` <br>
The endpoint that will accept the form data

---

**fetch_options** `object` <br>
These are all of the typical options you would add to a fetch function. The only items you need to add here are the `method` and whatever `authorization` you are using.

---

**src** `string` <br>
if there is already an image provided, add it to the source to show a preview. If a preview is not available, like for a csv file, the filename is shown instead.

---

**toast** `Boolean` <code class="blue">true</code><br>
Boolean that will show the toast message from `res.message` or `error.message`.

---
