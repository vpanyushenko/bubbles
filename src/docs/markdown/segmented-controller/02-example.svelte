<script>
  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";

  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import SegmentedController from "$lib/components/segmented-controller/SegmentedController.svelte";

  let active = "1";
  let line_active = "1";
</script>

<Row>
  <Column>
    <SegmentedController
      mb="2"
      segments={[
        {
          label: "Section 1",
          onclick: (event) => {
            active = "1";
          },
        },
        {
          label: "The Second Section",
          onclick: () => {
            active = "2";
          },
        },
        {
          label: "Section 3",
          onclick: () => {
            active = "3";
          },
          tag: { label: 99, color: "error" },
        },
      ]}
    />
    <div class:hidden={active !== "1"}>
      <Card>
        <CardHeader title="Section 1" border={false} />
      </Card>
    </div>

    <div class:hidden={active !== "2"}>
      <Card>
        <CardHeader title="Section 2" border={false} />
      </Card>
    </div>

    <div class:hidden={active !== "3"}>
      <Card>
        <CardHeader title="Section 3" border={false} />
      </Card>
    </div>

    <div class="mt-2">
      <SegmentedController
        mb="2"
        style="line"
        segments={[
          {
            label: "Section 1",
            onclick: (event) => {
              line_active = "1";
            },
          },
          {
            label: "Section 2",
            onclick: () => {
              line_active = "2";
            },
          },
          {
            label: "Section Three Long",
            onclick: () => {
              line_active = "3";
            },
          },
          {
            label: "Section 4",
            onclick: () => {
              line_active = "4";
            },
          },
          {
            label: "Section 5",
            onclick: () => {
              line_active = "5";
            },
          },
          {
            label: "Section 6",
            onclick: () => {
              line_active = "6";
            },
          },
        ]}
      />
    </div>

    <div class:hidden={line_active !== "1"}>
      <Card>
        <CardHeader title="Line Style Section 1" border={false} />
      </Card>
    </div>

    <div class:hidden={line_active !== "2"}>
      <Card>
        <CardHeader title="Line Style Section 2" border={false} />
      </Card>
    </div>

    <div class:hidden={line_active !== "3"}>
      <Card>
        <CardHeader title="Line Style Section 3" border={false} />
      </Card>
    </div>

    <div class:hidden={line_active !== "4"}>
      <Card>
        <CardHeader title="Line Style Section 4" border={false} />
      </Card>
    </div>

    <div class:hidden={line_active !== "5"}>
      <Card>
        <CardHeader title="Line Style Section 5" border={false} />
      </Card>
    </div>

    <div class:hidden={line_active !== "6"}>
      <Card>
        <CardHeader title="Line Style Section 6" border={false} />
      </Card>
    </div>
  </Column>
</Row>
