## Document Model

Here is a general sense of how Bubbles expects your document to be structured.

1. First is the Wrapper. This wraps the whole document. The exception here is the `Sidebar` component which is outside of the wrapper. If the sidebar is used, the `SidebarPageWrapper` is used to wrap the page. There are also a few elements like the `ToastContainer` and `Model` that can be included anywhere since they will appear on top of everything, so they are generally added outside of the wrapper as well.

2. Once the app wrapper is included, you then select if you want to use a grid or column layout to display your content - columns are more common. For a column layout you will use a `Row` component to wrap you columns. For a grid layout, you'll use the `Grid` and `GridItem` components. The `Header` component can be added to the top of your page and should not be wrapped in anything.
