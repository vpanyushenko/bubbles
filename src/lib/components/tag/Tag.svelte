<!--
  @component

  - *label*: The text for the tag 
  - *color*: The color of the tag
-->
<script>
  export let label = "";
  export let color = "primary";
  export let small = false;
  export let min_width = 3;
  export let margin = "0 0 0 0";

  let _mw = min_width;

  if (typeof _mw !== "number") {
    _mw = 3;
  }
</script>

<span
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

  span {
    font-family: "Fira Mono";
    display: inline-block;
    white-space: nowrap;
    padding: 3px 0.625rem;
    border-radius: 8px;
    color: #fff;
    font-size: 12px;
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
  }
</style>
