/** @typedef {typeof __propDef.props}  TagInputProps */
/** @typedef {typeof __propDef.events}  TagInputEvents */
/** @typedef {typeof __propDef.slots}  TagInputSlots */
export default class TagInput extends SvelteComponentTyped<{
    dark_mode_invert?: boolean | undefined;
    id?: string | undefined;
    margin?: string | undefined;
    label?: string | undefined;
    min_width?: number | undefined;
    small?: boolean | undefined;
    color?: string | undefined;
    tooltip?: string | undefined;
    color_options?: any[] | undefined;
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
        dark_mode_invert?: boolean | undefined;
        id?: string | undefined;
        margin?: string | undefined;
        label?: string | undefined;
        min_width?: number | undefined;
        small?: boolean | undefined;
        color?: string | undefined;
        tooltip?: string | undefined;
        color_options?: any[] | undefined;
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
