<script context="module">
  export const load = async ({ url, params, fetch, session, context }) => {
    return {
      status: 302,
      redirect: "/examples/pokedex",
    };
  };
</script>
