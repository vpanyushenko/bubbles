<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${page.params.pokemon}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        return {
          props: {
            data: res,
          },
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }
</script>

<script>
  export let data;

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
  import List from "$lib/components/list/List.svelte";
  import Tag from "$lib/components/tag/Tag.svelte";
  import { showToast } from "$lib/utils/toast";
  import { showLoading } from "$lib/utils/loading";

  const moves = data.moves.map((obj, index) => {
    return {
      label: `Move Number ${index + 1}`,
      text: obj.move.name,
      icon: "copy",
      onclick: (event) => {
        navigator.clipboard.writeText(obj.move.name);
        showToast("Move added to clipboard", "success");
      },
    };
  });
</script>

<Header
  title={data.name.charAt(0).toUpperCase() + data.name.slice(1)}
  breadcrumb_labels={["hello", "GOODBYE", "Bowser"]}
/>

<Row>
  <Column50>
    <Card>
      <CardHeader title="Possible Moves" border={false} />
      <List items={moves} />
    </Card>
  </Column50>
  <Column50>
    <Card>
      <CardHeader title="Sprites" border={false} />

      <Row style="display: flex; justify-content: space-around">
        <Center height100={false}>
          <img src={data.sprites.front_default} alt="Front" />
          <p>Front</p>
        </Center>
        <Center height100={false}>
          <img src={data.sprites.front_shiny} alt="Front" />
          <p>Front Shiny</p>
        </Center>
      </Row>
      <Row style="display: flex; justify-content: space-around">
        <Center height100={false}>
          <img src={data.sprites.back_default} alt="Back" />
          <p>Back</p>
        </Center>
        <Center height100={false}>
          <img src={data.sprites.back_shiny} alt="Back" />
          <p>Back Shiny</p>
        </Center>
      </Row>
    </Card>

    <Card>
      <CardHeader title="Stats" border={false} />

      <Table>
        <TableHeader cells={[{ label: "Name" }, { label: "Value" }]} />
        {#each data.stats as obj}
          <TableRow>
            <TableCell>{obj.stat.name}</TableCell>
            <TableCell>
              {#if obj.base_stat > 100}
                <Tag color="success-light">{obj.base_stat}</Tag>
              {:else if obj.base_stat < 50}
                <Tag color="error-light">{obj.base_stat}</Tag>
              {:else}
                <Tag color="gray-light">{obj.base_stat}</Tag>
              {/if}
            </TableCell>
          </TableRow>
        {/each}
      </Table>
    </Card>
  </Column50>
</Row>
