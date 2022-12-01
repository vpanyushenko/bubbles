<script>
  import Button from "$lib/components/button/Button.svelte";
  import ButtonGroup from "$lib/components/button/ButtonGroup.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";

  let color = "primary";
  let dark_mode_invert = true;

  const buttonLoadingDemo = (event) => {
    const id = event.currentTarget.id;

    showLoading(id);

    setTimeout(() => {
      hideLoading(id);
    }, 2000);
  };
</script>

<Button mt="1rem" wide={true} label="Primary" color="primary" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Secondary" color="secondary" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Success" color="success" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Error" color="error" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Warning" color="warning" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Info" color="info" onclick={buttonLoadingDemo} />
<Button mt="1rem" wide={true} label="Gray" color="gray" onclick={buttonLoadingDemo} />
<Button mt="1rem" mb="1rem" wide={true} label="Dark" color="dark" onclick={buttonLoadingDemo} />
<br />
<br />
<hr />
<br />
<Button
  mt="2rem"
  wide={true}
  label="Primary Lightest"
  {dark_mode_invert}
  color={`${color}-lightest`}
  onclick={buttonLoadingDemo}
/>
<Button
  mt="2rem"
  wide={true}
  label="Primary Lighter"
  {dark_mode_invert}
  color={`${color}-lighter`}
  onclick={buttonLoadingDemo}
/>
<Button
  mt="2rem"
  wide={true}
  label="Primary Light"
  {dark_mode_invert}
  color={`${color}-light`}
  onclick={buttonLoadingDemo}
/>
<Button mt="2rem" wide={true} label="Primary" {dark_mode_invert} color={`${color}`} onclick={buttonLoadingDemo} />
<Button
  mt="2rem"
  wide={true}
  label="Primary Dark"
  {dark_mode_invert}
  color={`${color}-dark`}
  onclick={buttonLoadingDemo}
/>
<Button
  mt="2rem"
  wide={true}
  label="Primary Darker"
  {dark_mode_invert}
  color={`${color}-darker`}
  onclick={buttonLoadingDemo}
/>
<Button
  mt="2rem"
  wide={true}
  label="Primary Darkest"
  {dark_mode_invert}
  color={`${color}-darkest`}
  onclick={buttonLoadingDemo}
/>
<br />
<br />
<hr />
<br />
<Button mt="2rem" wide={true} label="Primary Lightest Disabled" disabled={true} color={`${color}-lightest`} />
<Button mt="2rem" wide={true} label="Primary Lighter Disabled" disabled={true} color={`${color}-lighter`} />
<Button mt="2rem" wide={true} label="Primary Light Disabled" disabled={true} color={`${color}-light`} />
<Button mt="2rem" wide={true} label="Primary Disabled" disabled={true} color={`${color}`} onclick={buttonLoadingDemo} />
<Button mt="2rem" wide={true} label="Primary Dark Disabled" disabled={true} color={`${color}-dark`} />
<Button mt="2rem" wide={true} label="Primary Darker Disabled" disabled={true} color={`${color}-darker`} />
<Button mt="2rem" wide={true} label="Primary Darkest Disabled" disabled={true} color={`${color}-darkest`} />

<br />
<br />
<hr />
<br />
<ButtonGroup mt="1rem" mb="1rem">
  <Button icon="more" onclick={buttonLoadingDemo} color="dark" shadow={false} />
  <Button wide={true} label="Button 1" color="dark" onclick={buttonLoadingDemo} />
  <Button wide={true} label="Button 2" color="dark" onclick={buttonLoadingDemo} />
</ButtonGroup>
