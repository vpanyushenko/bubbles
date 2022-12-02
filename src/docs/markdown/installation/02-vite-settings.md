---
---

## Vite Settings

In order to prevent you from constantly passing in properties for things like the `$page` and `$navigation` stores that svelte includes, we'll automatically listen to these events for you to show things like loading screens on components.

You'll need to remove these imports from your final bundle, because we'll be using them from the svelte kit runtime. In your Svelte Kit project, you'll have a file named `vite.config.js`. Make the following updates to this file:

**Before**

```js
/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
};

export default config;
```

<br>

**After**

You may have other plugins that you're using here. We just need to exclude `$app/environment`, `$app/stores`, `$app/navigation` from the Vite.

```js
/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  optimizeDeps: {
    exclude: ["$app/environment", "$app/stores", "$app/navigation"],
  },
};

export default config;
```
