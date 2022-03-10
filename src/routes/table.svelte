<script context="module">
  export async function load({ url, params, fetch, session, stuff }) {
    //initially there isn't a query param in the url so we can set the limit to whatever the default value of the pagination will be
    const limit = url.searchParams.get("limit") ? url.searchParams.get("limit") : 10;

    //same process with the page, since if the page is undefined the user is on the first one
    const _page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;

    //this api needs an offset number we we can calc it using the page and limit
    const offset = Number(limit) * (_page - 1);

    const pagination = {
      limit: Number(limit),
      page: _page,
      offset: Number(url.searchParams.get("limit")) * (Number(url.searchParams.get("page")) - 1),
      count: null,
      first_last_arrow: true,
    };

    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // pagination.has_more = res.next ? true : false;
        pagination.count = res.count;

        const pokemon = res.results.map((poke) => {
          return fetch(poke.url)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              return res;
            });
        });

        return Promise.all(pokemon);
      })
      .then((pokemon) => {
        return {
          props: {
            pokemon: pokemon,
            pagination: pagination,
          },
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }
</script>

<script>
  import Rows from "$assets/components/Rows.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import { formatPosts } from "$assets/utils/posts";
  import store from "$assets/utils/store";
  const all_posts = import.meta.globEager(`../assets/markdown/table/**/*`);
  const rows = formatPosts(all_posts);

  export let pokemon = [];
  export let pagination = {};

  $: _pokemon = pokemon;
  $: _pagination = pagination;

  $: if (_pokemon) {
    $store.pokemon = _pokemon;
    $store.pagination = _pagination;
  }
</script>

<Header title="Table" />

<Rows {rows} />
