---
width: 50
height: 100
type: code
---

```svelte
<script context="module">
  import { fetchData } from "bubbles-ui";

  export const load = async ({ url, params, fetch, session, stuff }) => {
    const options = { url, params, fetch, session, stuff };

    // The endpoint is saved in VITE_API_URL
    return fetchData("/v1/users", options);
    //return fetchData("https://api.com/v1/users", options); You can provide the whole url if not using VITE_API_URL
  };
</script>

<script>
  export let data = []
  export let pagination = {}
</script>


<!-- Fetch multiple endpoints -->
<script context="module">
  import { fetchData } from "bubbles-ui";

  export const load = async ({ url, params, fetch, session, stuff }) => {
    const options = { url, params, fetch, session, stuff, debug: true };

    // The endpoint is saved in VITE_API_URL
    return fetchData([
      {endpoint: "/v1/users/123", key: "amy"},
      {endpoint: "/v1/users/456", key: "bob"}],
      options);
  };
</script>

<script>
  export let amy = {}
  export let bob = {}
</script>

```
