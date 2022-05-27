<script>
  import Overlay from "$lib/components/overlay/Overlay.svelte";
  import Center from "$lib/layouts/Center.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import { pageStore } from "$lib/utils/stores";

  export let title = "";
  export let message = "";
  export let code = 404;
  export let button = null;
  export let img = null;

  switch (code) {
    case 400: {
      if (!title) title = "Bad Request";
      if (!message) message = "This page request could not be fulfilled. Try refreshing the page.";
      break;
    }
    case 401: {
      if (!title) title = "Unauthorized";
      if (!message) message = "You don't have access to this page.";
      break;
    }
    case 402: {
      if (!title) title = "Payment Required";
      if (!message) message = "A payment is required for this page.";
      break;
    }
    case 403: {
      if (!title) title = "Forbidden";
      if (!message) message = "You don't have permission to view this page.";
      break;
    }
    case 404: {
      if (!title) title = "Not Found";
      if (!message) message = "The page you tried to access can't be found. Make sure the URL is correct.";
      break;
    }
    case 500: {
      if (!title) title = "Server Error";
      if (!message)
        message =
          "There was an issue with the response received from the server. If refreshing or trying the request again doesn't solve the problem, you found a bug!";
      break;
    }
    case 501: {
      if (!title) title = "Not Implemented";
      if (!message)
        message =
          "There was a server error. This error will most likely only be solved by contacting support. Sorry about that.";
      break;
    }
    case 502: {
      if (!title) title = "Bad Gateway";
      if (!message)
        message =
          "There was a server error. If refreshing or trying the request again doesn't solve the problem, you found a bug!";
      break;
    }
    case 503: {
      if (!title) title = "Out of Resources";
      if (!message)
        message =
          "The server is overloaded with requests and cannot process yours right now. Please try again in a few minutes.";
      break;
    }
    case 504: {
      if (!title) title = "Gateway Time-Out";
      if (!message) message = "A server error occurred. Please try the request again.";
      break;
    }
    default: {
      if (!code) code = 500;
      if (!title) title = "Server Error";
      if (!message)
        message =
          "There was an issue with the response received from the server. If refreshing or trying the request again doesn't solve the problem, you found a bug!";
    }
  }

  $pageStore.title = title;
</script>

<Overlay background="solid">
  <Center>
    {#if img}
      <picture>
        <img src={img} alt="Error" />
      </picture>
    {/if}

    <h2>{code}: {title}</h2>
    <h5>{message}</h5>
    {#if button}
      <Button {...button} onclick={() => (window.location.href = button.href || "/")} />
    {:else}
      <Button mt={true} label="Go Back" onclick={() => (window.location.href = "/")} />
    {/if}
  </Center>
</Overlay>

<style>
  picture {
    max-width: 30rem;
    margin-bottom: 3rem;
  }

  h5 {
    text-align: center;
  }
</style>
