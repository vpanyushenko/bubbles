<script>
  import { goto } from "$app/navigation";
  import { pageStore } from "$lib/stores/page.store";
  import { v4 as uuid } from "@lukeed/uuid";
  import { showLoading, hideLoading } from "$lib/utils/loading";

  export let id = uuid();
  export let label = "Submit";
  export let onclick = null;
  export let onsubmit = null;
  export let color = "primary";
  export let mt = false;
  export let mb = false;
  export let wide = false;
  export let href;

  $: loading = $pageStore.loading.includes(id);

  function buttonClicked(event) {
    const id = event.currentTarget.id;

    if (href) {
      showLoading(id);
      goto(href)
        .then(() => {
          setTimeout(() => {
            hideLoading(id);
          }, 300);
        })
        .catch((err) => {
          console.error(err);
          hideLoading(id);
        });
    }
  }
</script>

<button
  {id}
  class="btn"
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
  class:mb
  class:mt
  class:wide
  on:click={onclick}
  on:click={buttonClicked}
  on:click={onsubmit}
>
  <div class="d-flex">
    <span class="spinner mr-1 hidden" class:hidden={!loading} />
    <span style="vertical-align: middle;">{label}</span>
  </div>
</button>

<style>
  @keyframes loading {
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
    border: 0.15rem solid #ccc;
    border-top-color: #fff;
    animation: loading 0.6s linear infinite;
    display: inline-block;
    vertical-align: bottom;
  }
  .mb {
    margin-bottom: 1rem;
  }

  .mt {
    margin-top: 1rem;
  }

  .mr-1 {
    margin-right: 1rem;
  }
  .btn {
    min-width: 166px;
    height: 56px;
    padding: 0 1.25rem;
    border-radius: 1rem/1rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    line-height: 1.42857;
    font-weight: 700;
    -webkit-transition: all 0.25s;
    -o-transition: all 0.25s;
    transition: all 0.25s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .primary {
    background: var(--primary);
    color: var(--white);
  }

  .primary:focus,
  .primary:hover {
    background: var(--primary-dark);
  }

  .primary-light {
    background: var(--primary-lightest);
    color: var(--primary-darkest);
  }

  .primary-light:focus,
  .primary-light:hover {
    background: var(--primary-lighter);
  }

  .secondary {
    background: var(--secondary);
    color: var(--white);
  }

  .secondary:focus,
  .secondary:hover {
    background: var(--secondary-dark);
  }

  .secondary-light {
    background: var(--secondary-lightest);
    color: var(--secondary-darkest);
  }

  .secondary-light:focus,
  .secondary-light:hover {
    background: var(--secondary-lighter);
  }

  .error {
    background: var(--error);
    color: var(--white);
  }

  .error:focus,
  .error:hover {
    background: var(--error-dark);
  }

  .error-light {
    background: var(--error-lightest);
    color: var(--error-darkest);
  }

  .error-light:focus,
  .error-light:hover {
    background: var(--error-lighter);
  }

  .warning {
    background: var(--warning);
    color: var(--white);
  }

  .warning:focus,
  .warning:hover {
    background: var(--warning-dark);
  }

  .warning-light {
    background: var(--warning-lightest);
    color: var(--warning-darkest);
  }

  .warning-light:focus,
  .warning-light:hover {
    background: var(--warning-lighter);
  }

  .success {
    background: var(--success);
    color: var(--white);
  }

  .success:focus,
  .success:hover {
    background: var(--success-dark);
  }

  .success-light {
    background: var(--success-lightest);
    color: var(--success-darkest);
  }

  .success-light:focus,
  .success-light:hover {
    background: var(--success-lighter);
  }

  .info {
    background: var(--info);
    color: var(--white);
  }

  .info:focus,
  .info:hover {
    background: var(--info-dark);
  }

  .info-light {
    background: var(--info-lightest);
    color: var(--info-darkest);
  }

  .info-light:focus,
  .info-light:hover {
    background: var(--info-lighter);
  }

  .dark {
    background: var(--dark);
    color: var(--white);
  }

  .dark:focus,
  .dark:hover {
    background: var(--dark-light);
  }

  .dark-light {
    background: var(--dark-lightest);
    color: var(--dark-darkest);
  }

  .dark-light:focus,
  .dark-light:hover {
    background: var(--dark-light);
    color: var(--white);
  }

  .gray {
    background: var(--gray);
    color: var(--gray-lightest);
  }

  .gray:focus,
  .gray:hover {
    background: var(--gray-dark);
  }

  .gray-light {
    background: var(--gray-lightest);
    color: var(--gray-grayest);
  }

  .gray-light:focus,
  .gray-light:hover {
    background: var(--gray-light);
  }

  .wide {
    min-width: 100%;
  }

  .small {
    width: 5rem;
    min-width: auto;
  }

  .btn:disabled {
    cursor: not-allowed;
    background: var(--gray);
    color: var(--black);
  }
</style>
