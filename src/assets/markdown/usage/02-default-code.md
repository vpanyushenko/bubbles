---
type: code
width: 50
height: 100
---

```svelte
<script>
  // __layout.svelte

  // First import the global css styles
  import "bubbles-ui/css/app.css";

  // Import config store to update defaults
  import { configStore } from "bubbles-ui";

  // When you include validation for inputs bubbles can
  // validate each input when the input focus is lost. The
  // default for this is false
  $configStore.validate_on_blur = true;

  // If something is marked as required as one of the
  // validation requirements you can have bubbles add a "*"
  // to the end of the input label. This is better UX for
  // required fields. The default for this is true

  // How long to delay a toast notification before it
  // automatically hides in milliseconds
  $configStore.toast_delay = 5500;

  // How long to show input error states until it goes
  // back to it's normal form
  $configStore.error_delay = 4500;

  // We'll let you know if there are any issues with the
  // Bubbles library
  $configStore.debug = true;

  // Compact will reduce padding everywhere for more information density
  $configStore.padding = "roomy"; //or compact

  // Blocky will reduce the radius on elements. Plays nicely with "compact" padding
  $configStore.radius = "rounded"; //or blocky
</script>
```
