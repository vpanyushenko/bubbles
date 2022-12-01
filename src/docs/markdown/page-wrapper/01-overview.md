---
width: 50
height: 100
---

## Basic Structure

Just like Svelte Kit wants you to use <code class="lc">layout.svelte</code> files for your standard page structure, Bubbles include some pre-made layouts. You'll generally want to include these layout components inside of <code class="lc">\_\_layout.svelte</code> and pass everything else with a slot. These layouts will make sure that components like Sidebar, Header, and Cards are all behaving property.

<br>

---

<br>

## Components

<br>

`SidebarPageWrapper`<br>
If your page includes a Sidebar component in the layout, you'll want to use this wrapper to make sure the body of your page will be contained correctly

---

`PageWrapper`<br>
You'll use this wrapper if you are not including a `Sidebar` component.

---
