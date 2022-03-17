<script>
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

  import store from "$assets/utils/store";
  import { getSelectedTableRows, deselectTableRows } from "$lib/utils/table";

  $: pagination = $store?.pagination ? $store.pagination : {};
  $: pokemon = $store.pokemon ? $store.pokemon : [];

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

<Row>
  <Column>
    <Card>
      <CardHeader title="Complex Table Example" border={false} />
      <Table
        id="pokemon-table"
        padding="roomy"
        header={[
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
          { label: "Name" },
          { label: "Weight" },
          { label: "Type(s)" },
          { label: "Possible Moves", align: "end" },
          { label: null, align: "end" },
        ]}
      >
        {#each pokemon as poke}
          <TableRow id={poke.id}>
            <TableCell checkbox={{ value: false }} />
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
  </Column>
</Row>
