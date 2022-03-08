---
component: icon-buttons
---

```svelte
<script>
  import { IconButton, showLoading, hideLoading } from "bubbles-ui";

  const iconButtonOptions = [
    {
      label: "Option 1",
      caption: "onclick example",
      onclick: (event) => {
        //because we are targeting the dropdown component
        //and not settings an ID in the icon button, we'll
        //need to pull it's dynamic ID from the DOM
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
      href: "/#button",
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

<div class="flex">
  <IconButton icon="more" options={iconButtonOptions} />
  <code>more</code>
</div>
<div class="flex">
  <IconButton icon="add" options={iconButtonOptions} />
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
  <IconButton icon="close" options={iconButtonOptions} />
  <code>close</code>
</div>
<div class="flex">
  <IconButton icon="search" options={iconButtonOptions} />
  <code>search</code>
</div>
<div class="flex">
  <IconButton icon="edit" options={iconButtonOptions} />
  <code>edit</code>
</div>
<div class="flex">
  <IconButton icon="trash" options={iconButtonOptions} />
  <code>trash</code>
</div>
<div class="flex">
  <IconButton icon="filter" options={iconButtonOptions} />
  <code>filter</code>
</div>

<style>
  .flex {
    display: flex;
    align-items: center;
  }
</style>
```
