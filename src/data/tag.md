---
component: tag
---

```svelte
<script>
  //Tag contents can be set with a label prop or just adding the content into the tag slot
  import { Tag } from "bubbles-ui";
</script>

<Card>
  <CardHeader title="Regular Colors" border={false} />
  <div class="margin">
    <Tag color="primary" margin="1rem 0 1rem 0">primary</Tag>
    <Tag color="secondary" margin="1rem 0 1rem 0">secondary</Tag>
    <Tag color="error" margin="1rem 0 1rem 0">error</Tag>
    <Tag color="warning" margin="1rem 0 1rem 0">warning</Tag>
    <Tag color="success" margin="1rem 0 1rem 0">success</Tag>
    <Tag color="info" margin="1rem 0 1rem 0">info</Tag>
    <Tag color="gray" margin="1rem 0 1rem 0">gray</Tag>
    <Tag color="dark" margin="1rem 0 1rem 0">dark</Tag>
  </div>
</Card>

<Card>
  <CardHeader title="Light Colors" border={false} />
  <div class="margin">
    <Tag color="primary-light" label="primary-light" margin="1rem 0 1rem 0" />
    <Tag color="secondary-light" label="secondary-light" margin="1rem 0 1rem 0" />
    <Tag color="error-light" label="error-light" margin="1rem 0 1rem 0" />
    <Tag color="warning-light" label="warning-light" margin="1rem 0 1rem 0" />
    <Tag color="success-light" label="success-light" margin="1rem 0 1rem 0" />
    <Tag color="info-light" label="info-light" margin="1rem 0 1rem 0" />
    <Tag color="gray-light" label="gray-light" margin="1rem 0 1rem 0" />
    <Tag color="dark-light" label="dark-light" margin="1rem 0 1rem 0" />
  </div>
</Card>

<Card>
  <CardHeader title="Border Colors" border={false} />
  <div class="margin">
    <Tag color="primary-border" label="primary-border" margin="1rem 0 1rem 0" />
    <Tag color="secondary-border" label="secondary-border" margin="1rem 0 1rem 0" />
    <Tag color="error-border" label="error-border" margin="1rem 0 1rem 0" />
    <Tag color="warning-border" label="warning-border" margin="1rem 0 1rem 0" />
    <Tag color="success-border" label="success-border" margin="1rem 0 1rem 0" />
    <Tag color="info-border" label="info-border" margin="1rem 0 1rem 0" />
    <Tag color="gray-border" label="gray-border" margin="1rem 0 1rem 0" />
    <Tag color="dark-border" label="dark-border" margin="1rem 0 1rem 0" />
  </div>
</Card>
```
