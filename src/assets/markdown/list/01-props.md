# List

A list is a great way to display information one line at a time. Think of a list as a vertical table. You can create a list by either passing in an array on items into the items property, or importing the `ListItem` or `ListItemTimeline` components and adding them into the List.

<br>

---

<br>

## Props

<br>

**type** `string` <code class="blue">standard</code><br>
The type of list that you want to show. There are currently two types of lists that are supported. `standard` is the default list, and `timeline` if you want a timeline list.

---

**items** `array<ListItem|ListItemTimeline>` <br>
An array items items that list list will have. Each item is an object. You only need to pass in the `items` prop if you are creating the list programmatically. You can also import `ListItem` or `ListItemTimeline` and add them individually.

<details>
<summary>Show Details</summary>

|                                                                                                                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| item[].**label** `string`<br> This is the label at the top of the list. It should describe what the text is that the user is seeing.                                                                          |
| item[].**text** `string`<br> This is the main content of of list.                                                                                                                                             |
| item[].**href** `string`<br> If you want the list item to be a link, pass in the href.                                                                                                                        |
| item[].**new_page** `function`<br> If the item is an href, pass `false` if you don't want the href to be opened in a new tab.                                                                                 |
| item[].**icon** `string`<br> You can include an icon on the right side of the list. You can pass an imported icon, or use the bundled common icons for the list which include copy, download, edit, and trash |
| item[].**onclick** `function`<br> If you have an icon, you can pass a function that will run when a user clicks on an icon. Useful for downloading some content or copying the text that's in the List.       |
| item[].**active** `boolean`<br> If the list type is a `timeline`, you can set the timeline bubble to be active, which will change it's color to green                                                         |
| item[].**pulse** `string`<br> If the list type is a `timeline`, and the item is active, it will be pulsing. You can turn this off by passing false to this attribute.                                         |
| item[].**color** `string`<br> If the list type is a `timeline`, you can edit the color of the dot.                                                                                                            |

> To add a line break between filter options, you can just add an option with a string value of "break"

</details><br>
