<script context="module">
  export async function load({ url, params, fetch, session, stuff }) {
    //initially there isn't a query param in the url so we can set the limit to whatever the default value of the pagination will be
    const limit = url.searchParams.get("limit") ? Number(url.searchParams.get("limit")) : 10;

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

    const type = url.searchParams.get("type") ? url.searchParams.get("type") : "all";

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
  }
</script>

<script>
  export let pokemon;
  export let pagination;

  import Header from "$lib/components/header/Header.svelte";
  import Row from "$lib/layouts/Row.svelte";
  import Center from "$lib/layouts/Center.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import CardFooter from "$lib/components/card/CardFooter.svelte";
  import Pagination from "$lib/components/pagination/Pagination.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
  import ListItem from "$lib/components/list/ListItem.svelte";
  import ListItemTimeline from "$lib/components/list/ListItemTimeline.svelte";
  import Switch from "$lib/components/switch/Switch.svelte";

  const types = [
    "All",
    "break",
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dark",
    "Dragon",
    "Steel",
    "Fairy",
  ];

  function typeColor(type) {
    switch (type) {
      case "normal":
        return "gray-light";
      case "fire":
        return "error";
      case "water":
        return "info";
      case "grass":
        return "success";
      case "electric":
        return "warning";
      case "ice":
        return "info-light";
      case "fighting":
        return "error-light";
      case "poison":
        return "primary";
      case "ground":
        return "warning-light";
      case "flying":
        return "primary-light";
      case "psychic":
        return "secondary-light";
      case "bug":
        return "success-light";
      case "rock":
        return "dark-light";
      case "ghost":
        return "primary-border";
      case "dark":
        return "dark";
      case "dragon":
        return "primary-light";
      case "steel":
        return "gray";
      case "fairy":
        return "secondary";
      default:
        return "gray";
    }
  }
</script>

<Header
  title="Pokedex"
  breadcrumbs={[
    { label: "Home", href: "/examples" },
    { label: "Pokedex", href: "/examples/pokedex" },
  ]}
/>

<Row>
  <Column100>
    <Card>
      <CardHeader
        border={false}
        filters={[
          {
            id: "type",
            label: "Type",
            value: "",
            options: types.map((type) => {
              if (type === "break") {
                return "break";
              }

              return {
                label: type,
                value: type === "All" ? "" : type.toLowerCase(),
              };
            }),
          },
        ]}
      />
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
        {#each pokemon as poke}
          <TableRow>
            <TableCell img={{ src: poke?.sprites?.front_default, alt: "Sprite" }} mobile_width={10} />
            <TableCell
              text={poke.name}
              href={`/examples/pokedex/${poke.name}`}
              caption={`Pokedex Number: ${poke.id}`}
              bold={true}
              mobile_width={70}
            />
            <TableCell text={`${poke.weight} lbs`} mobile_width={0} />
            <TableCell
              mobile_width={0}
              rows={[
                [
                  {
                    tag: {
                      label: poke?.types[0]?.type?.name,
                      color: typeColor(poke?.types[0]?.type?.name),
                      margin: "0 0 .25rem 0",
                    },
                  },
                ],
                [
                  {
                    tag: {
                      label: poke?.types[1]?.type?.name,
                      color: typeColor(poke?.types[1]?.type?.name),
                      margin: "0.25rem 0 0 0",
                    },
                  },
                ],
              ]}
            />

            <TableCell
              tag={{ label: poke.moves.length, color: "primary", min_width: 2.75 }}
              align="right"
              mobile_width={0}
            />

            <TableCell
              mobile_width={10}
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
                    label: "Shiny Sprite",
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
  </Column100>
</Row>
