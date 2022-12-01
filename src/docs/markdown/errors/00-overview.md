---
width: 50
height: 100
---

## Svelte Errors

To handle errors in Svelte, the load function at the top of each page can return an error status code (4xx and 5xx) and an error Object to describe the error. That will be passed to a page called <code class="lc">\_\_error.svelte</code> which will display the error.

Bubbles makes styling the page easy by exporting a component called Error which will style the error page for you. Import it in your <code class="lc">\_\_error.svelte</code> page and pass in the props from your load function.
