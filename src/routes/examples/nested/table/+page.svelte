<script>
  import { Header } from "$lib/index";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";

  import CardFooter from "$lib/components/card/CardFooter.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Pagination from "$lib/components/pagination/Pagination.svelte";

  import { getSelectedTableRows, deselectTableRows } from "$lib/utils/table";
  import { sort } from "$lib/index";

  export let data;

  $: pokemon = data.pokemon;
  $: pagination = data.pagination;

  const types = [
    "All",
    { divider: true },
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
  title="Pokemon"
  buttons={[
    { icon: "more", color: "gray-lighter" },
    { icon: "more", color: "gray-lighter" },
  ]}
/>

<Row>
  <Column>
    <Card overflow={true}>
      <CardHeader
        title="Complex Table Example"
        caption="This example uses an external API for data, which may run slowly especially when using the search."
        buttons={[
          { icon: "search", color: "gray-lighter", search: true },
          { icon: "more", color: "gray-lighter" },
        ]}
        border={false}
        filters={[
          {
            id: "type",
            label: "Type",
            value: "",
            options: types.map((type) => {
              if (type === "break") {
                return { divider: true };
              }

              return {
                label: type,
                value: type === "All" ? "" : `${type}`.toLowerCase(),
              };
            }),
          },
        ]}
      />
      <Table id="pokemon-table" padding="roomy">
        <TableHeader
          on:sort={(event) => (pokemon = sort(pokemon, event.detail.sort_by, event.detail.order))}
          cells={[
            {
              checkbox: true,
              options: [
                {
                  label: "Print Selected Rows To Console",
                  value: "label1",
                  onselect: (event) => {
                    console.log(getSelectedTableRows("pokemon-table"));
                    deselectTableRows("pokemon-table");
                  },
                },
              ],
            },
            { label: null },
            { label: "Name", sort: { id: "name" } },
            { label: "Weight", sort: { id: "weight" } },
            { label: "Type(s)" },
            { label: "Possible Moves", align: "end" },
            { label: null, align: "end" },
          ]}
        />

        {#each pokemon as poke}
          <TableRow id={poke.id} wrap={false}>
            <TableCell checkbox={{ value: false }} />
            <TableCell img={{ src: poke?.sprites?.front_default, alt: "Sprite" }} />
            <TableCell
              text={poke.name}
              href={`/examples/nested/table/${poke.name}/test`}
              caption={`Pokedex Number: ${poke.id}`}
              bold={true}
            />
            <TableCell text={`${poke.weight} lbs`} />
            <TableCell
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

            <TableCell tag={{ label: poke.moves.length, color: "primary", min_width: 2.75 }} align="right" />

            <TableCell
              button={{
                icon: "more",
                options: [
                  {
                    label: "Encounters",
                    href: poke.location_area_encounters,
                    caption: "Areas you can find this pokemon",
                  },
                  { divider: true },
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
  </Column>
</Row>
