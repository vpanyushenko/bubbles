<script context="module">
  export const load = async ({ page, fetch, session, context }) => {
    return {
      status: 302,
      redirect: "/examples/pokedex",
    };
  };
</script>
