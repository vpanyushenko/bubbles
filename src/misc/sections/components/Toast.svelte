<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./toast.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

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
      vob: true,
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

<Section id="toast" title="Toast">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Toast Container" border={false} />
        <p>
          The <code>ToastContainer</code> makes it easy to include <code>Toast</code>s in your app. Include the
          container in you <code>__layout.svelte</code> file, and then use the utility function
          <code>showToast</code> to add toasts to the page.
        </p>
        <p>The container has no properties and will already show toasts at the top right of the screen.</p>
      </Card>
    </Column>

    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          The toast is used to notify a user that some action took place. It's shown above all content and will persist
          a page navigation.
        </p>
        <p>The toasts can be dismissed by the user or will just gracefully fade away.</p>
        <p>
          Because toast messages can be initiated from just about any page or component, Bubbles recommends adding the <code
            >ToastContainer</code
          >
          component on the <code>__layout.svelte</code> page, and adding new toasts using the <code>showToast</code> utility
          function.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">message</span></TableCell>
            <TableCell>The text that the user will see.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >The color toast that you want to show. By default, the toast is "error" color, but another good option is
              "success"</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>

  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard1 />
      </Card>
    </Column50>

    <Column50>
      <Card>
        <CardHeader title="Toast Example" border={false} />

        <Form inputs={toastExampleFormInputs} />
      </Card>
    </Column50>
  </Row>
</Section>
