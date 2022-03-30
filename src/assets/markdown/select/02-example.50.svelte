<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import icon_circle from "$assets/icons/shapes/circle.svg";
  import icon_square from "$assets/icons/shapes/square.svg";
  import icon_triangle from "$assets/icons/shapes/triangle.svg";
  import icon_pentagon from "$assets/icons/shapes/pentagon.svg";
  import icon_star from "$assets/icons/shapes/star.svg";

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
</Card>
