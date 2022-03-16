<script>
  import Section from "src/__misc/components/section.svelte";

  import CodeCard1 from "./validate-inputs.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";
</script>

<Section id="validateInputs" title="validateInputs">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <p>
          Some form elements have options to validate the inputs when blurred but other, like a checkbox, don't have a
          that. After a user submits a form, but before the request is made to your endpoint, you'll want to validate
          the inputs again to catch any errors.
        </p>
        <p>
          Any elements that have been removed from a <code>Form</code> using the <code>hidden_if</code> property will not
          be included in the validation.
        </p>
        <p>
          <strong
            >Front end validation is done for user experience, you should incorporate server side validation for the
            actual check, and never trust the data coming from a client.</strong
          >
        </p>

        <p>Error states will automatically be shown for any component that fails validation.</p>

        <Table>
          <TableHeader
            cells={[{ label: "Property" }, { label: "Type" }, { label: "Description" }, { label: "Response" }]}
          />
          <TableRow>
            <TableCell><span style="font-weight: 700">inputs</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>array</code></span></TableCell>
            <TableCell
              >The array of inputs you want to validate. These inputs should be declared in your <code>script</code> tag
              and passed into the <code>Form</code> element as a prop. The validation will look at the
              <code>validation</code> property of each input. Will return an Object with one property called
              <code>errors</code> which will be an array of input ID's that failed validation.</TableCell
            >
            <TableCell><span style="font-weight: 700"><code>Object.errors</code></span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">options</span></TableCell>
            <TableCell><span style="font-weight: 700"><code>Object</code></span></TableCell>
            <TableCell
              >The array of inputs you want to validate. These inputs should be declared in your <code>script</code> tag
              and passed into the <code>Form</code> element as a prop. The validation will look at the
              <code>validation</code> property of each input. Will return an Object with one property called
              <code>errors</code> which will be an array of input ID's that failed validation.</TableCell
            >
            <TableCell><span style="font-weight: 700"><code>Object.errors</code></span></TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color="dark" px={0} py={0}>
        <CodeCard1 />
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Validation Properties" border={false} />
        <p>
          You can see the validation properties that Bubbles supports. These are basic common validations but you're
          expected to have more sophisticated options server side.
        </p>

        <p>
          All of the validations are written as a string with a pipe separating all of the options you want to check.
        </p>
        <p>
          This was heavily inspired by the great library called <code>validatorjs</code>.
          <a href="https://www.npmjs.com/package/validatorjs">View here</a>. The one built into Bubbles is not as
          powerful, but is a much smaller size. Using <code>validatorjs</code> server side would be very easy as the validation
          strings are identical.
        </p>

        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">required</span></TableCell>
            <TableCell>Makes the field required to be validated, meaning it must have a value.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">boolean</span></TableCell>
            <TableCell>The value must be a falsy or truthy value to pass validation.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">string</span></TableCell>
            <TableCell>The value must be a string</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">min</span></TableCell>
            <TableCell
              >The value must have a minimum value. If the value is a number is will make sure that number is greater
              than or equal to the min number. If the value is a string, it will check the length of the string. Set the
              value for min using a colon. To check a string with a minimum length of 8, such as for a password use <code
                >min:8</code
              >.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">max</span></TableCell>
            <TableCell
              >The same as min just for max values for numbers and strings. Set the same way using <code>max:100</code
              ></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">email</span></TableCell>
            <TableCell>Check that the value being validated is an email.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">numeric</span></TableCell>
            <TableCell
              >Will accept a value that is numeric. It will accept string values that are numeric such as "99".</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">array</span></TableCell>
            <TableCell>The value must be an array.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell><span style="font-weight: 700">url</span></TableCell>
            <TableCell>The value must be a url.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">alpha</span></TableCell>
            <TableCell>The value must only be alphabetic characters, a-z</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">alpha_dash</span></TableCell>
            <TableCell>Accepts alphabetical characters with dashes, slashes, and underscores.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">alpha_num</span></TableCell>
            <TableCell>The value must be alphabetical or numeric characters.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">accepted</span></TableCell>
            <TableCell>The value must be truthy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">integer</span></TableCell>
            <TableCell>The value must be an integer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">date</span></TableCell>
            <TableCell>The value must be a date value</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">regex</span></TableCell>
            <TableCell
              >Enter your own regex to check a field. Just like min an max, enter your value with a colon. <code
                >regex:/^(19|20)[\\d]{(2, 2)}$/</code
              ></TableCell
            >
          </TableRow>
        </Table>
      </Card>
    </Column>
  </Row>
</Section>
