<script>
  import { dev } from "$app/environment";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { v4 as uuid } from "@lukeed/uuid";
  import Switch from "$lib/components/switch/LabeledSwitch.svelte";
  import Input from "$lib/components/input/Input.svelte";
  import StripeCardInput from "$lib/components/stripe/StripeCardInput.svelte";
  import Select from "$lib/components/select/Select.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import ButtonGroup from "$lib/components/button/ButtonGroup.svelte";
  import Divider from "$lib/components/divider/Divider.svelte";
  import RadioGroup from "$lib/components/radio/RadioGroup.svelte";
  import LabeledCheckbox from "$lib/components/checkbox/LabeledCheckbox.svelte";
  import CheckboxGroup from "$lib/components/checkbox/CheckboxGroup.svelte";
  import { modalStore } from "$lib/utils/stores";

  import { createEventDispatcher, onMount } from "svelte";

  export let inputs = [];
  export let id = uuid();
  export let breakpoint = 380;
  let row_width = 0;
  let is_mobile_width = false;

  const submitButton = inputs.find((a) => a.type === "submit");
  const dispatch = createEventDispatcher();

  if (submitButton && !submitButton.id) {
    submitButton.id = `form_btn_${id}`;
  }

  function keydown(event) {
    //let active_element = document.activeElement;
    let active_element = event.target;

    setTimeout(() => {
      if (
        event.key === "Enter" &&
        active_element.closest(".form") &&
        !event.defaultPrevented &&
        !active_element.classList.contains("select") &&
        active_element.type !== "checkbox" &&
        active_element.type !== "radio"
      ) {
        if (active_element.closest(".form").id === id || active_element.closest(".form").id === `form_btn_${id}`) {
          let submitButton = inputs.find((a) => a.type === "submit");

          //Check if we are in a modal and the submit button is in the footer
          if (!submitButton && $modalStore.footer) {
            submitButton = $modalStore.footer.find((a) => a.type === "submit");
          }

          if (submitButton) {
            document.getElementById(submitButton.id).click();
          }
        }
      }
    }, 50);
  }

  //determine if any inputs are dependent on other inputs
  $: formatted_inputs = formatInputs(inputs, is_mobile_width);

  $: if (inputs) {
    dispatch("update", inputs);
  }

  function formatInputs(inputs, is_mobile_width) {
    return inputs.map((input) => {
      if (dev && input?.hidden_if && input.hidden_if.length && input?.hidden_unless && input.hidden_unless.length) {
        console.log("There may negative side effects when using both hidden_if and hidden_unless on the same input");
      }

      if (!input.id) {
        console.log("Form input missing id, so one is being assigned");
        input.id = uuid();
      }

      if (!input.hidden_if) {
        input.hidden_if = [];
      }

      if (!input.hidden_unless) {
        input.hidden_unless = [];
      }

      //calculate row widths in case the user wants to use nested inputs
      if (!is_mobile_width) {
        if (!input.width) {
          input.width = 100;
        } else if (input.width === 33) {
          input.width = 33.333333;
        }

        row_width += input.width;
      } else {
        row_width = 100;
      }

      //row_width += mobile && input.mobile_width ? input.mobile_width : input.width;

      if (row_width >= 98) {
        row_width = 0;
        input.last_row = true;
      } else {
        input.last_row = false;
      }

      input.is_hidden = false;

      input.hidden_if.forEach((obj) => {
        const matched_input = inputs.find((input) => input.id === obj.id);

        if (matched_input && matched_input.value === obj.value) {
          input.is_hidden = true;
        }
      });

      input.hidden_unless.forEach((obj) => {
        const matched_input = inputs.find((input) => input.id === obj.id);

        if (matched_input && matched_input.value !== obj.value) {
          input.is_hidden = true;
        }
      });

      if (input.hidden_unless && Array.isArray(input.hidden_unless) && input.hidden_unless.length) {
        console.warn("hidden_unless has been deprecated. Use hide function instead");
      }

      if (input.hidden_if && Array.isArray(input.hidden_if) && input.hidden_if.length) {
        console.warn("hidden_if has been deprecated. Use hide function instead");
      }

      if (input.hide && input.hide instanceof Function) {
        if (input.hide() === true) {
          input.is_hidden = true;
        }
      }

      return input;
    });
  }

  function getFormWidth() {
    const form = document.getElementById(id);

    if (typeof breakpoint !== "number") {
      breakpoint = 380;
    }

    if (form.getBoundingClientRect().width < breakpoint) {
      is_mobile_width = true;
    } else {
      is_mobile_width = false;
    }
  }

  onMount(() => {
    getFormWidth();
  });
</script>

<svelte:window on:resize={getFormWidth} />

<div class="form js-bubbles-form" {id}>
  {#each formatted_inputs as input}
    {#if !input.is_hidden}
      <span
        class="form__row"
        class:hidden={input.type === "hidden"}
        class:form__row__inline={input.width !== 100 && !is_mobile_width ? true : false}
        class:form__row__inline__last__row={is_mobile_width ? true : input.last_row}
        style="width: {is_mobile_width ? 100 : input.width}%"
        in:scale|local={{
          duration: 750,
          opacity: 0,
          start: 0.5,
          easing: quintOut,
        }}
        out:scale|local={{
          duration: 750,
          opacity: 0,
          start: 0,
          easing: quintOut,
        }}
      >
        {#if ["text", "email", "password", "date", "number", "textarea", "tel", "phone", "time", "tag", "chip"].includes(input.type)}
          <Input {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "stripe" || input.type === "stripe-card"}
          <StripeCardInput
            {...input}
            bind:value={input.value}
            bind:__stripe_card={input.__stripe_card}
            bind:__stripe={input.__stripe}
          />
        {/if}

        {#if input.type === "switch"}
          <Switch {...input} bind:value={input.value} background={input.background === false ? false : true} />
        {/if}

        {#if input.type === "select" || input.type === "select-number"}
          <Select {...input} bind:value={input.value} min_width={false} />
        {/if}

        {#if input.type === "button"}
          <Button {...input} wide={true} />
        {:else if input.type === "submit"}
          <Button {...input} wide={true} />
        {/if}

        {#if input.type === "button-group" || input.type === "buttons"}
          <ButtonGroup buttons={input.buttons} />
        {/if}

        {#if input.type === "divider"}
          <Divider {...input} />
        {/if}

        {#if input.type === "radio" || input.type === "radio-group"}
          <RadioGroup {...input} bind:value={input.value} background={input.background === false ? false : true} />
        {/if}

        {#if input.type === "checkbox"}
          <LabeledCheckbox {...input} bind:value={input.value} background={input.background === false ? false : true} />
        {/if}

        {#if input.type === "checkbox-group"}
          <CheckboxGroup {...input} bind:value={input.value} background={input.background === false ? false : true} />
        {/if}

        {#if input.type === "file"}
          <Input {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "camera"}
          <Input {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "p"}
          <p>{@html input.value ?? input.text}</p>
        {/if}

        {#if input.type === "caption"}
          <p class="field__desc">{@html input.value ?? input.text}</p>
        {/if}
      </span>
    {/if}
  {/each}
  <slot />
</div>

<svelte:body on:keydown={keydown} />

<style>
  :global(.form .select) {
    width: 100%;
  }

  :global(.card > .body > .form) {
    padding-top: 2rem;
  }

  :global(.card > .body > .header + .form) {
    padding-top: 0rem;
  }

  :global(.form .style__indent) {
    padding-left: 1.375rem;
    padding-right: 1.375rem;
  }
  .form .form__row__inline.form__row__inline__last__row + .form__row__inline,
  .form .form__row__inline {
    padding-left: 0rem;
    padding-right: 1rem;
  }

  .form .form__row__inline + .form__row__inline {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .form .form__row__inline.form__row__inline__last__row {
    padding-right: 0rem;
    padding-left: 1rem;
  }

  span {
    display: inline-flex;
    width: 100%;
    align-items: center;
    vertical-align: top;
  }

  .field__desc {
    padding: 0.625rem 1.375rem 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.33333;
    color: var(--gray);
  }

  p.field__desc {
    margin-bottom: 0;
  }
</style>
