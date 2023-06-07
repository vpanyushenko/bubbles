<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Form from "$lib/components/form/Form.svelte";
  import { validateInputs, getFormData } from "$lib/utils/form";
  import { showToast } from "$lib/utils/toast";

  const toastExampleFormInputs = [
    {
      type: "radio",
      id: "toast_example_color",
      value: "success",
      label: "Select a toast color",
      options: [
        {
          label: "primary",
          value: "primary",
        },
        {
          label: "secondary",
          value: "secondary",
        },
        {
          label: "error",
          value: "error",
        },
        {
          label: "warning",
          value: "warning",
        },
        {
          label: "success",
          value: "success",
        },
        {
          label: "info",
          value: "info",
        },
        {
          label: "gray",
          value: "gray",
        },
        {
          label: "dark",
          value: "dark",
        },
      ],
    },
    {
      type: "text",
      id: "toast_example_message",
      label: "Toast Message",
      value: "Your settings were successfully updated!",
      error: "Add a message that is at least 3 characters",
      validation: "string|required|min:3",
    },
    {
      type: "submit",
      label: "Show Toast",
      onsubmit: async () => {
        try {
          await validateInputs(toastExampleFormInputs);
          const data = await getFormData(toastExampleFormInputs);
          showToast(data.toast_example_message, data.toast_example_color);
        } catch (error) {
          showToast(error.message);
        }
      },
    },
  ];
</script>

<Card height100={true}>
  <CardHeader title="Toast Example" border={false} />

  <Form inputs={toastExampleFormInputs} />
</Card>
