# CardHeader

The `CardHeader` is fixed to the top of the card and will contain things like the title, action buttons, and filters.

<br>

---

<br>

## Props

<br>

**title** `string`<br>
The main prop that you will usually include in your card. This will be the title that describes the content of the card.

---

**caption** `string`<br>
If you need more details for your title, you can include a caption, which will display smaller text below the title. Captions load data as html, so you can add an anchor tag with an href inline and it will render the link correctly.

---

**shadow** `boolean` <code class="blue">true</code><br>
The shadow behind the card. You can't specify the shadow right now, just if you want it or not. It defaults to true.

---

**border** `boolean` <code class="blue">false</code><br>
Adds a border to the bottom of the component.

---

**center** `boolean` <code class="blue">false</code><br>
This will center the text in component. It's advised to not use this if you are including a `buttons` or `filters` property.

---

**buttons** `array<IconButton>`<br>
Buttons are an array of <strong><a href="/icon-button">IconButtons</a></strong> that will show up on the right side of the header.

---

**filters** `array<IconButton>`<br>
An array of filters that should be used if you have a `Table` inside of your `Card` and want to filter the data. The `Filters` are a special type of `Select` that will modify url query params, which will cause Svelte to refetch the data required.

<details>
<summary>Show Details</summary>

|                                                                                               |
| :-------------------------------------------------------------------------------------------- |
| filter[].**id** `string`<br> The key of the query param.                                      |
| filter[].**label** `string`<br> The label for the filter.                                     |
| filter[].**options** `array`<br> The options for the user to choose from.                     |
| filter[].option[].**label** `string`<br> The text the user sees for the option                |
| filter[].option[].**value** `string`<br> The value that will be added for the url query param |
| filter[].option[].**caption** `string`<br> Optional explanation for the choice                |

> To add a line break between filter options, you can just add an option with a string value of "break"

</details><br>

---
