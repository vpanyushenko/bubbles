<script context="module">
  //import { fetchData } from "bubbles-ui";
  import { fetchData } from "$lib/index";

  export const load = async ({ url, params, fetch, session, stuff }) => {
    const debug = true;
    const data = "results";
    const options = { url, params, fetch, session, stuff, debug, data };

    return fetchData([{ endpoint: `https://pokeapi.co/api/v2/pokemon`, key: "pokemon" }], options);
  };
</script>

<script>
  import { Header } from "$lib/index";
  export let pokemon = [];
  console.log(pokemon);
</script>

<Header title="Check Console logs" />
