---
---

## Components and Utilities

All of the components and utility functions can be imported directly from <code class="lc">bubbles-ui</code>. The only caveat is a global css module that you'll want to import either in a global <code class="lc">\_\_layout.svelte</code> file or reference in the root app.html which is imported from <code class="lc">bubbles-ui/css/app.css</code>.

There is a current limitation with svelte kit that the goto function from app/navigation cannot be bundled into the UI Kit. You will need to pass a reference to this function to the <code class="lc">configStore</code>.
