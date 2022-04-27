<script>
  export let label = "";
  export let tooltip = null;
  export let color = "primary-light";
  export let small = false;
  export let min_width = 3;
  export let margin = "0 0 0 0";

  let _mw = min_width;

  if (typeof _mw !== "number") {
    _mw = 3;
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<span
  data-tooltip={tooltip}
  style="min-width:{min_width}rem; margin:{margin};"
  class:primary={color === "primary"}
  class:secondary={color === "secondary"}
  class:error={color === "error"}
  class:warning={color === "warning"}
  class:success={color === "success"}
  class:info={color === "info"}
  class:gray={color === "gray"}
  class:dark={color === "dark"}
  class:primary-light={color === "primary-light"}
  class:secondary-light={color === "secondary-light"}
  class:error-light={color === "error-light"}
  class:warning-light={color === "warning-light"}
  class:success-light={color === "success-light"}
  class:info-light={color === "info-light"}
  class:gray-light={color === "gray-light"}
  class:dark-light={color === "dark-light"}
  class:primary-border={color === "primary-border"}
  class:secondary-border={color === "secondary-border"}
  class:error-border={color === "error-border"}
  class:warning-border={color === "warning-border"}
  class:success-border={color === "success-border"}
  class:info-border={color === "info-border"}
  class:gray-border={color === "gray-border"}
  class:dark-border={color === "dark-border"}
  class:small
>
  <slot>
    {label}
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
      /* display: inline-table;
      white-space: pre-wrap; */
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

  span {
    font-family: "Fira Mono";
    display: inline-block;
    white-space: nowrap;
    padding: 3px 0.625rem;
    border-radius: 8px;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    vertical-align: middle;
    text-align: center;
  }

  .primary {
    background: var(--primary);
    color: var(--white);
  }

  .primary-light {
    background: var(--primary-lightest);
    color: var(--primary-darker);
  }

  .primary-border {
    color: var(--primary);
    border: 2px solid var(--primary);
  }

  .secondary {
    background: var(--secondary);
    color: var(--white);
  }

  .secondary-light {
    background: var(--secondary-lightest);
    color: var(--secondary-darker);
  }

  .secondary-border {
    color: var(--secondary);
    border: 2px solid var(--secondary);
  }

  .error {
    background: var(--error);
    color: var(--white);
  }

  .error-light {
    background: var(--error-lightest);
    color: var(--error-darker);
  }

  .error-border {
    color: var(--error);
    border: 2px solid var(--error);
  }

  .warning {
    background: var(--warning);
    color: var(--white);
  }

  .warning-light {
    background: var(--warning-lightest);
    color: var(--warning-darker);
  }

  .warning-border {
    color: var(--warning);
    border: 2px solid var(--warning);
  }

  .success {
    background: var(--success);
    color: var(--white);
  }

  .success-light {
    background: var(--success-lightest);
    color: var(--success-darker);
  }

  .success-border {
    color: var(--success);
    border: 2px solid var(--success);
  }

  .info {
    background: var(--info);
    color: var(--white);
  }

  .info-light {
    background: var(--info-lightest);
    color: var(--info-darker);
  }

  .info-border {
    color: var(--info);
    border: 2px solid var(--info);
  }

  .dark {
    background: var(--dark);
    color: var(--white);
  }

  .dark-light {
    background: var(--dark-lightest);
    color: var(--dark-darker);
  }

  .dark-border {
    color: var(--dark);
    border: 2px solid var(--dark);
  }

  .gray {
    background: var(--gray);
    color: var(--gray-lightest);
  }

  .gray-light {
    background: var(--gray-lightest);
    color: var(--gray-grayest);
  }

  .gray-border {
    color: var(--gray);
    border: 2px solid var(--gray);
  }

  .small {
    font-size: 0.6rem;
    padding: 0 0.25rem;
  }
</style>
