## Version 0.7.9

**Added**

- SubmitForm util function
- TableCells can set their own width
- Added a hide function for inputs in a form

**Fixed**

- Loading utils will check for ID
- Sidebar will no longer show undefined if there is no group
- Text in TableCell can now be aligned left
- Sidebar subtitle indenting when no back button is present

<br>

---

## Version 0.7.9

**Fixed**

- Nested Sidebar line was appearing on non-nested sidebars
- fixed alignment on non-compact style sidebars

<br>

---

## Version 0.7.6

**Fixed**

- Add delay to sidebar navigation

<br>

---

## Version 0.7.6

**Fixed**

- Sidebar and Header reactivity

<br>

---

## Version 0.7.1

**Added**

- onselect method for a Select element

<br>

---

## Version 0.7.0

**Added**

- Ability to reverse column order on mobile
- FileForm component
- ImageForm can accept extensions
- Input components have a disabled state now
- Tag before color is changed from primary to primary-light
- Checkbox, Switch, and Radio components have a `background` property to make them look in line with other form elements.
- Roomy and compact styles for Tables.
- Added options to include checkboxes on table rows and utility functions to manipulate them.
- Add callback option to FileForm
- FileForm input will clear value after promise completes
- The dropdown component can now be hidden with the hidden property
- The dropdown component line breaks are now set as a boolean
- Ability to hide a sidebar section with the hidden property - perhaps for role based account access
- Added search functionality to the IconButton component
- SegmentedController supports href
- New sort function and sort functionality for TableHeaders

**Fixed**

- IconButton shows active state screen
- Header text is now smaller on mobile devices
- Header has a search property with a default of false
- ListItem and ListItemTimeline support wrapping long elements
- Error component back button was not doing anything
- CardHeader styles for fixed to fix positions of buttons with a long caption.
- Support for error message on FileForm
- The svelte goto function no longer needs to be passed in via the configStore
- Focus states for non-text inputs
- Buttons now become disabled when they are loading

<br>

---

<br>

## Version 0.6.1

**Fixed**

- Removed obnoxious scroll bars on windows

<br>

---

<br>

## Version 0.6.1

**Fixed**

- validateInputs will no longer fail validation for empty inputs without the required property

<br>

---

<br>

## Version 0.6.0

**Added**

- SegmentedController now has a more compact line style

**Fixed**

- Header element showing Sidebar toggle on mobile when component was not mounted
- Header subtitle was always indented
- Sidebar can now set an href and onclick property

<br>

---

<br>

## Version 0.5.8

**Added**

- multiple_by prop **Added** for number inputs

<br>

---

<br>

## Version 0.5.7

**Fixed**

- SegmentedController export

<br>

---

<br>

## Version 0.5.6

**Fixed**

- Removed Node 14 requirement

<br>

---

<br>

## Version 0.5.5

**Added**

- When a TableRow component has an href and also includes an IconButton component, the loading state will show on the icon. Otherwise it will default inline with the text.

**Fixed**

- Radio and Checkbox components had minor css fixes for alignment
- Switch component does not have a random margin on the bottom
- Custom TableRow components that use a slot can still use the align property

<br>

---

<br>

## Version 0.5.4

**Fixed**

- Header burger button now displays on mobile
- Sidebar will stay open and show loading state until navigation ends

<br>

---

<br>

## Version 0.5.1

**Added**

- Header can now slot through dynamic content for the subtitle / breadcrumb area

<br>

---

<br>

## Version 0.5.0

**Added**

- Support for IconButton to have colors
- Support for IconButton to remove shadows on mobile screens

**Fixed**

- Back button will show in Header subtitle is used on a nested route
- Add caption as an alias to subtitle of the Header element
- Fixed Toast width on mobile screens
- Fixed Header alignment on mobile
- Fixed screen thrashing from using dropdown components

<br>

---

<br>

## Version 0.4.6

**Fixed**

- Modal height expressed in vh instead of rem

<br>

---

<br>

## Version 0.4.5

**Fixed**

- Removed dev logs from Header
- IconButton dropdown does not open an empty list with a href
- IconButton dropdown closes when clicking on the button again
- Model height and width is now set by the user
- Model does not show error states when being closed
- ListItem slots now have their width at 100%

<br>

---

<br>

## Version 0.4.4

**Fixed**

- [Hotfix] ImageForm export

<br>

---

<br>

## Version 0.4.3

**Added**

- ImageForm component was added

**Fixed**

- Breadcrumbs can now we overwritten
- PageWrapper is is now fixed for mobile styles
- Typeahead can be escapes with the esc key

<br>

---

<br>

## Version 0.4.2

**Added**

- Dropdown is now it’s own component used by Select, typeahead, and IconButton
- Dropdown has the option to customize an img at the start and an icon at the end

**Fixed**

- This also fixed issues with the typeahead not working with mouse clicks
- Error component not navigating correctly

<br>

---

<br>

## Version 0.4.1

**Added**

- Time inputs

**Fixed**

- JSDoc comments on url utils
- Removed console logs from examples
- arrowRight will now show hover state when table has an href or onclick function
- Fixed loading indicators on Sidebar and IconButton as result of Svelte kit naming updates
- Sidebar will now show the active indicator on the highest matched path.

<br>

---

<br>

## Version 0.4.0

**Fixed**

- Update uses of svelte kit page into url and params to make is compatible with latest ## Version

<br>

---

<br>

## Version 0.3.3

**Fixed**

- Removed logging stripe token when token is created successfully using the getFormData utility function

<br>

---

<br>

## Version 0.3.2

**Added**

- Form element now have an option for hidden input types
- Table mobile style options

**Fixed**

- Sidebar components will automatically highlight the active section when page is refreshed
- TableRow will how the pointer cursor if there is an onclick function attached to it
- Tag with the small property have had their margins adjusted
- Mobile padding for Cards

<br>

---

<br>

## Version 0.3.1

**Fixed**

- Form now only play locally
- Removed debugging logs

<br>

---

<br>

## Version 0.3.0

**Fixed**

- Form transitions were turned down because they were jarring
- Select now lets you select null or "" as an option

**Added**

- FormGroup was built. Instead of a second component, you can just pass in the width you want for your input and the kit will handle everything for you.

<br>

---

<br>

## Version 0.2.2

**Fixed**

- Textarea margins
- ListItem and ListItemTimeline padding

**Added**

- Divider component finally exported

<br>

---

<br>

## Version 0.2.1

**Fixed**

Fixed stripe dependency issue

<br>

---

<br>

## Version 0.2.0

**Breaking**

- getFormData and validateInputs are now promises.

**Added**

- Form now supports conditional inputs using the hidden_if and hidden_unless properties
  Stripe Elements is now built it. You pass in your own pubic key to the input, and it will collect the credit card information for you and create a stripe card token after calling getFormData

<br>

---

<br>

## Version 0.1.9

**Fixed**

- IconButton element now currently dispatched the id to the click event. You can use event.currentTarget.id to get the ID to show and hide the loading states
- IconButton that has dropdown options will hide the list once one of the options is selected

<br>

---

<br>

## Version 0.1.8

**Added**

- ListItemTimeline can now have the active icon changed by providing the name of a color variable

<br>

---

<br>

## Version 0.1.7

**Added**

- ListItems now support the option to include a Tag by passing a tag property with the details about your Tag. Tags can be used without a label unlike text, because they are often more descriptive in their meaning.

<br>

---

<br>

## Version 0.1.6

**Fixed**

- TableCell nested tags are now aligned in line.
- TableCell nested tags now hijack the align property. Align right or end will move the tag to the right of any text that was **Added**.
- TableCell nested tags now have a margin between text depending on what side they are on.

<br>

---

<br>

## Version 0.1.5

**Fixed**

- TableCell nested tags are now properly supported. Nested table cells are currently experimental and not included in the docs. It allows to make complex table cells with many lines and adding small tags before and/or after the text on each line.

<br>

---

<br>

## Version 0.1.4

**Added**

- Switch, Radio, and Checkbox now support not indented styles.

<br>

---

<br>

## Version 0.1.3

**Added**

- Modal message will now render inline html characters.

<br>

---

<br>

## Version 0.1.2

**Fixed**

- IconButton now displays a custom button is an svg is passed to it

<br>

---

<br>

## Version 0.1.12

**Fixed**

- tel and phone inputs are not working with Form components

<br>

---

<br>

## Version 0.1.11

**Added**

- tel or phone inputs are working.

<br>

---

<br>

## Version 0.1.10

**Fixed**

- ListItem and ListItemTimeline has their bottom margins fixed the the next is now nicely centered

<br>

---

<br>

## Version 0.1.1

**Added**

- Export the merge function that is used for getFormData

**Fixed**

- Button styling when showing loading state

<br>

---

<br>

## Version 0.1.0

**Added**

- Modals now support an image
- CardHeader will no longer default to having a border
- Buttons will now default to being wide
- The svelte kit goto function is now **Added** into the configStore and used throughout the app
- Grid and GridItem components are now available

<br>

---

<br>

## Version 0.0.9

**Added**

- Overlay component which is being used inside Error lets you add an overlay over the whole screen
- Error component was added that can be imported into \_\_error.svelte and will take care of the whole page
- added an example for a Table on a separate page to show nested routes.
- IconButton has a new_page option open an href in a new page
- IconButton dropdown options new have a new_page property to open the href in a new page.
- Spinner component
- ability to overwrite automated Breadcrumbs and add your own.

**Fixed**

- When using getFormData, nested keys in the data would get overwritten. This has been fixed.
  Row layout now supports a style tag
- fixed a bug where pagination would continue to persist if a filter was applied
- fixed a bug where pagination would not reset to the first page after a filter was applies
- fixed a bug where pagination would persist when there was only one page of content
- fixed a bug where keyboard navigation on a select dropdown would tab onto a line break
- fixed a bug where loading indicators would not show on the Sidebar if no icon was present
- fixed a bug where the showing the loading icon on a ListItem was not possible because the event was dispatching the wrong id
- fixed a bug where loading states on sidebar would persist on pagination and vise versa
- fixed a bug where a loading indicator would display on the sidebar when clicking on the back button.
- When clicking on an href inside of a TableCell, a loading indicator will now be displayed.

<br>

---

<br>

## Version 0.0.8

- showToast function was not actually exported in the main bubbles-ui package.

<br>

---

<br>

## Version 0.0.7

- More Header styling updates

<br>

---

<br>

## Version 0.0.6

**Fixed**

- the Header breadcrumbs layout

<br>

---

<br>

## Version 0.0.5

<br>

---

<br>

**Fixed** the package export to npm

## Version 0.0.4

**Fixed**

- a bug with IconButton where transparent=false prop would not work when the button had an href property

<br>

---

<br>

## Version 0.0.3

**Added**

Pagination component
SegmentedController
documentation

**Fixed**

- Updated components to share similar styles and properties. This may still have to change as some props don’t follow the same convention
- Updated IconButton default icons padding on Checkbox, Switch, and Radio when not in a Form element
- Updated colors options for Button, Tag, Toast components
- Lots of little bug fixes

<br>

---

<br>

## Version 0.0.25

**Fixed**

- Bumped svelte to ## Version 3.44.2 and kit to ## Version 1.0.0-next.201

<br>

---

<br>

## Version 0.0.25

**Fixed**

addQueryParam no longer breaks when options are not passed to it

<br>

---

<br>

## Version 0.0.24

**Fixed**

addQueryParam no longer breaks when options are not passed to it

<br>

---

<br>

## Version 0.0.23

**Fixed**

getQueryParam uses the page store from the load function to work with server size requests

<br>

---

<br>

## Version 0.0.22

**Added**

getQueryParam will get all of the query params on the client.

<br>

---

<br>

## Version 0.0.21

**Added**

setQueryParam will remove the key from the url if passed "" null or undefined

**Fixed**

Pagination arrows would disappear on the last page
Show the current page on pagination
Pagination would stay on page 1 if query param was not in the url
Removed default images from Error because they are not included in the build anyway

<br>

---

<br>

## Version 0.0.20

**Added**

Header component will now set the page title for you so you don’t have to add it on each page

**Fixed**

addQueryParam export

<br>

---

<br>

## Version 0.0.2

Bug Fixes

<br>

---

<br>

## Version 0.0.15

**Fixed** Breadcrumbs from ignoring the labels that were passed in

<br>

---

<br>

## Version 0.0.15

**Fixed**

Breadcrumbs would report undefined

<br>

---

<br>

## Version 0.0.14

**Fixed**

Component exports

<br>

---

<br>

## Version 0.0.13

**Fixed**

Component exports

<br>

---

<br>

## Version 0.0.12

**Fixed**

Component exports

<br>

---

<br>

## Version 0.0.11

**Fixed**

Sidebar loading icons and spacing

<br>

---

<br>

## Version 0.0.10

**Added**

Examples for Settings and Auth
Spinner now takes in a style prop

**Fixed**

Sidebar loading indicators would not show if the url was included in the href_aliases array instead of href
Sidebar loading spinners were not displaying correctly
Sidebar icon and labels had wrong spacing on their margins
IconButton was not correctly processing the $navigating svelte store property
Show loading animation when navigating with Breadcrumbs
Update how active sidebars are calculated

<br>

---

<br>

## Version 0.0.1

Init commit. There are lots of bugs but it’s usable enough for a quick project
