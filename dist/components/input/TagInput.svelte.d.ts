/** @typedef {typeof __propDef.props}  TagInputProps */
/** @typedef {typeof __propDef.events}  TagInputEvents */
/** @typedef {typeof __propDef.slots}  TagInputSlots */
export default class TagInput extends SvelteComponentTyped<{
    dark_mode_invert?: boolean;
    label?: string;
    small?: boolean;
    color?: string;
    id?: string;
    tooltip?: string;
    min_width?: number;
    margin?: string;
    color_options?: any[];
}, {
    click: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TagInputProps = typeof __propDef.props;
export type TagInputEvents = typeof __propDef.events;
export type TagInputSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        dark_mode_invert?: boolean;
        label?: string;
        small?: boolean;
        color?: string;
        id?: string;
        tooltip?: string;
        min_width?: number;
        margin?: string;
        color_options?: any[];
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
