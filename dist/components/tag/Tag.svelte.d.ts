/** @typedef {typeof __propDef.props}  TagProps */
/** @typedef {typeof __propDef.events}  TagEvents */
/** @typedef {typeof __propDef.slots}  TagSlots */
export default class Tag extends SvelteComponentTyped<{
    dark_mode_invert?: boolean | undefined;
    id?: string | undefined;
    margin?: string | undefined;
    label?: string | undefined;
    min_width?: number | undefined;
    small?: boolean | undefined;
    color?: string | undefined;
    onclick?: Function | undefined;
    tooltip?: string | undefined;
    colors?: string[] | undefined;
    onhover?: Function | undefined;
    onblur?: Function | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TagProps = typeof __propDef.props;
export type TagEvents = typeof __propDef.events;
export type TagSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        dark_mode_invert?: import("$types").Tag["dark_mode_invert"];
        id?: import("$types").Tag["id"];
        margin?: import("$types").Tag["margin"];
        label?: import("$types").Tag["label"];
        min_width?: import("$types").Tag["min_width"];
        small?: import("$types").Tag["small"];
        color?: import("$types").Tag["color"];
        onclick?: import("$types").Tag["onclick"];
        tooltip?: import("$types").Tag["tooltip"];
        colors?: import("$types").Tag["colors"];
        onhover?: import("$types").Tag["onhover"];
        onblur?: import("$types").Tag["onblur"];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
