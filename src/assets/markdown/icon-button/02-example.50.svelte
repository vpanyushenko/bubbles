<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";

  const iconButtonOptions = [
    {
      label: "Option 1",
      caption: "onclick example",
      onclick: (event) => {
        const icon_button_id = event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").id;

        showLoading(icon_button_id);

        setTimeout(() => {
          hideLoading(icon_button_id);
        }, 2000);
      },
    },
    {
      label: "Option 2",
      caption: "href example",
      href: "#",
    },
  ];

  const onclick = (event) => {
    //here the click event is the actual button click
    //so we can get the id for the button from the event
    const id = event.currentTarget.id;
    showLoading(id);

    setTimeout(() => {
      hideLoading(id);
    }, 2000);
  };
</script>

<Card height100={true}>
  <CardHeader title="Bundled Icon Options" border={false} />
  <div class="flex">
    <IconButton icon="more" options={iconButtonOptions} align="left" />
    <code>more</code>
  </div>
  <div class="flex">
    <IconButton icon="add" options={iconButtonOptions} align="left" />
    <code>add</code>
  </div>
  <div class="flex">
    <IconButton icon="arrowLeft" {onclick} />
    <code>arrowLeft</code>
  </div>
  <div class="flex">
    <IconButton icon="arrowRight" {onclick} />
    <code>arrowRight</code>
  </div>
  <div class="flex">
    <IconButton icon="close" options={iconButtonOptions} align="left" />
    <code>close</code>
  </div>
  <div class="flex">
    <IconButton icon="search" options={iconButtonOptions} align="left" />
    <code>search</code>
  </div>
  <div class="flex">
    <IconButton icon="edit" options={iconButtonOptions} align="left" />
    <code>edit</code>
  </div>
  <div class="flex">
    <IconButton icon="trash" options={iconButtonOptions} align="left" />
    <code>trash</code>
  </div>
  <div class="flex">
    <IconButton icon="filter" options={iconButtonOptions} align="left" />
    <code>filter</code>
  </div>
</Card>

<style>
  .flex {
    display: flex;
    align-items: center;
  }
</style>
