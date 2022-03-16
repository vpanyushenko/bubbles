# Sidebar

The `Sidebar` is located on the left side of the screen and lets users access different sections of your application.

On mobile devices, the sidebar will collapse into a hamburger button, which can be opened by the user to reveal the sections.

It's best to load this component in `__layout.svelte` since the `Sidebar` will remain rendered on each page. You'll also want to use the `PageSidebarWrapper` to slot the rest of your content with the proper paddings.

<br>

---

<br>

## Props

<br>

**logo** `string`<br>
Pass a reference in for your logo that will be included at the top of the sidebar.

---

**href** `string` <code class="blue">/</code><br>
Where to navigate if the user clicks on the logo.

---

**sections** `Array<Object>` <br>
These objects will be all of the sections in the sidebar.

---

section[].**icon** `string` <br>
If you want your section to have an icon, pass an svg or png icon. **It is strongly recommended to use an svg**.

---

section[].**label** `string` <br>
This is the text that will be displayed for the user.

---

section[].**section** `string` <br>
If you want to divide your sidebar into groups, you can add a section property. In this example, the sidebar is divided into four sections, "Getting Started", "Layouts", "Components", and "Utils"

---

section[].**id** `string` <br>
An id that you can pass to the section to make a reference of it. If you'll be adding notifications counts next to any of the sidebar items, it's useful to know the ID so that you can update the notification counter easily. If you don't set an ID, Bubbles will set one for you.

---

section[].**href** `string` <br>
This is the page where the user will be routed. Bubbles will automatically highlight the active section and show loading indicators if the page is taking a while to load.

---

section[].**href_aliases** `Array<string>` <br>
There can be times when you have pages with multiple href values. For example, it's common that `/` and `/dashboard` might be the same page. As a result, if the initial href is set to `/dashboard` and the user navigates to `/`, the correct section will not be shown as active. Add an array of strings here that share that href here to correct this behavior.

---

section[].**notifications** `Integer` <br>
f you want to set an initial value for notifications when the component mounts you can do so here. Otherwise, you'll update notifications counts using the `pageStore`

---
