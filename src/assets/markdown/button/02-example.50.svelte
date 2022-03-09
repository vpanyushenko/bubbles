<script>
  export const width = 50;

  import Row from "$lib/layouts/Row.svelte";
  import Column100 from "$lib/layouts/Column100.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Button from "$lib/components/button/Button.svelte";

  import IconButton from "$lib/components/button/IconButton.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";

  const buttonLoadingDemo = (event) => {
    const id = event.currentTarget.id;

    showLoading(id);

    setTimeout(() => {
      hideLoading(id);
    }, 2000);
  };

  const iconButtonOptions = [
    {
      label: "Option 1",
      caption: "onclick example",
      onclick: (event) => {
        const icon_button_id = event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").id;

        showLoading(icon_button_id);

        setTimeout(() => {
          hideLoading(icon_button_id);
        }, 2000);
      },
    },
    {
      label: "Option 2",
      caption: "href example",
      href: "/#button",
    },
  ];

  const onclick = (event) => {
    //here the click event is the actual button click
    //so we can get the id for the button from the event
    const id = event.currentTarget.id;
    showLoading(id);

    setTimeout(() => {
      hideLoading(id);
    }, 2000);
  };
</script>

<Button mt="1rem" wide={true} label="Primary" color="primary" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Secondary" color="secondary" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Success" color="success" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Error" color="error" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Warning" color="warning" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Info" color="info" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Gray" color="gray" onclick={buttonLoadingDemo} />
<Button mt="1rem" mb="1rem" wide={true} label="Dark" color="dark" onclick={buttonLoadingDemo} />
<br />
<br />
<hr />
<br />
<Button mt="2rem" wide={true} label="Primary" color="primary" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Primary Border" color="primary-border" onclick={buttonLoadingDemo} />
<Button mt="1rem" mb="1rem" wide={true} label="Primary Light" color="primary-light" onclick={buttonLoadingDemo} />
