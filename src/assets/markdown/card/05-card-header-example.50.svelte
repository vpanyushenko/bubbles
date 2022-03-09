<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import { showModal } from "$lib/utils/modal";
</script>

<Card>
  <CardHeader title="Title" caption="Learn more <a href='#'>here</a>." />
  <div class="d-flex">This is a card header</div>
</Card>

<Card>
  <CardHeader
    title="Header With Buttons"
    buttons={[
      {
        icon: "edit",
        href: "#",
      },
      {
        icon: "more",
        options: [
          {
            label: "Contact Support",
            href: "#",
          },
          {
            label: "Delete Account",
            onclick: () => {
              showModal("Delete Account");
            },
          },
        ],
      },
    ]}
  />
  <div class="d-flex">This is a card header with buttons</div>
</Card>

<Card>
  <CardHeader
    filters={[
      {
        id: "filter",
        label: "Filter",
        options: [
          {
            label: "Filter 1",
            value: "filter1",
            caption: "Most popular",
          },
          "break",
          {
            label: "Filter 2",
            value: "filter2",
          },
          {
            label: "Filter 3",
            value: "filter3",
          },
        ],
      },
    ]}
  />
  <div class="d-flex">
    This is a card header with filters. The filters will update page query params which will make Svelte fetch new data.
    You can also pass your own logic for the filter by adding a function to the onselect property for the filter
    options.
  </div>
</Card>

<style>
  div {
    margin-bottom: 1rem;
  }
</style>
