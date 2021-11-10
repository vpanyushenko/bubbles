<!--
  @component

  - *label*: The text for the tag 
  - *color*: The color of the tag
-->
<script>
  export let label = "";
  export let color = "primary";
  export let small = false;
  export let min_width = true;
</script>

{#if label}
  <span
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
    class:small
    class:min_width>{label}</span
  >
{/if}

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
    color: var(--primary-darkest);
  }

  .secondary {
    background: var(--secondary);
    color: var(--white);
  }

  .secondary-light {
    background: var(--secondary-lightest);
    color: var(--secondary-darkest);
  }

  .error {
    background: var(--error);
    color: var(--white);
  }

  .error-light {
    background: var(--error-lightest);
    color: var(--error-darkest);
  }

  .warning {
    background: var(--warning);
    color: var(--white);
  }

  .warning-light {
    background: var(--warning-lightest);
    color: var(--warning-darkest);
  }

  .success {
    background: var(--success);
    color: var(--white);
  }

  .success-light {
    background: var(--success-lightest);
    color: var(--success-darkest);
  }

  .info {
    background: var(--info);
    color: var(--white);
  }

  .info-light {
    background: var(--info-lightest);
    color: var(--info-darkest);
  }

  .dark {
    background: var(--dark);
    color: var(--white);
  }

  .dark-light {
    background: var(--dark-lightest);
    color: var(--dark-darkest);
  }

  .gray {
    background: var(--gray);
    color: var(--gray-lightest);
  }

  .gray-light {
    background: var(--gray-lightest);
    color: var(--gray-grayest);
  }

  .min_width {
    min-width: 50px;
  }

  .small {
    font-size: 9px;
  }
</style>
