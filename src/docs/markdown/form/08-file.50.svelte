<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import FileForm from "$lib/components/form/FileForm.svelte";

  const options = {
    button: {
      label: "Upload Image",
      color: "primary",
    },
    endpoint: "https://google.com",
    fetch_options: {
      method: "GET",
      credentials: "include",
    },
    toast: false,
    src: "",
  };
</script>

<Card height100={true}>
  <CardHeader title="Demo" border={false} />
  <FileForm {...options} />
</Card>
