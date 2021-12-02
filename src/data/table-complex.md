---
component: table-complex
---

```svelte
<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    //when the use will use the pagination to navigate, Bubbles will make svelte re-run the load function to fetch new data

    //initally there isn't a query param in the url so we can set the limit to whatever the default value of the pagination will be
    const limit = page.query.get("limit") ? page.query.get("limit") : 10;

    //same process with the page, since if the page is undefined the user is on the first one
    const _page = page.query.get("page") ? Number(page.query.get("page")) : 1;

    //this api needs an offset number we we can calc it using the page and limit
    const offset = Number(limit) * (_page - 1);

    //set up pagination for the table.
    //The count is only going to be added after the API request is completed
    const pagination = {
      limit: Number(limit),
      page: _page,
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
        pagination.count = res.count; //set the count from the response

        //this response only gives a list of pokemon, but we want more details to build out table
        //we'll map through the data that we got to fetch more details for the sake of making the table demo

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
  import { Card, CardHeader, CardFooter, Table, TableRow, TableCell, Pagination } from "bubbles-ui";

  export let pokemon;
  export let pagination;

  $: _pokemon = pokemon;
</script>

<Card>
  <CardHeader title="Complex Table Example" border={false} />
  <Table
    header={[
      { label: null },
      { label: "Name" },
      { label: "Weight" },
      { label: "Type(s)" },
      { label: "Possible Moves", align: "end" },
      { label: null, align: "end" },
    ]}
  >
    {#each _pokemon as poke}
      <TableRow>
        <TableCell img={{ src: poke?.sprites?.front_default, alt: "Sprite" }} />
        <TableCell text={poke.name} caption={`Pokedex Number: ${poke.id}`} bold={true} />
        <TableCell text={`${poke.weight} lbs`} />
        <TableCell rows={[[{ text: poke?.types[0]?.type?.name }, { text: poke?.types[1]?.type?.name }]]} />
        <TableCell tag={{ label: poke.moves.length, color: "primary", min_width: true }} align="right" />
        <TableCell
          button={{
            icon: "more",
            options: [
              {
                label: "Encounters",
                href: poke.location_area_encounters,
                caption: "Areas you can find this pokemon",
              },
              "break",
              {
                label: "View JSON",
                href: poke.species.url,
              },
              {
                label: "Shinky Sprite",
                href: poke.sprites.front_shiny,
              },
            ],
          }}
        />
      </TableRow>
    {/each}
  </Table>
  <CardFooter>
    <Pagination {...pagination} />
  </CardFooter>
</Card>
```
