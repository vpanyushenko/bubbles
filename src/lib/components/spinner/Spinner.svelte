<script>
  export let size = 1.25;
  export let color = "__default";

  if (color === "__default") {
    color = "gray";
  }
</script>

<span
  class="spinner"
  style="width: {size}rem; height: {size}rem;"
  class:primary={color === "primary"}
  class:secondary={color === "secondary"}
  class:error={color === "error"}
  class:warning={color === "warning"}
  class:success={color === "success"}
  class:info={color === "info"}
  class:gray={color === "gray"}
  class:white={color === "white"}
  class:dark={color === "dark"}
/>

<style>
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    content: "";
    box-sizing: border-box;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 2px solid #ccc;
    animation: spinner 0.6s linear infinite;
  }

  .primary {
    border-color: var(--primary-light);
    border-top-color: var(--primary-lightest);
  }
  .secondary {
    border-color: var(--secondary-light);
    border-top-color: var(--secondary-lightest);
  }
  .error {
    border-color: var(--error-light);
    border-top-color: var(--error-lightest);
  }
  .warning {
    border-color: var(--warning-light);
    border-top-color: var(--warning-lightest);
  }
  .success {
    border-color: var(--success-light);
    border-top-color: var(--success-lightest);
  }
  .info {
    border-color: var(--info-light);
    border-top-color: var(--info-lightest);
  }
  .white,
  .gray {
    border-color: var(--gray-light);
    border-top-color: var(--gray-lightest);
  }
  .dark {
    border-color: var(--dark-light);
    border-top-color: var(--dark-lightest);
  }

  :global(html.dark) .primary {
    border-color: var(--primary-light);
    border-top-color: var(--primary-dark);
  }
  :global(html.dark) .secondary {
    border-color: var(--secondary-light);
    border-top-color: var(--secondary-dark);
  }
  :global(html.dark) .error {
    border-color: var(--error-light);
    border-top-color: var(--error-dark);
  }
  :global(html.dark) .warning {
    border-color: var(--warning-light);
    border-top-color: var(--warning-dark);
  }
  :global(html.dark) .success {
    border-color: var(--success-light);
    border-top-color: var(--success-dark);
  }
  :global(html.dark) .info {
    border-color: var(--info-light);
    border-top-color: var(--info-dark);
  }
  :global(html.dark) .gray {
    border-color: var(--gray-light);
    border-top-color: var(--gray-dark);
  }
  :global(html.dark) .dark {
    border-color: var(--dark-light);
    border-top-color: var(--dark-dark);
  }
</style>
