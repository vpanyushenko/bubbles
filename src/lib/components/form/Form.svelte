<!--
  @component

  ## Create a Form with validation.

  Bubbles makes forms practicle, but if this use case does not fit your needs, you can create your own form elements.

  ---
  #### Concept

  Your form data is probably a mix of some JS Objects / JSON and an inital fetch request to get existing data from your users. As a result, Bubbles uses an array of objects to create your form.
  Basically, to use forms, you'll pass in your objects indicating the type of input. One of your button inputs, whichever you choose to be your submit button will have an `onsubmit` handler that
  will deal with your form submission. Bubbles provides two utility functions called `getFormData`, which will give you an Object of your data and `validateInputs` which will validate the inputs
  based on the validation params that you supply. 

  > Make Sure You Include A Button With A `type="submit"`

  ---
  #### Inputs

  
  The `<Form>` component takes just one property called inputs, which expects an array of objects that describe the inputs you want. The examples below will go over all of the possible inputs. 
  
  ---

  #### Example

  ```js
  
  const inputs = [
    {
      type: "text", //will render a text input field. Other options are: "email" and "password" which are all basically the same thing
      id: "name", //the id will be the key when you call the getFormData function. If you add a "." in the id, it will return the item as a nested object. For example, if your `id` value is `name.last`, the getFormData function will return that as {name: {last: ""}}
      label: "Your Label", //The label is what we'll initally show for the input, it should explain what is required. Keep this short like "First Name"
      value: null, //You can add a value to the input
      desc: "You'll be able to change this name later", //This will add text below the input to explain in more detail what is needed from the user. Optional.
      error: "A name is required", //this is the text that will appear if this input fails validation
      validation: "string|required|min:3", // See the validation section for more details, but this adds what validation you need. In This case, it must be a string, it's required, with a min length of 3
      validate_on_blur: true //defaults to true. Will run validation when focus is lost from the element
      vob: true //defaults to true. Alias validation_on_blur just less to type. You only need to set one.
    },
    {
      type: "number", //Will ensure that getFormData will return this as a number
      id: "age", 
      label: "Age", 
      value: null, //You can add a value to the input
      desc: null,
      error: "You must be at least 13 years old", 
      validation: "numeric|required|min:13", 
      bounds: [0, 120]: //Set the min and max values for this input. If you only want the min or max, you can do something like: [0, null]
    },
    {
      type: "date",
      id: "dob", 
      label: "Date Of Birth", 
      value: null, //You can add a value to the input
      desc: null
      error: "Add your Date of Birth", 
      validation: "required|date", //date validator is built in
    },
    {
      type: "select",
      id: "role", 
      label: "Select Your Role", 
      value: null, //You can add a value to the input
      desc: null,
      error: "Your role is required", 
      validation: "required", //since you're adding the options, you can just set it to required
      search: false //By default, if your select has more than 5 options, it will turn on fuzzy search unles you explictly turn it off
      //an array of options for your input
      options: [
        {
          label: "Owner" //The label is the main option the user is picking,
          caption: "This is the highest position" //This is optional to add more context to the option,
          value: "owner" //This is the actual value the user is selecting
        },
        "break", //if you pass a string that says break, Bubbles will add a line break between these options for you
        {
          label: "Collaborator" //The label is the main option the user is picking,
          value: "collab" //This is the actual value the user is selecting
        },
        {
          label: "User",
          value: "user"
        }
      ]
    },
    {
      type: "select-number", //This is a special type of select in case you need to select only from number elements. Use this if all values in a select need to be numbers
      id: "number", 
      label: "Select Your Number", 
      value: null, //You can add a value to the input
      desc: null,
      error: "This is required", 
      validation: "required", //since you're adding the options, you can just set it to required
      search: false, //By default, if your select has more than 5 options, it will turn on fuzzy search unles you explictly turn it off
      //an array of options for your input
      options: [
        {
          label: "One", //The label is the main option the user is picking,
          value: 0, //This is the actual value the user is selecting
        },
        {
          label: "Two", //The label is the main option the user is picking,
          value: 1, //This is the actual value the user is selecting
        },
        {
          label: "Three",
          value: 3,
        }
      ]
    },
    {
      type: "submit", //The form must have a submit button
      label: "Submit Form" //The label for the submit button,
      onsubmit: () => {
        //you can also use the onclick, if it's on a submit button Bubbles will look for the onsubmit event
        import {validateInputs, getFormData, showToast} from "bubbles" //You should do this at the top of your file

        const errors = validateInputs(inputs) //this will automatically trigger error states

        if (errors.length) {
          showToast("Please fill in all required inputs", "error")
          return
        }

        const data = getFormData(inputs)

        //do the fetch request with your data

      }

    },
  ]

  ```

  ---
  #### Validation

  The following validation properties are availble. You'll pass them all as a string seperated by a pipe "|"

  - required - Makes the field required
  - boolean - The field must be a boolean
  - string - The field must be a string
  - min - will be entered like min:5 which will make the field need a minimum value. If a number, will make sure it's not less than the provided value. If the value is a string, will make sure the length is greater then the min value
  - max - same as min just the sets the max value
  - email - the field must be an email
  - numeric - the field must be number. Will accept a string if the characters are numeric
  - array - value must be an array,
  - url - value must be a url,
  - alpha - value must only be letters
  - alpha_dash - value must be only letter and/or dashes
  - alpha_num - value must be only alphanumeric characters (no emojies),
  - accepted - the value must be accepted ("on", "yes", 1, "1", true)
  - integer - the value must be an integer
  - regex - the value must match a regex you provide. Entered like this: regex:/^(19|20)[\\d]{2,2}$/
  - date - the value must be a date string

  ---

  #### Utility Functions

  There are two utility functions you can import from Bubbles: `getFormData` and `validateInputs`. Sicne you've passed in an array of inputs to the `<Form>` component, you can use the and array for these functions since input value will be bound to it. 
  Best practice with Bubbles to to create a input with a `type` of "sumbit" and give it an `onsubmit` function. This function will be called when the submit button is clicked or the Enter button is used. 
  Normally, you'll want to verify the data first, then get the data, then do whatever networking requests you need.

  ---

-->
<script>
  import { v4 as uuid } from "@lukeed/uuid";
  import Switch from "$lib/components/switch/LabeledSwitch.svelte";
  import Input from "$lib/components/input/Input.svelte";
  import Select from "$lib/components/select/Select.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import Divider from "$lib/components/divider/Divider.svelte";

  export let inputs = [];
  export let id = uuid();

  const submitButton = inputs.find((a) => a.type === "submit");

  if (submitButton && !submitButton.id) {
    submitButton.id = `form_btn_${id}`;
  }

  function keydown(event) {
    if (event.key === "Enter" && document.activeElement.closest(".form")) {
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
</script>

<div class="form" {id}>
  {#each inputs as input}
    {#if !input.hidden}
      <span class="row">
        {#if input.type === "text" || input.type === "email" || input.type === "password" || input.type === "date" || input.type === "number"}
          <Input {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "switch"}
          <Switch {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "select" || input.type === "select-number"}
          <Select {...input} bind:value={input.value} />
        {/if}

        {#if input.type === "button"}
          <Button {...input} />
        {:else if input.type === "submit"}
          <Button {...input} />
        {/if}

        {#if input.type === "divider"}
          <Divider {...input} />
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
  span {
    display: flex;
    width: 100%;
    align-items: center;
  }
</style>
