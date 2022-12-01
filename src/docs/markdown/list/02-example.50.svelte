<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import List from "$lib/components/list/List.svelte";
</script>

<Card>
  <CardHeader title="Standard List" border={false} />
  <List
    items={[
      {
        label: "Label",
        text: "Simple List Item",
      },
      {
        label: "Label",
        text: "Example with href",
        href: "https://google.com",
        new_page: true,
      },
      {
        label: "Download",
        text: "Icon Example",
        icon: "download",
        onclick: () => {
          alert("List clicked");
        },
      },
      {
        label: "copy",
        text: "Icon Example",
        icon: "copy",
        onclick: () => {
          alert("List clicked");
        },
      },
      {
        label: "edit",
        text: "Icon Example",
        icon: "edit",
        onclick: () => {
          alert("List clicked");
        },
      },
      {
        label: "trash",
        text: "Icon Example",
        icon: "trash",
        onclick: () => {
          alert("List clicked");
        },
      },
      {
        label: "Tag Label",
        tag: {
          label: "Tag Example",
          color: "primary",
        },
      },
      {
        tag: {
          label: "Tags Can Be Used Without Labels",
          color: "error",
        },
      },
    ]}
  />
</Card>

<Card>
  <CardHeader title="Timeline List" border={false} />
  <List
    type="timeline"
    items={[
      {
        label: "Label",
        text: "List test",
        href: "https://google.com",
        new_page: true,
        active: false,
      },
      {
        label: "Label",
        text: "List test",
        icon: "edit",
        active: true,
        pulse: false, //no pulsing
        color: "dark", //changed color
      },
      {
        label: "Label",
        text: "List test",
        icon: "edit",
        active: true,
      },
      {
        label: "Label",
        text: "List test",
        active: true,
        color: "primary",
      },
      {
        label: "Label",
        text: "List test",
        active: true,
        color: "error",
      },
    ]}
  />
</Card>
