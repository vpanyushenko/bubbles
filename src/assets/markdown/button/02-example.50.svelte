<script>
  import Button from "$lib/components/button/Button.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";

  const buttonLoadingDemo = (event) => {
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
