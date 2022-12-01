<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import icon_circle from "$docs/icons/shapes/circle.svg";
  import icon_square from "$docs/icons/shapes/square.svg";
  import icon_triangle from "$docs/icons/shapes/triangle.svg";
  import icon_pentagon from "$docs/icons/shapes/pentagon.svg";
  import icon_star from "$docs/icons/shapes/star.svg";

  import Select from "$lib/components/select/Select.svelte";
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <Select
    id="select_example"
    value={null}
    label="Select a shape"
    error="Please select a shape"
    desc="This is the description that will be below the select element. Any description field can render inline html elements."
    type="select"
    validation="required|string"
    vob={true}
    onselect={(value) => {
      //This will fire for every item you select with the value of the selected item
      console.log(value);
    }}
    options={[
      {
        label: "Circle",
        value: "circle",
        caption: "No corners!",
        img: icon_circle,
        color: "error",
      },
      {
        break: true,
      },
      {
        label: "Square",
        value: "square",
        img: icon_square,
      },
      {
        label: "Pentagon",
        value: "pent",
        img: icon_pentagon,
        onselect: () => {
          console.log("Whoa, you like pentagons?");
        },
      },
      {
        label: "Triangle",
        value: "tri",
        img: icon_triangle,
      },
      {
        label: "Star",
        value: "star",
        img: icon_star,
      },
      {
        label: "No Icon Shape",
        value: null,
      },
      {
        label: "Empty String Value",
        value: "",
      },
    ]}
  />

  <!-- <Select
    value={null}
    label="Select a Shelf"
    search_threshold={0.1}
    options={[
      {
        label: "No Layout",
        value: null,
      },
      {
        label: "Aisle 1",
        value: "lay_49074c95648b45368fa9203375c5f3b2",
      },
      {
        label: "Aisle 1 > Shelf A",
        value: "lay_4fa9203375c543b2828aa27a334d05de",
      },
      {
        label: "Aisle 1 > Shelf A > Bin 1",
        value: "lay_f3b2028aa27a434d85de8db0cb7b9625",
      },
      {
        label: "Aisle 1 > Shelf A > Bin 2",
        value: "lay_b2028aa27a334d059e8db0cb7b962573",
      },
      {
        label: "Aisle 1 > Shelf A > Bin 3",
        value: "lay_028aa27a334d45de8db0cb7b96257332",
      },
      {
        label: "Aisle 1 > Shelf B",
        value: "lay_f69f5dbab74447fe88a671c9d928688c",
      },
      {
        label: "Aisle 1 > Shelf B > Bin 1",
        value: "lay_478aa78ddb0c4bbd8157a82e9489ab32",
      },
      {
        label: "Aisle 1 > Shelf B > Bin 2",
        value: "lay_725059b5520345a9a47bd8f6046ce61d",
      },
      {
        label: "Aisle 1 > Shelf B > Bin 3",
        value: "lay_364a9bae1f1e4933bd4fdaf513956a5d",
      },
      {
        label: "Aisle 2",
        value: "lay_2da48b8859544d58aab2042e27c29efc",
      },
      {
        label: "Aisle 2 > Shelf A",
        value: "lay_69b77dbaa2364095a25b4081b82731e4",
      },
      {
        label: "Aisle 2 > Shelf A > Bin 1",
        value: "lay_c119bbd1c118467285fcdc48207ec13d",
      },
      {
        label: "Aisle 2 > Shelf A > Bin 2",
        value: "lay_2f7b05451fab448eb5cef23d06a826df",
      },
      {
        label: "Aisle 2 > Shelf A > Bin 3",
        value: "lay_125aa6765ab34317a00152bf72b3e28a",
      },
      {
        label: "Aisle 2 > Shelf B",
        value: "lay_4745028642e541fda117f5c6dca7beda",
      },
    ]}
  /> -->
</Card>
