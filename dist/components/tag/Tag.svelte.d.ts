/** @typedef {typeof __propDef.props}  TagProps */
/** @typedef {typeof __propDef.events}  TagEvents */
/** @typedef {typeof __propDef.slots}  TagSlots */
export default class Tag extends SvelteComponentTyped<{
    dark_mode_invert?: boolean;
    label?: string;
    small?: boolean;
    color?: string;
    id?: string;
    onclick?: any;
    tooltip?: any;
    colors?: any[];
    min_width?: number;
    margin?: string;
    onhover?: any;
    onblur?: any;
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
        dark_mode_invert?: boolean;
        label?: string;
        small?: boolean;
        color?: string;
        id?: string;
        onclick?: any;
        tooltip?: any;
        colors?: any[];
        min_width?: number;
        margin?: string;
        onhover?: any;
        onblur?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
