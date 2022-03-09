<script>
  import Card from "$lib/components/card/Card.svelte";
  import CardHeader from "$lib/components/card/CardHeader.svelte";
  import Input from "$lib/components/input/Input.svelte";
  import StripeInput from "$lib/components/stripe/StripeCardInput.svelte";
  import fuzzySearch from "$lib/utils/fuzzy-search";
</script>

<Card height100={true}>
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
      id="time"
      type="time"
      label="Enter a time"
      error="Enter a time"
      validation="string"
      desc="Enter a time. When a form is submitted, time is submitted as a string from '0:00 to 23:59'"
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
            caption: "West coast, best coast",
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
            caption: "I ❤️ New York",
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

        return Promise.resolve(
          fuse.search(input).map((obj) => {
            return { label: obj.item.name, value: obj.item.name, caption: obj.item?.caption };
          })
        );
      }}
    />

    <StripeInput
      id="stripe"
      type="stripe-card"
      desc="Enter your credit card information. Stripe will load completely asynchronously when you request the component, after everything else mounts. You do not have to worry about performance issues.<br><br><strong>You will always end up using stripe in a <code>Form</code> component instead of using this input directly. See more details in the form section about using Stripe with Bubbles.</strong>"
      margin={true}
      stripe_key_name="VITE_STRIPE_PUBLIC_KEY"
    />

    <Input
      id="name"
      type="text"
      label="Disabled"
      error="Please add your name"
      margin={true}
      disabled={true}
      value="This is disabled"
    />
  </div>
</Card>
