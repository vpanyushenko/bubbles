---
type: code
---

```svelte
<script>
  import {
    Card,
    CardHeader,
    CardFooter,
    Row,
    Column as Column100,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    Pagination,
    sort,
  } from "bubbles-ui";

  import store from "$docs/utils/store";
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
                value: type === "All" ? "" : type.toLowerCase(),
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
```
