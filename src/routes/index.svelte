<script context="module">
  export async function load({ page, fetch, session, stuff }) {
    //initially there isn't a query param in the url so we can set the limit to whatever the default value of the pagination will be
    const limit = page.query.get("limit") ? page.query.get("limit") : 10;

    //same process with the page, since if the page is undefined the user is on the first one
    const _page = page.query.get("page") ? Number(page.query.get("page")) : 1;

    //this api needs an offset number we we can calc it using the page and limit
    const offset = Number(limit) * (_page - 1);

    const pagination = {
      limit: Number(limit),
      page: _page,
      offset: Number(page.query.get("limit")) * (Number(page.query.get("page")) - 1),
      count: null,
      first_last_arrow: true,
    };

    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // pagination.has_more = res.next ? true : false;
        pagination.count = res.count;

        const pokemon = res.results.map((poke) => {
          return fetch(poke.url)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              return res;
            });
        });

        return Promise.all(pokemon);
      })
      .then((pokemon) => {
        return {
          props: {
            pokemon: pokemon,
            pagination: pagination,
          },
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }
</script>

<script>
  import store from "$misc/store";

  import Header from "$lib/components/header/Header.svelte";
  import Scroller from "@sveltejs/svelte-scroller";

  import GSIntro from "$misc/sections/getting-started/01-intro.svelte";
  import GSInstallation from "$misc/sections/getting-started/02-installation.svelte";
  import GSUsage from "$misc/sections/getting-started/03-usage.svelte";
  import GSColors from "$misc/sections/getting-started/04-colors.svelte";
  import GSErrors from "$misc/sections/getting-started/05-errors.svelte";

  import LPageWrapper from "$misc/sections/layouts/01-page-wrapper.svelte";
  import LPageRow from "$misc/sections/layouts/02-page-row.svelte";
  import LPageColumn from "$misc/sections/layouts/03-page-column.svelte";
  import LPageGrid from "$misc/sections/layouts/04-page-grid.svelte";
  import LPageCenter from "$misc/sections/layouts/05-page-center.svelte";

  import CButton from "$misc/sections/components/Button.svelte";
  import CCard from "$misc/sections/components/Card.svelte";
  import CCheckbox from "$misc/sections/components/Checkbox.svelte";
  import CDivider from "$misc/sections/components/Divider.svelte";
  import CError from "$misc/sections/components/Error.svelte";
  import CForm from "$misc/sections/components/Form.svelte";
  import CHeader from "$misc/sections/components/Header.svelte";
  import CInput from "$misc/sections/components/Input.svelte";
  import CList from "$misc/sections/components/List.svelte";
  import CModal from "$misc/sections/components/Modal.svelte";
  import COverlay from "$misc/sections/components/Overlay.svelte";
  import CPagination from "$misc/sections/components/Pagination.svelte";
  import CRadio from "$misc/sections/components/Radio.svelte";
  import CSegmentedController from "$misc/sections/components/SegmentedController.svelte";
  import CSelect from "$misc/sections/components/Select.svelte";
  import CSidebar from "$misc/sections/components/Sidebar.svelte";
  import CSpinner from "$misc/sections/components/Spinner.svelte";
  import CSwitch from "$misc/sections/components/Switch.svelte";
  import CSTable from "$misc/sections/components/Table.svelte";
  import CTag from "$misc/sections/components/Tag.svelte";
  import CToast from "$misc/sections/components/Toast.svelte";

  import U_ValidateInputs from "$misc/sections/utils/validate-inputs.svelte";
  import U_GetFormData from "$misc/sections/utils/get-form-data.svelte";
  import U_ShowLoading from "$misc/sections/utils/show-loading.svelte";
  import U_HideLoading from "$misc/sections/utils/hide-loading.svelte";
  import U_ShowToast from "$misc/sections/utils/show-toast.svelte";
  import U_ShowModal from "$misc/sections/utils/show-modal.svelte";
  import U_HideModal from "$misc/sections/utils/hide-modal.svelte";

  export let pokemon = [];
  export let pagination = {};

  let y;

  $: _pokemon = pokemon;
  $: _pagination = pagination;

  $: if (_pokemon) {
    $store.pokemon = _pokemon;
    $store.pagination = _pagination;
  }

  $: if (y === 0) {
    $store.sidebar_index = 0;
  }
</script>

<svelte:head>
  <title>Bubbles UI Kit</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<Header
  title="Welcome"
  buttons={[
    {
      icon: "more",
      transparent: false,
      options: [
        {
          label: "Changelog",
          href: "/changelog",
          new_page: true,
        },
        {
          label: "Examples",
          caption: "Tables, Auth, Errors, etc",
          href: "/examples",
          new_page: true,
        },
      ],
    },
  ]}
/>
<Scroller bind:index={$store.sidebar_index} top={0.2} bottom={0.8} query=".scroller">
  <div slot="background" class="bg" />

  <div slot="foreground">
    <GSIntro />
    <GSInstallation />
    <GSUsage />
    <GSColors />
    <GSErrors />

    <LPageWrapper />
    <LPageRow />
    <LPageColumn />
    <LPageGrid />
    <LPageCenter />

    <CButton />
    <CCard />
    <CCheckbox />
    <CDivider />
    <CError />
    <CForm />
    <CHeader />
    <CInput />
    <CList />
    <CModal />
    <COverlay />
    <CPagination />
    <CRadio />
    <CSegmentedController />
    <CSelect />
    <CSidebar />
    <CSpinner />
    <CSwitch />
    <CSTable />
    <CTag />
    <CToast />

    <U_ValidateInputs />
    <U_GetFormData />
    <U_ShowLoading />
    <U_HideLoading />
    <U_ShowToast />
    <U_ShowModal />
    <U_HideModal />
  </div>
</Scroller>

<style>
  :global(p) {
    margin-bottom: 1rem;
  }
</style>
