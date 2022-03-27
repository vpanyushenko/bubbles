<script context="module">
  import { hideLoading } from "$lib/utils/loading";
  import search from "$lib/utils/fuzzy-search";

  function searchPokemon(search_value, pokemon) {
    return search(search_value, pokemon, { keys: ["name"] });
  }

  export async function load({ url, params, fetch, session, stuff }) {
    //initially there isn't a query param in the url so we can set the limit to whatever the default value of the pagination will be
    let limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : 10;

    //same process with the page, since if the page is undefined the user is on the first one
    let _page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;

    //this api needs an offset number we we can calc it using the page and limit
    let offset = Number(limit) * (_page - 1);

    const pagination = {
      limit: Number(limit),
      page: _page,
      offset: Number(url.searchParams.get("limit")) * (Number(url.searchParams.get("page")) - 1),
      count: null,
      first_last_arrow: true,
    };

    const type = url.searchParams.get("type") ? url.searchParams.get("type") : "all";
    const search = url.searchParams.get("search") || null;

    if (search) {
      //There is no search API so we need to query the whole list
      limit = 1200;
    }

    if (type === "all") {
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
          hideLoading();

          return {
            props: {
              pokemon: search ? searchPokemon(search, pokemon) : pokemon,
              pagination: pagination,
            },
          };
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      return fetch(`https://pokeapi.co/api/v2/type/${type}/?limit=${limit}&offset=${offset}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          //in this case, everything gets returned so we can show pagination ourselves
          const count = res.pokemon.length;

          const filtered = res.pokemon.filter((item, index) => index >= offset && index < offset + limit);

          pagination.count = count;

          const pokemon = filtered.map((poke) => {
            return fetch(poke.pokemon.url)
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
          hideLoading();

          return {
            props: {
              pokemon: search ? searchPokemon(search, pokemon) : pokemon,
              pagination: pagination,
            },
          };
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
