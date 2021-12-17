<script>
  import Section from "$misc/components/section.svelte";

  import CodeCard1 from "./input.md";

  import Row from "$lib/layouts/Row.svelte";
  import Column from "$lib/layouts/Column100.svelte";
  import Column50 from "$lib/layouts/Column50.svelte";
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableHeader from "$lib/components/table/TableHeader.svelte";
  import TableRow from "$lib/components/table/TableRow.svelte";
  import TableCell from "$lib/components/table/TableCell.svelte";

  import Input from "$lib/components/input/Input.svelte";
  import fuzzySearch from "$lib/utils/fuzzy-search";
</script>

<Section id="input" title="Input">
  <Row>
    <Column>
      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Bubbles Inputs" border={false} />
        <p>
          All of the text based inputs are housed under one <code>Input</code> component. You can specify the type of
          input that you want to use using the <code>type</code> property.
        </p>

        <p>
          With Bubbles, you'll normally never actually import any <code>Input</code> components, you'll just programmatically
          add them directly to the Form.
        </p>

        <p>
          All of the text based inputs are housed under one <code>Input</code> component. You can specify the type of
          input that you want to use using the <code>type</code> property.
        </p>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Inputs Types" border={false} />
        <Table>
          <TableHeader cells={[{ label: "Type" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700"><code>text</code></span></TableCell>
            <TableCell>The general purpose text input you'll use for the majority of your forms.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700"><code>email</code></span></TableCell>
            <TableCell
              >While this will not automatically check for emails, you'll still want to add the email string under
              validation, this will enable devices like mobile phones to suggest emails for the user to enter.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700"><code>tel</code> <code>phone</code></span></TableCell>
            <TableCell
              >Entering any of these types will get you the "tel" input, which will suggest phone numbers for the user.
              <br />
              <strong style="color: var(--primary);"
                >In a future update, this input will also have properties to let the user select their country code via
                dropdown, but that is on the roadmap.</strong
              >
              <br />
              <a href="https://github.com/vpanyushenko/bubbles/issues/33" target="_blank"
                >https://github.com/vpanyushenko/bubbles/issues/33</a
              >
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700"><code>password</code></span></TableCell>
            <TableCell>Standard password input. Browsers will let users autofill these passwords.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700"><code>date</code></span></TableCell>
            <TableCell
              >The date input is <strong>NOT</strong> a calendar input. Bubbles has an opinion that entering a date is
              just easier by typing it in rather than selecting from a calendar. This will let the user enter the date
              in mm/dd/yyyy format.
              <strong style="color: var(--primary);">This still needs to be localized.</strong></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700"><code>number</code></span></TableCell>
            <TableCell>This will render a number input.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700"><code>textarea</code></span></TableCell>
            <TableCell>This will render a textarea element.</TableCell>
          </TableRow>
        </Table>
      </Card>

      <Card color={null} shadow={false} border={true}>
        <CardHeader title="Properties" border={false} />
        <Table>
          <TableHeader cells={[{ label: "Property" }, { label: "Description" }]} />
          <TableRow>
            <TableCell><span style="font-weight: 700">id</span></TableCell>
            <TableCell
              >All of the inputs that you provide to the form should have an <code>id</code> property. This will end up
              being the property name on the JSON object. If your <code>id</code> includes any periods in it like
              <code>profile.name</code>, the "name" will be nested under "profile".</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">type</span></TableCell>
            <TableCell
              >Bubbles supports several inputs: <code>text</code>, <code>email</code>, <code>password</code>,
              <code>date</code>, <code>number</code>, and <code>textarea</code></TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">label</span></TableCell>
            <TableCell
              >The label that will describe what information needs to be entered. Will float up when the input is in
              focus. Best to keep this as short as possible</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">error</span></TableCell>
            <TableCell
              >The error text that you want to display if this input fails validation. Best to keep this as short as
              possible.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validation</span></TableCell>
            <TableCell
              >The validation string you want to use for this form. See the validation article in the Utils section for
              more info.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">validate_on_blur</span></TableCell>
            <TableCell>If true, runs the validation checks when focus is lost from the input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">vob</span></TableCell>
            <TableCell>Just an alias for <code>validate_on_blur</code>. Set whichever is best for you.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">desc</span></TableCell>
            <TableCell
              >This will be the small text below the input to describe it in more detail. It supports html so you can
              add anchor tags that will get rendered correctly.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">value</span></TableCell>
            <TableCell>The value for this input it you want to pre-fill it.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">autocomplete</span></TableCell>
            <TableCell
              >If you want to browser to autocomplete fields for the user. Disable this by passing <code>false</code>,
              by default this is turned on.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">margin</span></TableCell>
            <TableCell>Adds margin to the input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">bounds</span></TableCell>
            <TableCell
              >This is an array with the min and max values for an input. It's used only with the <code>number</code> input
              type.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">rows</span></TableCell>
            <TableCell
              >Specifies the height in rows to be used. It's used only with the <code>textarea</code> input type.</TableCell
            >
          </TableRow>
          <TableRow>
            <TableCell><span style="font-weight: 700">typeahead</span></TableCell>
            <TableCell
              >This lets you show a list of suggestions for a user as they are typing in a value. This is useful for
              helping populate an address, for example. The typeahead property is a function which takes in <code
                >value</code
              > the current value of the input and should return an array of string as possible suggestions.</TableCell
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
        <CardHeader title="Examples" border={false} />
        <div>
          <Input
            id="name"
            type="text"
            label="Full Name"
            error="Please add your name"
            validation="string|required|min:3"
            vob={true}
            desc="This is a text input that has validation that checks for a string with a minimum length of 3"
            margin={true}
          />

          <Input
            id="password"
            type="password"
            label="Passphrase"
            error="Your passphrase must be at least 10 characters"
            validation="string|required|min:10"
            vob={true}
            desc="This is a password field that has a minimum requirement of 10 characters."
            margin={true}
          />

          <Input
            id="date_of_birth"
            type="date"
            label="Date Of Birth"
            error="This is not a valid date"
            validation="required|date"
            desc="This is a date field"
            margin={true}
          />

          <Input
            id="age"
            type="number"
            label="What is your age"
            error="Please select a number between 13 and 150"
            validation="required|number|min:13|max:150"
            desc="Type a number between 13 and 150"
            margin={true}
            bounds="{[13, 150]},"
          />

          <Input
            id="phone"
            type="tel"
            label="Enter your phone number"
            error="Enter your phone number"
            validation="required"
            desc="Enter your phone number. If your country code is not +1, enter your country code first."
            margin={true}
          />

          <Input
            id="address"
            type="textarea"
            label="Enter your address"
            error="Enter your address"
            validation="string"
            vob={true}
            desc="This is a textarea field with a height of 5 rows."
            margin={true}
            rows="5"
          />

          <Input
            id="favorite"
            type="text"
            label="Favorite U.S. State"
            error="we can't find that one!"
            desc="This is an example of typeahead to get results based on what the user is typing. It can be used on text and textarea inputs. Just add a function to the typeahead property that accepts the current value and responds with a Promise that array of options. Each option is the completed string. "
            margin={true}
            autocomplete={false}
            typeahead={(input) => {
              const states = [
                {
                  name: "Alabama",
                  abbreviation: "AL",
                },
                {
                  name: "Alaska",
                  abbreviation: "AK",
                },
                {
                  name: "American Samoa",
                  abbreviation: "AS",
                },
                {
                  name: "Arizona",
                  abbreviation: "AZ",
                },
                {
                  name: "Arkansas",
                  abbreviation: "AR",
                },
                {
                  name: "California",
                  abbreviation: "CA",
                },
                {
                  name: "Colorado",
                  abbreviation: "CO",
                },
                {
                  name: "Connecticut",
                  abbreviation: "CT",
                },
                {
                  name: "Delaware",
                  abbreviation: "DE",
                },
                {
                  name: "District Of Columbia",
                  abbreviation: "DC",
                },
                {
                  name: "Federated States Of Micronesia",
                  abbreviation: "FM",
                },
                {
                  name: "Florida",
                  abbreviation: "FL",
                },
                {
                  name: "Georgia",
                  abbreviation: "GA",
                },
                {
                  name: "Guam",
                  abbreviation: "GU",
                },
                {
                  name: "Hawaii",
                  abbreviation: "HI",
                },
                {
                  name: "Idaho",
                  abbreviation: "ID",
                },
                {
                  name: "Illinois",
                  abbreviation: "IL",
                },
                {
                  name: "Indiana",
                  abbreviation: "IN",
                },
                {
                  name: "Iowa",
                  abbreviation: "IA",
                },
                {
                  name: "Kansas",
                  abbreviation: "KS",
                },
                {
                  name: "Kentucky",
                  abbreviation: "KY",
                },
                {
                  name: "Louisiana",
                  abbreviation: "LA",
                },
                {
                  name: "Maine",
                  abbreviation: "ME",
                },
                {
                  name: "Marshall Islands",
                  abbreviation: "MH",
                },
                {
                  name: "Maryland",
                  abbreviation: "MD",
                },
                {
                  name: "Massachusetts",
                  abbreviation: "MA",
                },
                {
                  name: "Michigan",
                  abbreviation: "MI",
                },
                {
                  name: "Minnesota",
                  abbreviation: "MN",
                },
                {
                  name: "Mississippi",
                  abbreviation: "MS",
                },
                {
                  name: "Missouri",
                  abbreviation: "MO",
                },
                {
                  name: "Montana",
                  abbreviation: "MT",
                },
                {
                  name: "Nebraska",
                  abbreviation: "NE",
                },
                {
                  name: "Nevada",
                  abbreviation: "NV",
                },
                {
                  name: "New Hampshire",
                  abbreviation: "NH",
                },
                {
                  name: "New Jersey",
                  abbreviation: "NJ",
                },
                {
                  name: "New Mexico",
                  abbreviation: "NM",
                },
                {
                  name: "New York",
                  abbreviation: "NY",
                },
                {
                  name: "North Carolina",
                  abbreviation: "NC",
                },
                {
                  name: "North Dakota",
                  abbreviation: "ND",
                },
                {
                  name: "Northern Mariana Islands",
                  abbreviation: "MP",
                },
                {
                  name: "Ohio",
                  abbreviation: "OH",
                },
                {
                  name: "Oklahoma",
                  abbreviation: "OK",
                },
                {
                  name: "Oregon",
                  abbreviation: "OR",
                },
                {
                  name: "Palau",
                  abbreviation: "PW",
                },
                {
                  name: "Pennsylvania",
                  abbreviation: "PA",
                },
                {
                  name: "Puerto Rico",
                  abbreviation: "PR",
                },
                {
                  name: "Rhode Island",
                  abbreviation: "RI",
                },
                {
                  name: "South Carolina",
                  abbreviation: "SC",
                },
                {
                  name: "South Dakota",
                  abbreviation: "SD",
                },
                {
                  name: "Tennessee",
                  abbreviation: "TN",
                },
                {
                  name: "Texas",
                  abbreviation: "TX",
                },
                {
                  name: "Utah",
                  abbreviation: "UT",
                },
                {
                  name: "Vermont",
                  abbreviation: "VT",
                },
                {
                  name: "Virgin Islands",
                  abbreviation: "VI",
                },
                {
                  name: "Virginia",
                  abbreviation: "VA",
                },
                {
                  name: "Washington",
                  abbreviation: "WA",
                },
                {
                  name: "West Virginia",
                  abbreviation: "WV",
                },
                {
                  name: "Wisconsin",
                  abbreviation: "WI",
                },
                {
                  name: "Wyoming",
                  abbreviation: "WY",
                },
              ];

              const fuse = new fuzzySearch(states, {
                shouldSort: false,
                keys: ["name", "abbreviation"],
                minMatchCharLength: 2,
                threshold: 0.4,
              });

              return Promise.resolve(fuse.search(input).map((obj) => obj.item.name));
            }}
          />

          <Input
            id="stripe"
            type="stripe-card"
            desc="Enter your stripe payment information"
            margin={true}
            stripe_key_name="VITE_STRIPE_PUBLIC_KEY"
          />
        </div>
      </Card>
    </Column50>
  </Row>
</Section>
