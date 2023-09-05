<script>
  import { TableRow, TableCell } from "$lib/index";
  import { page } from "$app/stores";

  export let text = "There is nothing here yet.";
  let _text = text;

  $: if ($page) {
    const query_params = [];
    for (const key of $page.url.searchParams.keys()) {
      query_params.push(key);
    }

    console.log(query_params);

    if (query_params.length === 0) _text = text;
    else if (query_params.includes("search")) _text = `There were no results for your search`;
    else _text = `There were no results for the applied filters`;
    //   _text = `There were no results for your filters: ${[...new Set(query_params)]
    //     .filter(Boolean)
    //     .filter((s) => s !== "search")
    //     .map((s) => s.split("_").filter(Boolean).map(titleCase).join(" "))
    //     .join(", ")}`;
  }
</script>

<TableRow>
  <TableCell text={_text} />
</TableRow>
