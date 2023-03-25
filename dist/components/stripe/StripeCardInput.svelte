<script>
  import { pageStore, configStore } from "../../utils/stores";
  import { isValidInput } from "../../utils/form";
  import { configLabel } from "../../utils/config";
  import { onMount } from "svelte";
  import Spinner from "../spinner/Spinner.svelte";

  export let id;
  export let label;
  export let desc;
  export let error;
  export let margin = false;
  export let stripe_key_name = "VITE_STRIPE_PUBLIC_KEY";
  export let __stripe_card;
  export let __stripe;

  let _label = configLabel(label, "required");

  let stripe_card_loading = true;
  let stripe_card_error;

  if (!label) {
    _label = "Credit Card Details";
  }

  $: is_error = $pageStore.errors && $pageStore.errors.findIndex((item) => item === id) >= 0 ? true : false;

  $: if (is_error) {
    setTimeout(() => {
      $pageStore.errors = $pageStore.errors.filter((a) => a !== id);
      is_error = false;
    }, $configStore.error_delay);
  }

  onMount(async () => {
    const { loadStripe } = await import("@stripe/stripe-js");

    try {
      __stripe = await loadStripe(import.meta.env[`${stripe_key_name}`]);

      const elements = __stripe.elements();

      const style = {
        base: {
          fontFamily: '"Inter", sans-serif',
          fontSize: "14px",
          fontWeight: 500,
          color: localStorage["bubbles-color-scheme"] === "dark" ? "#ffffff" : "var(--black)",
        },
        invalid: {
          color: "#FF6628",
          iconColor: "FF6628",
        },
      };

      __stripe_card = elements.create("card", { style: style });

      __stripe_card.mount("#__stripe__card__element");

      __stripe_card.on("change", (event) => {
        // const display_error = document.getElementById("card-errors");
        if (event.error) {
          error = event.error.message;
          pageStore.update((data) => {
            data.errors.push(id);
            return data;
          });
          // $pageStore.errors.push(id);
        } else {
          $pageStore.errors = $pageStore.errors.filter((a) => a !== id);
        }
      });

      stripe_card_loading = false;
    } catch (error) {
      stripe_card_loading = false;
      stripe_card_error = true;
    }
  });
</script>

<div class="form__field__container" {id} class:mb-2={margin}>
  <div class="field active">
    {#if !stripe_card_loading}
      <div class="field__label">
        <span class:hidden={is_error}>{_label}</span>
        <span class="error hidden" class:hidden={!is_error}>{error}</span>
      </div>
    {/if}
    <div class="field__wrap">
      <div class="field__input">
        {#if stripe_card_loading}
          <Spinner style="margin-top: 0.75rem" color="gray" />
        {/if}

        {#if stripe_card_error}
          <p class="stripe__error">There was an issue loading Stripe</p>
        {/if}
        <div id="__stripe__card__element" class="stripe" />
      </div>
    </div>
    {#if desc}
      <p class="field__desc">{@html desc}</p>
    {/if}
  </div>
</div>

<style>
  .form__field__container {
    width: 100%;
  }
  .mb-2 {
    margin-bottom: 2rem;
  }

  .field {
    position: relative;
    box-sizing: border-box;
    text-align: left;
  }

  .field__label {
    position: absolute;
    top: 2rem;
    right: 1.5rem;
    left: 1.5rem;
    pointer-events: none;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.9px;
    text-transform: uppercase;
    color: var(--gray);
    transition: transform 0.2s;
    margin-bottom: 0px !important;
  }

  .error {
    color: var(--error) !important;
    border-color: var(--error) !important;
  }

  .field__input {
    width: 100%;
    height: 5rem;
    padding: 1.125rem 1.375rem 0;
    border-radius: 12px;
    border: 2px solid transparent;
    background: rgba(228, 228, 228, 0.3);
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--black);
    transition: all 0.2s;
  }

  .stripe {
    padding-top: 1.35rem;
    width: 100%;
  }

  .stripe__error {
    flex: none;
    margin-bottom: 0px;
    color: var(--error);
  }

  .field__input:focus {
    border-color: var(--primary);
    background: var(--white);
  }

  .field.active .field__label {
    transform: translateY(-12px);
  }

  .field__desc {
    padding: 0.625rem 1.375rem 0 !important;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  :global(html.dark) textarea:disabled,
  :global(html.dark) input:disabled {
    color: var(--dark);
  }
  :global(html.dark) .field__label {
    color: var(--gray-lighter);
  }
  :global(html.dark) .field__textarea,
  :global(html.dark) .field__input {
    background: var(--dark);
    color: var(--gray-lighter);
  }
  :global(html.dark) input {
    caret-color: var(--white);
    color: var(--gray-lighter);
  }</style>
