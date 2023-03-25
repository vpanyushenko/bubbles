/** @typedef {typeof __propDef.props}  ButtonProps */
/** @typedef {typeof __propDef.events}  ButtonEvents */
/** @typedef {typeof __propDef.slots}  ButtonSlots */
export default class Button extends SvelteComponentTyped<{
    style: any;
    href: string;
    radius?: "rounded" | "blocky";
    dark_mode_invert?: boolean;
    search?: boolean;
    disabled?: boolean;
    label?: string;
    color?: string;
    id?: string;
    align?: string;
    icon?: string;
    onclick?: Function;
    new_page?: boolean;
    larger?: boolean;
    shadow?: boolean;
    typeahead?: Function;
    debounce?: number;
    __search_id?: any;
    __search_width_100?: boolean;
    onsubmit?: Function;
    mt?: boolean;
    mb?: boolean;
    wide?: boolean;
    preload?: "hover" | "tap" | "off";
    border?: any;
    invert_icon?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        style: any;
        href: string | null;
        radius?: "blocky" | "rounded";
        dark_mode_invert?: boolean | null;
        search?: boolean;
        disabled?: boolean | null;
        label?: string | null;
        color?: string;
        id?: string | null;
        align?: string;
        icon?: ("arrowLeft" | "arrowLeftDouble" | "arrowRight" | "arrowRightDouble" | "more" | "add" | "close" | "search" | "edit" | "trash" | "filter" | string) | null;
        onclick?: Function | null;
        new_page?: boolean;
        larger?: boolean;
        shadow?: boolean | null;
        typeahead?: Function | null;
        debounce?: number | null;
        __search_id?: any;
        __search_width_100?: boolean;
        onsubmit?: Function | null;
        mt?: boolean;
        mb?: boolean;
        wide?: boolean;
        preload?: "hover" | "tap" | "off";
        border?: any;
        invert_icon?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
