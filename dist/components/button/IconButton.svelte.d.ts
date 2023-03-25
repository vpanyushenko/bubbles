/** @typedef {typeof __propDef.props}  IconButtonProps */
/** @typedef {typeof __propDef.events}  IconButtonEvents */
/** @typedef {typeof __propDef.slots}  IconButtonSlots */
export default class IconButton extends SvelteComponentTyped<{
    dom_component_width: any;
    radius?: string;
    dark_mode_invert?: boolean;
    search?: boolean;
    color?: any;
    id?: string;
    options?: any[];
    align?: string;
    icon?: string;
    onclick?: any;
    href?: string;
    new_page?: boolean;
    larger?: boolean;
    shadow?: boolean;
    typeahead?: any;
    onselect?: any;
    debounce?: number;
    reset_on_select?: boolean;
    __search_id?: any;
    __search_width_100?: boolean;
    href_listener?: any;
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
        dom_component_width: any;
        radius?: string;
        dark_mode_invert?: boolean;
        search?: boolean;
        color?: any;
        id?: string;
        options?: any[];
        align?: string;
        icon?: string;
        onclick?: any;
        href?: string;
        new_page?: boolean;
        larger?: boolean;
        shadow?: boolean;
        typeahead?: any;
        onselect?: any;
        debounce?: number;
        reset_on_select?: boolean;
        __search_id?: any;
        __search_width_100?: boolean;
        href_listener?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
