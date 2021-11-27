<!--
  @component

  ## Create a table with headers, rows, and footers.

  While you can create tables by importing `TableRow` and `TableCell` you're most likely fetching data from some API and displaying to the customer. As a result, you can just pass in the a `header` prop and `rows` prop and your table will be built progamatically.
  ---
  #### Inputs
  - `@param {Array<(String|null)>} header` - an array of header to use
  - `@param {Array<Object>} rows` - the rows that will be included
  ---
  #### Example

  ```js
  
  //the header component is optional but will give your table labels for the columns
  const header = [
    {
      label: "Column 1",
      align: "left" //you can omit this because left align is the default
    },
    {
      label: "Column 2",
    },
    {
      label: "Column 3",
      align: "right" 
    }
    {
      label: null, //pass any falsy value to skip the label. Usefullif you have a button as the last part of your table and you don't want to label it
    }
  ]


  //While most table are pretty simple, bubbles supports common modifications to table rows. 
  const rows = [
    //When a title is passed, this tells Bubbles to use a standard table cell
    {
      label: "Title", 
      large: true, // makes the title large, useful for simple tables for something like a settings menu
      bold: true, // makes the title bold, useful for complex tables for the primary piece of information
      caption: "subtitle", //adds a subtitle below the main title. Useful when the title is a person's name and you want to include their email below it
      href: "/"
      align: "left" //You can omit aligning left because that's the default
    },
    //adding an image object will add a picture into the cell
    {

      img: { 
        src: "/images/profile.png", 
        alt: "Profile Picture"
      }
      href: "/profile",
    },
    //adding a tag property will cause the tag to be rendered
    {
      tag: {
       label: "Active",
       color: "primary", //you can omit colorL primary as that is the default
       small: true //make the tag smaller, not recommented for this use case
      }
      align: "right",
    },
    //adding a button property will render an button in the table
    {
      button: {
        icon: "more", //include one of the default icons or passin your own svg,
        onclick: someFunction(), //pass a custom function like opening a modal,
        href: "/profile", //use href to go to a page. The is recommended for navigation because data will be prefetched for faster performance,
        //you can pass options which will open a dropdown
        options: [
          {
            label: "See details",
            caption: "View the page details"
            href: "/profile"
          },
          {
            label: "Delete profile",
            caption: "Deletes the profile"
            onclick: deleteConfirmationModal(),
          }
        ]
      }
    },
    //if you add a rows property, you'll created a stacked cell. This is different from title and caption because you can add tags before and after each row
    //You most likely don't need this type and might be better off creating your own custom rows and cells with slots.
    {
      rows: [
        [
          {
            title: "Jamie Jones"
            href: "profile/jamie_jones"
          },
          {
            tag: {
              label: "Active",
              color: "primary", //you can omit colorL primary as that is the default
            }
          }
        ],
        [
          {
            title: "jamie@bubbles.com"
          },
        ],
        [
          {
            title: "(123) 456-7890"
          },
        ]
      ]
    }

  ```

  ---
-->
<script>
  import { pageStore } from "$lib/stores/page.store";
  import TableRow from "./TableRow.svelte";
  import TableCell from "./TableCell.svelte";
  import TableHeader from "./TableHeader.svelte";

  export let header = [];
  export let rows = [];
  export let empty = "Nothing here yet.";
  export let mobile_transform = true;

  let w;

  $: is_mobile = w <= 500 ? true : false;

  $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<div class="table" class:mobile={is_mobile === true} bind:clientWidth={w}>
  {#if header && header.length}
    <TableHeader {header} {mobile_transform} />
  {/if}

  {#if rows && rows.length}
    {#each rows as row}
      <TableRow {...row} />
    {/each}
  {:else}
    <slot>
      <TableRow>
        <TableCell>
          <p class="empty">{empty}</p>
        </TableCell>
      </TableRow>
    </slot>
  {/if}
</div>

<style>
  .table {
    display: table;
    width: 100%;
    color: var(--black);
  }

  :global(.table .row:last-of-type .cell) {
    border-bottom: none;
  }

  @media only screen and (max-width: 767px) {
    .table.mobile-transform {
      display: flex;
      flex-direction: column;
    }
  }
</style>
