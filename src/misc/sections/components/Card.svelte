<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./card.md";
  import CodeCard2 from "./card-header.md";
  import CodeCard3 from "./card-footer.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import { showModal } from "$lib/utils/modal";
</script>

<Section id="card" title="Card">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card" border={false} />
        <p>
          These are the sections that make up your application. All of the outlined and dark code sections of this
          knowledgebase are made of cards.
        </p>
        <p>
          The card will take some properties to figure out it's visual appearance. The main content of the <code
            >Card</code
          >
          typically a <code>Form</code> or <code>Table</code> will be added as a
          <code>slot</code> into the card.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell>This is the background color of the card. It defaults to <code>white</code>.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">border</span></TableCell>
            <TableCell>If you want the card to have a border. It defaults to <code>false</code>.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">shadow</span></TableCell>
            <TableCell
              >The shadow behind the card. You can't specify the shadow right now, just if you want it or not. It
              defaults to <code>true</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">height100</span></TableCell>
            <TableCell
              >Makes the card height 100% of the row it's in. This is useful for when you have two columns and there are
              two tows side by side. It defaults to <code>false</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">px</span></TableCell>
            <TableCell
              >The horisontal padding on the card in <code>rem</code> values. It defaults to
              <code>0.065</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">py</span></TableCell>
            <TableCell
              >The vertical padding on the card in <code>rem</code> values. It defaults to <code>2</code>.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">header</span></TableCell>
            <TableCell
              >You are able to set the card header as a prop instead of adding it as a component into the slot. See the
              example for how this works, but this is useful if you're adding dynamic cards to the page.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">footer</span></TableCell>
            <TableCell
              >You are able to set the card footer as a prop instead of adding it as a component into the slot. See the
              example for how this works, but this is useful if you're adding dynamic cards to the page.</TableCell
            >
          </TableRow>
        </Table>
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
        <p class="d-flex">This is a basic card with just text inside. You can slot whatever content you want inside</p>
      </Card>

      <Card border={true} shadow={false}>
        <p class="d-flex">This is a card with a border and no shadow</p>
      </Card>

      <Card border={true} shadow={false} color={"primary"}>
        <p class="d-flex" style="color: white">This is a card with a color property of primary and no border.</p>
      </Card>
    </Column50>
  </Row>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card Header" border={false} />
        <p>
          The <code>CardHeader</code> is fixed to the top of the card and will contain things like the title, action buttons,
          and filters.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">title</span></TableCell>
            <TableCell
              >The main prop that you will usually include in your card. This will be the title that describes the
              content of the card.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">caption</span></TableCell>
            <TableCell
              >if you need more details for your title, you can include a caption, which will display smaller text below
              the title. Captions load data as html, so you can add an anchor tag with an <code>href</code> and it will render
              the link correctly.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">border</span></TableCell>
            <TableCell
              >By default, the header has a bottom border to divide it from the rest of the content. This can be added
              by passing <code>true</code> to this property.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">center</span></TableCell>
            <TableCell
              >Decides if the header should be centered. It's advised to only use this if you are not using filers or
              buttons.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">buttons</span></TableCell>
            <TableCell
              >Buttons are an array of <code>IconButton</code>s that will show up on the right side of the header.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">filters</span></TableCell>
            <TableCell
              >An array of filters that should be used if you have a <code>Table</code> inside of you card and want to
              filter the data. The Filters are a special type of <code>Select</code> that will modify urls query params,
              which will cause Svelte to refetch the data required.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>
  <Row>
    <Column50>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard2 />
      </Card>
    </Column50>
    <Column50>
      <Card>
        <CardHeader title="Title" caption="Learn more <a href='https://google.com'>here</a>." />
        <div class="d-flex">This is a card header</div>
      </Card>

      <Card>
        <CardHeader
          title="Header With Buttons"
          buttons={[
            {
              icon: "edit",
              href: "/#cards",
            },
            {
              icon: "more",
              options: [
                {
                  label: "Contact Support",
                  href: "/#cards",
                },
                {
                  label: "Delete Account",
                  onclick: () => {
                    showModal("Delete Account");
                  },
                },
              ],
            },
          ]}
        />
        <div class="d-flex">This is a card header with buttons</div>
      </Card>

      <Card>
        <CardHeader
          filters={[
            {
              id: "filter",
              label: "Filter",
              options: [
                {
                  label: "Filter 1",
                  value: "filter1",
                  caption: "Most popular",
                },
                "break",
                {
                  label: "Filter 2",
                  value: "filter2",
                },
                {
                  label: "Filter 3",
                  value: "filter3",
                },
              ],
            },
          ]}
        />
        <span class="d-flex">
          This is a card header with filters. The filters will update page query params which will make Svelte fetch new
          data. You can also pass your own logic for the filter by adding a function to the onselect property for the
          filter options.
        </span>
      </Card>
    </Column50>
  </Row>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Card Footer" border={false} />
        <p>
          The <code>CardFooter</code> is fixed to the bottom of the card and will contain pagination if required. View
          details in the <code>Table</code> section.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">pagination</span></TableCell>
            <TableCell
              >Will add the <code>Pagination</code> component. Useful if you have Table component slotted in the Card.</TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
    <Column>
      <Card color="dark" px={0} py={0} height100={true}>
        <CodeCard3 />
      </Card>
    </Column>
  </Row>
</Section>

<style>
  p {
    margin-top: 1rem;
  }
</style>
