<script>
  import { Header, Card, CardHeader, Column100, Table, TableHeader } from "$lib/index";
</script>

<Column100>
  <Card>
    <CardHeader
      title="Filters"
      filters={[
        {
          id: "location",
          icon: "more",
          options: [
            { label: "All Location", value: null },
            { label: "Location 1", value: "loc1" },
            { label: "Location 2", value: "loc2" },
          ],
        },
        {
          id: "testing",
          options: [
            { label: "All testing", value: null },
            { label: "Testing 1", value: "test1" },
            { label: "Testing 2", value: "test2" },
          ],
        },
      ]}
      buttons={[{ search: true, color: "gray-lighter", icon: "search" }]}
    />
    <Table />
  </Card>
</Column100>
