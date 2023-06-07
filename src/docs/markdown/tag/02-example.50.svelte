<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";

  import Tag from "$lib/components/tag/Tag.svelte";

  let label = "0";
</script>

<Card>
  <CardHeader title="Regular Colors" border={false} />

  <Tag color="primary" margin="1rem 0 1rem 0">primary</Tag>
  <Tag color="secondary" margin="1rem 0 1rem 0">secondary</Tag>
  <Tag color="error" margin="1rem 0 1rem 0">error</Tag>
  <Tag color="warning" margin="1rem 0 1rem 0">warning</Tag>
  <Tag color="success" margin="1rem 0 1rem 0">success</Tag>
  <Tag color="info" margin="1rem 0 1rem 0">info</Tag>
  <Tag color="gray" margin="1rem 0 1rem 0">gray</Tag>
  <Tag color="dark" margin="1rem 0 1rem 0">dark</Tag>
  <Tag color={null} margin="1rem 0 1rem 0">No Color</Tag>
  <Tag color="primary" margin="1rem 0 1rem 0" tooltip="Hello, you can do a tooltip">tooltip</Tag>
  <Tag
    {label}
    margin="1rem 0 1rem 0"
    colors={[
      { label: "OPTIONS", color: "dark" },
      { label: "testing", color: "success" },
      { label: "0", color: "warning" },
    ]}
  />
  <Tag
    color="primary"
    margin="1rem 0 1rem 0"
    tooltip="This one acts link a button"
    onclick={() => alert("You clicked me")}
    onhover={(event) => {
      event.currentTarget.style.backgroundColor = `var(--primary-darker)`;
    }}
    onblur={(event) => {
      event.currentTarget.style.backgroundColor = null;
    }}>Button</Tag
  >
</Card>

<Card>
  <CardHeader title="Light Colors" border={false} />

  <Tag color="primary-lighter" label="primary-lighter" margin="1rem 0 1rem 0" />
  <Tag color="secondary-lighter" label="secondary-lighter" margin="1rem 0 1rem 0" />
  <Tag color="error-lighter" label="error-lighter" margin="1rem 0 1rem 0" />
  <Tag color="warning-lighter" label="warning-lighter" margin="1rem 0 1rem 0" />
  <Tag color="success-lighter" label="success-lighter" margin="1rem 0 1rem 0" />
  <Tag color="info-lighter" label="info-lighter" margin="1rem 0 1rem 0" />
  <Tag color="gray-lighter" label="gray-lighter" margin="1rem 0 1rem 0" />
  <Tag color="dark-lighter" label="dark-lighter" margin="1rem 0 1rem 0" />
</Card>

<Card>
  <CardHeader title="Dark Colors" border={false} />

  <Tag color="primary-darker" label="primary-darker" margin="1rem 0 1rem 0" />
  <Tag color="secondary-darker" label="secondary-darker" margin="1rem 0 1rem 0" />
  <Tag color="error-darker" label="error-darker" margin="1rem 0 1rem 0" />
  <Tag color="warning-darker" label="warning-darker" margin="1rem 0 1rem 0" />
  <Tag color="success-darker" label="success-darker" margin="1rem 0 1rem 0" />
  <Tag color="info-darker" label="info-darker" margin="1rem 0 1rem 0" />
  <Tag color="gray-darker" label="gray-darker" margin="1rem 0 1rem 0" />
  <Tag color="dark-darker" label="dark-darker" margin="1rem 0 1rem 0" />
</Card>

<Card>
  <CardHeader title="Small tags" border={false} />

  <Tag color="primary" margin="1rem 0 1rem 0" small={true}>primary</Tag>
  <Tag color="secondary" margin="1rem 0 1rem 0" small={true}>secondary</Tag>
  <Tag color="error" margin="1rem 0 1rem 0" small={true}>error</Tag>
  <Tag color="warning" margin="1rem 0 1rem 0" small={true}>warning</Tag>
  <Tag color="success" margin="1rem 0 1rem 0" small={true}>success</Tag>
  <Tag color="info" margin="1rem 0 1rem 0" small={true}>info</Tag>
  <Tag color="gray" margin="1rem 0 1rem 0" small={true}>gray</Tag>
  <Tag color="dark" margin="1rem 0 1rem 0" small={true}>dark</Tag>
  <Tag color={null} margin="1rem 0 1rem 0" small={true}>No Color</Tag>
  <Tag color="primary" margin="1rem 0 1rem 0" small={true} tooltip="Hello, you can do a tooltip">tooltip</Tag>
</Card>
