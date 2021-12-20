<script>
  import { dev } from "$app/env";
  import { scale, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { v4 as uuid } from "@lukeed/uuid";
  import { pageStore } from "$lib/stores/stores";
  import Switch from "$lib/components/switch/LabeledSwitch.svelte";
  import Input from "$lib/components/input/Input.svelte";
  import StripeCardInput from "$lib/components/stripe/StripeCardInput.svelte";
  import Select from "$lib/components/select/Select.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import Divider from "$lib/components/divider/Divider.svelte";
  import RadioGroup from "$lib/components/radio/RadioGroup.svelte";
  import LabeledCheckbox from "$lib/components/checkbox/LabeledCheckbox.svelte";
  import CheckboxGroup from "$lib/components/checkbox/CheckboxGroup.svelte";
  import { onMount } from "svelte";

  export let inputs = [];
  export let id = uuid();

  const submitButton = inputs.find((a) => a.type === "submit");

  if (submitButton && !submitButton.id) {
    submitButton.id = `form_btn_${id}`;
  }

  function keydown(event) {
    if (
      event.key === "Enter" &&
      document.activeElement.closest(".form") &&
      !event.defaultPrevented &&
      !document.activeElement.classList.contains("select")
    ) {
      if (
        document.activeElement.closest(".form").id === id ||
        document.activeElement.closest(".form").id === `form_btn_${id}`
      ) {
        const submitButton = inputs.find((a) => a.type === "submit");
        const buttonElement = document.getElementById(submitButton.id);

        if (submitButton && buttonElement) {
          buttonElement.click();
        }
      }
    }
  }

  //determine if any inputs are dependent on other inputs
  $: formatted_inputs = formatInputs(inputs);

  function formatInputs(inputs) {
    return inputs.map((input) => {
      if (dev && input?.hidden_if && input.hidden_if.length && input?.hidden_unless && input.hidden_unless.length) {
        console.log("There may negative side effects when using both hidden_if and hidden_unless on the same input");
      }

      if (!input.hidden_if) {
        input.hidden_if = [];
      }

      if (!input.hidden_unless) {
        input.hidden_unless = [];
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

      return input;
    });
  }

  // onMount(() => {
  //   const ro = new ResizeObserver((entries) => {
  //     for (let entry of entries) {
  //       const cr = entry.contentRect;
  //       console.log(`Element size: ${cr.width}px x ${cr.height}px`);
  //     }
  //   });

  //   const testing = document.getElementById(id);

  //   console.log(testing);

  //   // Observe one or multiple elements
  //   ro.observe(testing);
  // });
</script>

<div class="form" {id}>
  {#each formatted_inputs as input}
    {#if !input.is_hidden}
      <span
        class="row"
        in:scale={{
          duration: 750,
          opacity: 0,
          start: 0.5,
          easing: quintOut,
        }}
        out:scale={{
          duration: 750,
          opacity: 0,
          start: 0,
          easing: quintOut,
        }}
      >
        {#if input.type === "text" || input.type === "email" || input.type === "password" || input.type === "date" || input.type === "number" || input.type === "textarea" || input.type === "tel" || input.type === "phone"}
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
          <Switch {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "select" || input.type === "select-number"}
          <Select {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "button"}
          <Button {...input} wide={true} />
        {:else if input.type === "submit"}
          <Button {...input} wide={true} />
        {/if}

        {#if input.type === "divider"}
          <Divider {...input} />
        {/if}

        {#if input.type === "radio" || input.type === "radio-group"}
          <RadioGroup {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "checkbox"}
          <LabeledCheckbox {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "checkbox-group"}
          <CheckboxGroup {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "p"}
          <p>{input.value}</p>
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

  :global(.form .style__indent) {
    padding-left: 1.375rem;
    padding-right: 1.375rem;
  }
  span {
    display: flex;
    width: 100%;
    align-items: center;
  }
</style>
