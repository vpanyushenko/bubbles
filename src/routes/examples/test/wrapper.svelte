<script>
  import Section from "$misc/components/section.svelte";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Form from "$lib/components/form/Form.svelte";
  import { validateInputs, getFormData } from "$lib/utils/form";
  import { showLoading, hideLoading } from "$lib/utils/loading";
  import { showToast } from "$lib/utils/toast";
  import Header from "$lib/components/header/Header.svelte";
</script>

<Header title="TITLE" buttons={[{ icon: "more" }]} />

<Row>
  <Column>
    <Card>
      <p>Test</p>
    </Card>
  </Column>
  <Column>
    <Card>
      <p>Test</p>
    </Card>
  </Column>
</Row>
