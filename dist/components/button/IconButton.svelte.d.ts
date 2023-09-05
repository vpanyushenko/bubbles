/** @typedef {typeof __propDef.props}  IconButtonProps */
/** @typedef {typeof __propDef.events}  IconButtonEvents */
/** @typedef {typeof __propDef.slots}  IconButtonSlots */
export default class IconButton extends SvelteComponentTyped<{
    typeahead: import("$types").typeahead | undefined;
    onselect: import("$types").onselect | undefined;
    color: string | undefined;
    onclick: Function | undefined;
    dropdown_buttons: import("$types").Button[] | undefined;
    counter: number | undefined;
    href_listener: string | undefined;
    __search_id: string;
    radius?: "rounded" | "blocky" | undefined;
    dark_mode_invert?: boolean | undefined;
    search?: boolean | undefined;
    id?: string | undefined;
    debounce?: number | undefined;
    options?: import("$types").SelectOption[] | undefined;
    href?: string | undefined;
    align?: "left" | "right" | undefined;
    icon?: string | undefined;
    new_page?: boolean | undefined;
    larger?: boolean | undefined;
    shadow?: boolean | undefined;
    reset_on_select?: any;
    __search_width_100?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type IconButtonProps = typeof __propDef.props;
export type IconButtonEvents = typeof __propDef.events;
export type IconButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        typeahead: import("$types").IconButton["typeahead"];
        onselect: import("$types").IconButton["onselect"];
        color: import("$types").IconButton["color"];
        onclick: import("$types").IconButton["onclick"];
        dropdown_buttons: import("$types").IconButton["dropdown_buttons"];
        counter: import("$types").IconButton["counter"];
        href_listener: import("$types").IconButton["href_listener"];
        __search_id: string;
        radius?: import("$types").IconButton["radius"];
        dark_mode_invert?: import("$types").IconButton["dark_mode_invert"];
        search?: import("$types").IconButton["search"];
        id?: import("$types").IconButton["id"];
        debounce?: import("$types").IconButton["debounce"];
        options?: import("$types").SelectOption[] | undefined;
        href?: import("$types").IconButton["href"];
        align?: import("$types").IconButton["align"];
        icon?: import("$types").IconButton["icon"];
        new_page?: import("$types").IconButton["new_page"];
        larger?: import("$types").IconButton["larger"];
        shadow?: import("$types").IconButton["shadow"];
        reset_on_select?: any;
        __search_width_100?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
