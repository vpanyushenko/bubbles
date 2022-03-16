<script context="module">
  export async function load({ url, params, fetch, session, stuff }) {
    //initially there isn't a query param in the url so we can set the limit to whatever the default value of the pagination will be
    const limit = url.searchParams.get("limit") ? url.searchParams.get("limit") : 10;

    //same process with the page, since if the page is undefined the user is on the first one
    const _page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;

    //this api needs an offset number we we can calc it using the page and limit
    const offset = Number(limit) * (_page - 1);

    const pagination = {
      limit: Number(limit),
      page: _page,
      offset: Number(url.searchParams.get("limit")) * (Number(url.searchParams.get("page")) - 1),
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
  import store from "src/__misc/store";

  import Header from "$lib/components/header/Header.svelte";
  import Scroller from "@sveltejs/svelte-scroller";

  //const GSWarning = await import("$misc/sections/getting-started/00-warning.svelte");

  import GSWarning from "src/__misc/sections/getting-started/00-warning.svelte";
  import GSIntro from "src/__misc/sections/getting-started/01-intro.svelte";
  import GSInstallation from "src/__misc/sections/getting-started/02-installation.svelte";
  import GSUsage from "src/__misc/sections/getting-started/03-usage.svelte";
  import GSColors from "src/__misc/sections/getting-started/04-colors.svelte";
  import GSErrors from "src/__misc/sections/getting-started/05-errors.svelte";

  import LPageWrapper from "src/__misc/sections/layouts/01-page-wrapper.svelte";
  import LPageRow from "src/__misc/sections/layouts/02-page-row.svelte";
  import LPageColumn from "src/__misc/sections/layouts/03-page-column.svelte";
  import LPageGrid from "src/__misc/sections/layouts/04-page-grid.svelte";
  import LPageCenter from "src/__misc/sections/layouts/05-page-center.svelte";

  import CButton from "src/__misc/sections/components/Button.svelte";
  import CCard from "src/__misc/sections/components/Card.svelte";
  import CCheckbox from "src/__misc/sections/components/Checkbox.svelte";
  import CDivider from "src/__misc/sections/components/Divider.svelte";
  import CError from "src/__misc/sections/components/Error.svelte";
  import CForm from "src/__misc/sections/components/Form.svelte";
  import CHeader from "src/__misc/sections/components/Header.svelte";
  import CInput from "src/__misc/sections/components/Input.svelte";
  import CList from "src/__misc/sections/components/List.svelte";
  import CModal from "src/__misc/sections/components/Modal.svelte";
  import COverlay from "src/__misc/sections/components/Overlay.svelte";
  import CPagination from "src/__misc/sections/components/Pagination.svelte";
  import CRadio from "src/__misc/sections/components/Radio.svelte";
  import CSegmentedController from "src/__misc/sections/components/SegmentedController.svelte";
  import CSelect from "src/__misc/sections/components/Select.svelte";
  import CSidebar from "src/__misc/sections/components/Sidebar.svelte";
  import CSpinner from "src/__misc/sections/components/Spinner.svelte";
  import CSwitch from "src/__misc/sections/components/Switch.svelte";
  import CSTable from "src/__misc/sections/components/Table.svelte";
  import CTag from "src/__misc/sections/components/Tag.svelte";
  import CToast from "src/__misc/sections/components/Toast.svelte";

  import U_ValidateInputs from "src/__misc/sections/utils/validate-inputs.svelte";
  import U_GetFormData from "src/__misc/sections/utils/get-form-data.svelte";
  import U_ShowLoading from "src/__misc/sections/utils/show-loading.svelte";
  import U_HideLoading from "src/__misc/sections/utils/hide-loading.svelte";
  import U_ShowToast from "src/__misc/sections/utils/show-toast.svelte";
  import U_ShowModal from "src/__misc/sections/utils/show-modal.svelte";
  import U_HideModal from "src/__misc/sections/utils/hide-modal.svelte";

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
      color: "gray-lighter",
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
    <GSWarning />
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
