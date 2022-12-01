<script>
  import { configStore, uuid } from "$lib/index";

  export let id = uuid();
  export let label = "";
  export let tooltip = null;
  export let color = "__default";
  export let colors = [];
  export let small = false;
  export let min_width = 3;
  export let margin = "0 0 0 0";
  export let dark_mode_invert = $configStore?.dark_mode_invert;
  export let __delete = false;

  let _mw = min_width;

  if (typeof _mw !== "number") {
    _mw = 3;
  }

  if (color === "__default") {
    color = "primary-lightest";
  }

  $: if (Array.isArray(colors) && label) {
    const match = colors.find((option) => option?.label?.toLowerCase() === label?.toLowerCase());

    if (match) color = match.color;
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<span
  {id}
  data-tooltip={tooltip}
  style="min-width:{min_width}rem; margin:{margin};"
  class:dark_mode_invert
  class:bg-transparent={!color}
  class:bg-primary-lightest={color === "primary-lightest"}
  class:bg-primary-lighter={color === "primary-lighter"}
  class:bg-primary-light={color === "primary-light"}
  class:bg-primary={color === "primary"}
  class:bg-primary-dark={color === "primary-dark"}
  class:bg-primary-darker={color === "primary-darker"}
  class:bg-primary-darkest={color === "primary-darkest"}
  class:bg-secondary-lightest={color === "secondary-lightest"}
  class:bg-secondary-lighter={color === "secondary-lighter"}
  class:bg-secondary-light={color === "secondary-light"}
  class:bg-secondary={color === "secondary"}
  class:bg-secondary-dark={color === "secondary-dark"}
  class:bg-secondary-darker={color === "secondary-darker"}
  class:bg-secondary-darkest={color === "secondary-darkest"}
  class:bg-error-lightest={color === "error-lightest"}
  class:bg-error-lighter={color === "error-lighter"}
  class:bg-error-light={color === "error-light"}
  class:bg-error={color === "error"}
  class:bg-error-dark={color === "error-dark"}
  class:bg-error-darker={color === "error-darker"}
  class:bg-error-darkest={color === "error-darkest"}
  class:bg-warning-lightest={color === "warning-lightest"}
  class:bg-warning-lighter={color === "warning-lighter"}
  class:bg-warning-light={color === "warning-light"}
  class:bg-warning={color === "warning"}
  class:bg-warning-dark={color === "warning-dark"}
  class:bg-warning-darker={color === "warning-darker"}
  class:bg-warning-darkest={color === "warning-darkest"}
  class:bg-success-lightest={color === "success-lightest"}
  class:bg-success-lighter={color === "success-lighter"}
  class:bg-success-light={color === "success-light"}
  class:bg-success={color === "success"}
  class:bg-success-dark={color === "success-dark"}
  class:bg-success-darker={color === "success-darker"}
  class:bg-success-darkest={color === "success-darkest"}
  class:bg-info-lightest={color === "info-lightest"}
  class:bg-info-lighter={color === "info-lighter"}
  class:bg-info-light={color === "info-light"}
  class:bg-info={color === "info"}
  class:bg-info-dark={color === "info-dark"}
  class:bg-info-darker={color === "info-darker"}
  class:bg-info-darkest={color === "info-darkest"}
  class:bg-gray-lightest={color === "gray-lightest"}
  class:bg-gray-lighter={color === "gray-lighter"}
  class:bg-gray-light={color === "gray-light"}
  class:bg-gray={color === "gray"}
  class:bg-gray-dark={color === "gray-dark"}
  class:bg-gray-darker={color === "gray-darker"}
  class:bg-gray-darkest={color === "gray-darkest"}
  class:bg-dark-lightest={color === "dark-lightest"}
  class:bg-dark-lighter={color === "dark-lighter"}
  class:bg-dark-light={color === "dark-light"}
  class:bg-dark={color === "dark"}
  class:bg-dark-dark={color === "dark-dark"}
  class:bg-dark-darker={color === "dark-darker"}
  class:bg-dark-darkest={color === "dark-darkest"}
  class:small
>
  <slot>
    {@html label}
  </slot>
</span>

<style>
  @import "@fontsource/fira-mono/700.css";

  @media only screen and (min-width: 767px) {
    [data-tooltip] {
      position: relative;
      z-index: 10;
    }

    [data-tooltip]:before,
    [data-tooltip]:after {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      transition: 0.2s ease-out;
      transform: translate(-50%, 5px);
      display: table;
    }

    [data-tooltip]:before {
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-bottom: 5px;
      padding: 7px;
      width: 100%;
      min-width: 70px;
      max-width: 250px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      background-color: var(--white);
      color: var(--dark);
      content: attr(data-tooltip);
      text-align: center;
      font-size: 0.75rem;
      line-height: 1.2;
      transition: 0.2s ease-out;
      font-family: "Inter", sans-serif;
      text-transform: none;
      filter: drop-shadow(0px 6px 6px rgba(227, 230, 236, 1));
    }

    [data-tooltip]:after {
      position: absolute;
      bottom: 100%;
      left: 50%;
      width: 0;
      border-top: 5px solid var(--white);
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      content: " ";
      font-size: 0;
      line-height: 0;
      filter: drop-shadow(0px 6px 6px rgba(227, 230, 236, 1));
    }

    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
      visibility: visible;
      opacity: 1;
      transform: translate(-50%, 0);
    }
    [data-tooltip="false"]:hover:before,
    [data-tooltip="false"]:hover:after {
      visibility: hidden;
      opacity: 0;
    }
  }

  :global(html.dark) [data-tooltip]:before {
    background-color: var(--dark);
    color: var(--gray-lightest);
  }

  :global(html.dark) [data-tooltip]:after {
    border-top: 5px solid var(--dark);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
  }

  :global(html.dark) [data-tooltip]:before,
  :global(html.dark) [data-tooltip]:after {
    filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 1));
  }

  span {
    font-family: "Fira Mono";
    font-weight: 700;
    display: inline-block;
    white-space: nowrap;
    padding: 3px 0.625rem;
    border-radius: 8px;
    font-size: 0.75rem;
    text-transform: uppercase;
    vertical-align: middle;
    text-align: center;
  }

  .small {
    font-size: 0.6rem;
    /* padding: 3px 0.625rem; */
  }
</style>
