import { hideLoading, fuzzySearch } from "$lib/index";

function searchPokemon(search_value, pokemon) {
  return fuzzySearch(search_value, pokemon, { keys: ["name"] });
}

export async function load({ url, fetch }) {
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
    count: null,
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
        pagination.count = res.count;

        const pokemon = res.results.map((poke) => {
          return fetch(poke.url)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              return res;
            })
            .catch((err) => {
              return null;
            });
        });

        return Promise.all(pokemon.filter(Boolean));
      })
      .then((pokemon) => {
        const filtered = search ? searchPokemon(search, pokemon) : pokemon;
        if (search) {
          pagination.count = filtered.length;
        }
        hideLoading();

        return {
          pokemon: filtered,
          pagination: pagination,
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
        pagination.count = res.pokemon.length;

        const filtered = res.pokemon.filter((item, index) => index >= offset && index < offset + limit);

        const pokemon = filtered.map((poke) => {
          return fetch(poke.pokemon.url)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              return res;
            })
            .catch((err) => {
              return null;
            });
        });

        return Promise.all(pokemon.filter(Boolean));
      })
      .then((pokemon) => {
        const filtered = search ? searchPokemon(search, pokemon) : pokemon;

        if (search) {
          pagination.count = filtered.length;
        }
        hideLoading();

        return {
          pokemon: filtered,
          pagination: pagination,
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
