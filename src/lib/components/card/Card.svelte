<!--
  @component

  ## Cards

  Cards are the focus of Bubbles and they will normally be the sections of your page. Cards will fit into whatever `Column` or `Grid` layouts you choose.About

  ---
  #### Anatomy
  Cards have three sections, `header`, `body`, and `footer`
  
  - The `header` is normally used for the `title` + `action` items or `filters`, which are select elements. You'll use the filters most often when the `body` of your card has a table, as the filter should modify the page url trigger the svelte load function to run again
  - The `body` is where you add your content. This can be a `Table`, `Form`, or any other element(s) you choose. It's a slot and takes no arguments
  - The `footer` is the bottom of the card and off by default. Most uses for the card footer are for pagination of a table or for CTA buttons (though in a form it's best to include the CTA buttons in the form instead of the card footer)


  #### Example

  ```js
  
  //The card header is optional. If can include a title, subtitle, + button combo or filters. 

  const headerConfig = {
    title: "Card Title" //This string will appear at the top of your card
    caption: "Card Subtitle" //If you need a subtitle,
    actions: [
        {
          icon: "add", //prebundled icon or pass in your own svg
          onclick: showModel() //add a function
        },
        {
          icon: "/images/home.svg", //added a custom svg
          href: "/", //href to take me to another page
        },
      ],
    border: false //turn off the border, it's my by default
    }

    //The filter config is just a select element with an onselect function that should modify a url querty param which will rerun the svelte kit laod funciton
    //Bubbles has a setQueryParam function which you can import from "bubbles/utils/url"

    //TODO: The fitlers are unfinished
  const headerFilterConfig = {
    filters: [
      {
        label: "Filter by name",
      }
    ]
  }

  

  //The footer
  const footerConfig = {
    align: "start" || "center" || "end" //justifies the footer
    //if you have pagination for the template, you can add in the pagination prop
    pagination: {
        //TODO:
    } 
  }




  ```

  ---
-->
<script>
  import { pageStore } from "$lib/stores/page.store";
  import CardHeader from "./CardHeader.svelte";
  import CardFooter from "./CardFooter.svelte";

  export let header = {};
  export let footer = {};
  export let my = 0.625;
  export let mx = 2;
  export let color = "white";
  export let shadow = true;
  export let border = null;
  export let height100 = false;

  let y = `${my}rem`;
  let x = `${mx}rem`;
  let background = null;

  if (color) {
    background = `var(--${color})`;
  }

  $: innerWidth = 0;
  $pageStore.is_mobile = innerWidth < 767 ? true : false;
</script>

<svelte:window bind:innerWidth />

<div
  class="card"
  class:shadow
  class:border
  class:height-100={height100}
  style="padding-top:{y};padding-bottom:{y};padding-left:{x};padding-right:{x};background:{background}"
>
  {#if header && Object.keys(header).length}
    <CardHeader {...header} />
  {/if}
  <div class="body" class:height-100={height100}>
    <slot />
  </div>

  {#if footer && Object.keys(footer).length}
    <CardFooter {...footer} />
  {/if}
</div>

<style>
  .card {
    position: relative;
    padding: 0.625rem 2rem 0.625rem;
    border-radius: 1.5rem;
    background: var(--white);
  }

  .shadow {
    -webkit-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    -moz-box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
    box-shadow: rgba(227, 230, 236, 0.65) 0px 0px 6.875rem;
  }

  .border {
    border: 1px solid var(--gray-light);
  }

  .height-100 {
    height: 100%;
  }
</style>
