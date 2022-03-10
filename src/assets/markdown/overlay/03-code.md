---
width: 50
height: 100
type: code
---

```svelte
<script>
  import { Overlay, Center, Button, Spinner } from "bubbles-ui";

  let overlayToggle = false;
</script>

{#if overlayToggle}
  <Overlay solid={true} transition_duration={500} onclick={() => (overlayToggle = false)}>
    <Center>
      <Spinner size={5} color="primary" />
      <p>Loading Your Data (Click anywhere to close the overlay)</p>
    </Center>
  </Overlay>
{/if}

<Button
  label="Show Overlay"
  wide={true}
  mb={true}
  onclick={() => {
    overlayToggle = true;
  }}
/>
```
