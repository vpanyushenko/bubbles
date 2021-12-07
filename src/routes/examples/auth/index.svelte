<script context="module">
  export const prerender = true;
</script>

<script>
  import Overlay from "$lib/components/overlay/Overlay.svelte";
  import PageWrapper from "$lib/layouts/PageWrapper.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import Header from "$lib/components/header/Header.svelte";
  import Row from "$lib/layouts/Row.svelte";
  import Center from "$lib/layouts/Center.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
  import { validateInputs, getFormData } from "$lib/utils/form";
  import { showToast } from "$lib/utils/toast";

  const inputs = [
    {
      type: "email",
      id: "email",
      label: "email",
      value: null,
      desc: "Type any valid email. This is just an example, no data is sent anywhere, just a timeout function to simulate a network request",
      validation: "required|email",
      vob: true,
    },
    {
      type: "password",
      id: "password",
      label: "password",
      value: null,
      desc: "The data will be printed to the console",
      validation: "required|string|min:8",
      vob: true,
    },
    {
      type: "submit",
      label: "Submit Form",
      onsubmit: (event) => {
        const errors = validateInputs(inputs).errors; //check for errors

        if (errors.length) {
          showToast("Please fill in all required inputs", "error");
          return;
        }

        const data = getFormData(inputs);

        //the onsubmit and onclick function on buttons, will give you the event param
        //if you want to toggle the loading state on your button while doing a networking request
        //just use showLoading() and pass in the id
        //An id will automatically be assigned to the button for you

        const button_id = event.currentTarget.id;
        showLoading(button_id);

        console.table(data);

        setTimeout(() => {
          hideLoading(button_id);
        }, 2000);
      },
    },
    {
      type: "button",
      label: "Go Back",
      color: "info-light",
      href: "/examples/pokedex",
    },
  ];
</script>

<Header title="Auth" breadcrumbs={false} />

<Overlay solid={true}>
  <PageWrapper>
    <Center>
      <Row>
        <Column100>
          <Card>
            <CardHeader title="Sign in with email and password" border={false} />
            <Form {inputs} />
          </Card>
        </Column100>
      </Row>
    </Center>
  </PageWrapper>
</Overlay>
