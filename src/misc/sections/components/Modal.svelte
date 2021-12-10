<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./modal.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Button from "$lib/components/button/Button.svelte";
  import { showModal, hideModal } from "$lib/utils/modal";
</script>

<Section id="modal" title="Modal">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          A Modal is basically a card that will sit on top of all content. It should only be used for actions that to
          user needs to take right now.
        </p>

        <p>
          Modals are set programmatically. Add the <code>Modal</code> component to your <code>__layout.svelte</code>
          file, and then use the helper functions <code>showModal</code> to bring up the modal. The
          <code>showModal</code>
          function will add the required components to a the <code>modalStore</code>. You can also programmatically hide
          the modal using the <code>hideModal</code> function.
        </p>

        <p>Generally, your modal will display a form or a message to the user with some buttons.</p>
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
        <CardHeader title="Modal Demos" border={false} />

        <Button
          label="Message Modal"
          wide={true}
          mb={true}
          onclick={() =>
            showModal("Message Modal", {
              img: "/favicon.png",
              message: "This is a message modal. Good for things like confirming an un-doable action for the user",
              footer: [
                {
                  label: "Close Modal",
                  color: "gray-light",
                  onclick: () => {
                    hideModal();
                  },
                },
              ],
            })}
        />

        <Button
          label="Form Modal"
          wide={true}
          mb={true}
          onclick={() =>
            showModal("Form Modal", {
              message:
                "This is a form modal. It can have a message option too! Just add Form details just like you would with any other form. You can include the submit buttons in the form, which will cause them to not be locked at the bottom. Or you can include the submit buttons in the footer, which will cause the buttons to be sticky at the bottom of the modal.",
              form: [
                {
                  type: "text",
                  id: "name",
                  label: "Name",
                  error: "An error occurred",
                  vob: "true",
                  validation: "required|string",
                },
                {
                  type: "button",
                  label: "Submit",
                  onsubmit: () => {
                    hideModal();
                  },
                },
              ],
            })}
        />
      </Card>
    </Column50>
  </Row>
</Section>
