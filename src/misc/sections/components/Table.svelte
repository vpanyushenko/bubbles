<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./table-simple.md";
  import CodeCard2 from "./table-complex.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import CardFooter from "$lib/components/card/CardFooter.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Pagination from "$lib/components/pagination/Pagination.svelte";
  import { pageStore } from "$lib/stores/stores";

  import store from "$misc/store";

  $: pagination = $store?.pagination ? $store.pagination : {};
  $: pokemon = $store.pokemon ? $store.pokemon : [];

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

<Section id="table" title="Table">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="User Experience" border={false} />
        <p>
          The table is the main way to present data in Bubbles. Tables can be created with individual components,
          meaning you'll import <code>TableRow</code> and <code>TableCell</code>, or programmatically, meaning all of
          the data will be passed as a prop into the <code>Table</code>
        </p>

        <p>
          The Table is just make up of a TableHeader, where you can set the headings for rows. And TableRow's, which
          themselves are just an array of TableCells.
        </p>

        <p>
          If you're looking to add filters of pagination at the bottom of your table, you'll want to slot the Table into
          a Card, and add the CardHeader with filters and CardFooter with pagination
        </p>
      </Card>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="TableHeader" border={false} />
        <p>This is the top of the Table that explain what each of the column are.</p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">cells</span></TableCell>
            <TableCell
              >Cells are an array of Objects that will add text to the top of the table. The number of cells should
              match the numbers for TableCells that are in each TableRow</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">cell.label</span></TableCell>
            <TableCell
              >This is the text the user will see. Leave this blank or pass in <code>null</code> to add a blank cell. Useful
              if you have an icon or image in one of your TableCells.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">cell.align</span></TableCell>
            <TableCell
              >Normally cells are aligned to the left, but if you want to align the header to the right, pass in "right"
              or "end"</TableCell
            >
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="TableRow" border={false} />
        <p>
          The TableRow will have TableCells in it. You can set the TableCells as a component by importing <code
            >TableCell</code
          >
          or by passing in an array to the <code>cells</code> property of the TableRow
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell>You can set an ID for the row to reference it later</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell
              >The href value for the entire row. This is useful is you are using a Table for a settings menu, where you
              don't care where the user clicks. If you have a more complex cell, set the href on the cell, not the row.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell
              >You can run a function when the user clicks on the row. If you just want to take the user to a new page,
              use href because it will have better performance as the page with be prefetched.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">cells</span></TableCell>
            <TableCell
              >An array of cells to include in the row. You can pass the data in as a prop, or import the <code
                >TableCell</code
              >
              component and add as many as you need into the slot of the row.
              <strong>To view the props for the <code>TableCell</code> view the details in the next section.</strong
              ></TableCell
            >
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="TableCell" border={false} />
        <p>
          The cell that is inside of the <code>TableRow</code>. Like all of the other table components, you can add the
          data as props, or slot your own UI into the component.
        </p>

        <p>
          When a user is viewing your table on a mobile device, we'll need the table to be responsive. You can attempt
          to make the whole table row overflow but that is a bad user experience. <strong
            >Ideally, on a smaller screen, you'll want to present less information on your table, and let the user
            navigate to a page with more details.</strong
          >
        </p>

        <p>
          There are specific mobile properties on for the <code>TableCell</code> to help you deal with small screen devices.
        </p>
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">text</span></TableCell>
            <TableCell>This will add a string of text to the cell</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell>Will cause the text to be an href</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">caption</span></TableCell>
            <TableCell>This will add a second line of text below in grey below the text</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">large</span></TableCell>
            <TableCell>Make the text in the cell large. Best used for simple tables like settings screens</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">bold</span></TableCell>
            <TableCell>Will make the text in this cell bold.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">align</span></TableCell>
            <TableCell>By default the text in the cell is left aligned, but you can change that to "right"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">img.src</span></TableCell>
            <TableCell
              >If you pass in an img, Bubbles will assume you want to add an image to the cell, like someone's profile
              picture. The image will be added and all text properties will be ignored.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">img.alt</span></TableCell>
            <TableCell>If you pass an image, add an alt tag for accessibility.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">tag</span></TableCell>
            <TableCell
              >You can add a tag into your cell. See the <a href="#tag">tag</a> section for more details.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">button</span></TableCell>
            <TableCell
              >If you add a button property, Bubbles will assume you want to add an <code>IconButton</code> to that
              cell. See the props needed for an icon button <a href="#button">here</a></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">mobile_width</span></TableCell>
            <TableCell
              >Select the width this cell will take up on small screens. If you want to hide the cell on mobile, set the
              value to <code>0</code>.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">mobile_order</span></TableCell>
            <TableCell
              >This is the <code>order</code> css property. You can change the order or elements by passing in larger integers
              and move them left in the stack by passing in larger negative integers.
            </TableCell>
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column>
      <Card color="dark" px={0} py={0}>
        <CodeCard1 />
      </Card>
    </Column>
    <Column>
      <Card>
        <CardHeader title="Settings Table Example" border={false} />
        <Table>
          <TableRow href="#table" onclick={() => ($pageStore.clicked = "icon_1")}>
            <TableCell text="Profile" large={true} bold={true} caption="Edit your profile and update your photo" />
            <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex", id: "icon_1" }} />
          </TableRow>
          <TableRow href="#table" onclick={() => ($pageStore.clicked = "icon_2")}>
            <TableCell text="Notifications" large={true} caption="Select how and went we message you" />
            <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex", id: "icon_2" }} />
          </TableRow>
          <TableRow href="#table" onclick={() => ($pageStore.clicked = "icon_3")}>
            <TableCell
              text="Billing"
              large={true}
              bold={true}
              caption="Edit your payment methods and see past transactions"
            />
            <TableCell button={{ icon: "arrowRight", href: "/examples/pokedex", id: "icon_3" }} />
          </TableRow>
        </Table>
      </Card>

      <Card color="dark" px={0} py={0}>
        <CodeCard2 />
      </Card>

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
                      caption: "Areas you can find this pokemon",
                      onclick: (event) => {
                        window.open(poke.location_area_encounters, "_blank");
                      },
                    },
                    "break",
                    {
                      label: "View JSON",
                      href: poke.species.url,
                      new_page: true,
                    },
                    {
                      label: "Shiny Sprite",
                      href: poke.sprites.front_shiny,
                      new_page: true,
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
</Section>
