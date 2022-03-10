# Header

The `Header` is a special component that lives outside a `Row`. It features a large title, breadcrumbs, and a back button if needed.

Bubbles will calculate the labels from the breadcrumbs using the path if you set breadcrumbs to `true`. For the last breadcrumb it will use the page title that you set in the `Header`.

For example, a settings page path of /settings/profile would give breadcrumbs of "Settings / Profile". Sometimes it's common to add the ID of an element in the href, such as /invoices/inv_0938487984654. In this case, the breadcrumb will look for the title for the last element and show something like "Invoices / #23" (or whatever the title of the page is in the Header).

In a scenario where your page has two dynamic links such as /pokedex/[pokemon_id]/[move_id] you may want to pass in more human readable labels to the breadcrumbs using the breadcrumb_labels property, or overwrite them completely by passing in an array to the `breadcrumbs` property.

<br>

---

<br>

## Props

<br>

**title** `string` <br>
This is the main title for the page. You can either pass it as a prop to the `Header` component, or update the `$pageStore.title` property which will do the same thing.

---

**subtitle** `string` <br>
You can add a subtitle to the page. This accepts html so you can add anchor tags. If you add a subtitle and are on a nested page, you will not see any breadcrumbs.

---

**breadcrumbs** `boolean|array<Breadcrumb>` <code class="blue">true</code><br>
Pass in `false` if you do not want to display breadcrumbs. If you want to override the automatic breadcrumbs, you can pass in an array of objects with the `label` and `href` of the breadcrumb you want to add.

<details>
<summary>Show Details</summary>

|                                                                                                        |
| :----------------------------------------------------------------------------------------------------- |
| Breadcrumb.**label** `string`<br> The text of the breadcrumb displayed on the screen.                  |
| Breadcrumb.**href** `string`<br> The page to which the user will be navigated when clicking the crumb. |

</details><br>

---

**breadcrumb_labels** `Array<String>` <br>
An array of string to overwrite the just labels for breadcrumbs.

---

**buttons** `object<IconButton>` <br>
Buttons are an array of [IconButtons](/icon-button) that will show up on the right side of the component.

---
