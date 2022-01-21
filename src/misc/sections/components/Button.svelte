<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./button.md";
  import CodeCard2 from "./button-icon.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Button from "$lib/components/button/Button.svelte";
  import IconButton from "$lib/components/button/IconButton.svelte";
  import { showLoading, hideLoading } from "$lib/utils/loading";

  const buttonLoadingDemo = (event) => {
    const id = event.currentTarget.id;

    showLoading(id);

    setTimeout(() => {
      hideLoading(id);
    }, 2000);
  };

  const iconButtonOptions = [
    {
      label: "Option 1",
      caption: "onclick example",
      onclick: (event) => {
        const icon_button_id = event.currentTarget.parentElement.parentElement.parentElement.querySelector("button").id;

        showLoading(icon_button_id);

        setTimeout(() => {
          hideLoading(icon_button_id);
        }, 2000);
      },
    },
    {
      label: "Option 2",
      caption: "href example",
      href: "/#button",
    },
  ];

  const onclick = (event) => {
    //here the click event is the actual button click
    //so we can get the id for the button from the event
    const id = event.currentTarget.id;
    showLoading(id);

    setTimeout(() => {
      hideLoading(id);
    }, 2000);
  };
</script>

<Section id="button" title="Button">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Button" border={false} />
        <p>
          The <code>Button</code> is a standard button component. It has a text label and can run functions when clicked.
          Below are the properties that you can add to this button.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there
              will be a unique id added to the component.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell>This is the text label that the button will have. Defaults to "Submit"</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">color</span></TableCell>
            <TableCell
              >Pass the name of the color variable you want for the button. For example, "primary" or "error". If you
              want a light version of the button pass in a "-light" with the color, like <code>primary-light</code>. If
              you want an outlined button, pass "-outlined" such as <code>success-outlined</code></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell>Pass a function that you would like to run when this button is clicked</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onsubmit</span></TableCell>
            <TableCell
              >If the button is inside of a bubbles <code>Form</code> element, pass a function to onsumbit, which will listen
              to the submit event.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell
              >If this button will taking a user to a different page, use href instead of directing them to the page
              with onclick. This will prefetch the data on hover to make the navigation faster.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">new_page</span></TableCell>
            <TableCell
              >Pass <code>true</code> if you want this button to open the page contents in a new page.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">wide</span></TableCell>
            <TableCell
              >Pass <code>true</code> if you want the button to take the full width of it's parent container. Defaults
              to <code>true</code></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">mt</span></TableCell>
            <TableCell>The top margin. Ideally set it in rem values</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">mb</span></TableCell>
            <TableCell>The bottom margin. Ideally set it in rem values</TableCell>
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
        <CardHeader title="Button colors" border={false} />
        <Button mt="1rem" wide={true} label="Primary" color="primary" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Secondary" color="secondary" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Success" color="success" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Error" color="error" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Warning" color="warning" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Info" color="info" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Gray" color="gray" onclick={buttonLoadingDemo} />
        <Button mt="1rem" mb="1rem" wide={true} label="Dark" color="dark" onclick={buttonLoadingDemo} />
      </Card>
      <Card>
        <CardHeader title="Different button styles" border={false} />
        <Button mt="2rem" wide={true} label="Primary" color="primary" onclick={buttonLoadingDemo} />
        <Button mt="1rem" wide={true} label="Primary Border" color="primary-border" onclick={buttonLoadingDemo} />
        <Button
          mt="1rem"
          mb="1rem"
          wide={true}
          label="Primary Light"
          color="primary-light"
          onclick={buttonLoadingDemo}
        />
      </Card></Column50
    >
  </Row>
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="IconButton" border={false} />
        <p>
          The <code>IconButton</code> is a circular button. It's best used in places like a <code>Header</code>,
          <code>Card</code>, or <code>Table</code> component. They have some cool features like the option to show a
          dropdown, pretty common when you add a <code>more</code> icon.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >You can pass in an ID to the component if you need to reference it later. If you do not pass an ID, there
              will be a unique id added to the component.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">icon</span></TableCell>
            <TableCell
              >You can pass an icon for the button. Import an <code>svg</code> icon as a variable reference it. There are
              a few bundled common icons you can select from, listed in the table below.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">onclick</span></TableCell>
            <TableCell>Pass a function that you would like to run when this button is clicked</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">href</span></TableCell>
            <TableCell
              >If this button will taking a user to a different page, use href instead of directing them to the page
              with onclick. This will prefetch the data on hover to make the navigation faster,</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">transparent</span></TableCell>
            <TableCell
              >Normally the button is transparent, but you can set this to <code>false</code> to make the button standout
              with a slight gray background.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell
              >An <code>array</code> of options. If you add options, you'll get a dropdown of those options.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.label</span></TableCell>
            <TableCell>The label for the options.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.caption</span></TableCell>
            <TableCell>The caption if you want extra text for the option.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.onclick</span></TableCell>
            <TableCell>A function that will be called when the option is selected.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">option.href</span></TableCell>
            <TableCell
              >If this button will taking a user to a different page, use href instead of directing them to the page
              with onclick. This will prefetch the data on hover to make the navigation faster.</TableCell
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
      <Card height100={true}>
        <CardHeader title="Bundled Icon Options" border={false} />
        <div class="flex">
          <IconButton icon="more" options={iconButtonOptions} align="left" />
          <code>more</code>
        </div>
        <div class="flex">
          <IconButton icon="add" options={iconButtonOptions} align="left" />
          <code>add</code>
        </div>
        <div class="flex">
          <IconButton icon="arrowLeft" {onclick} />
          <code>arrowLeft</code>
        </div>
        <div class="flex">
          <IconButton icon="arrowRight" {onclick} />
          <code>arrowRight</code>
        </div>
        <div class="flex">
          <IconButton icon="close" options={iconButtonOptions} align="left" />
          <code>close</code>
        </div>
        <div class="flex">
          <IconButton icon="search" options={iconButtonOptions} align="left" />
          <code>search</code>
        </div>
        <div class="flex">
          <IconButton icon="edit" options={iconButtonOptions} align="left" />
          <code>edit</code>
        </div>
        <div class="flex">
          <IconButton icon="trash" options={iconButtonOptions} align="left" />
          <code>trash</code>
        </div>
        <div class="flex">
          <IconButton icon="filter" options={iconButtonOptions} align="left" />
          <code>filter</code>
        </div>
      </Card>
    </Column50>
  </Row>
</Section>

<style>
  .flex {
    display: flex;
    align-items: center;
  }
</style>
