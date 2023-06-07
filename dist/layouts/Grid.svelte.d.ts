/** @typedef {typeof __propDef.props}  GridProps */
/** @typedef {typeof __propDef.events}  GridEvents */
/** @typedef {typeof __propDef.slots}  GridSlots */
export default class Grid extends SvelteComponentTyped<{
    style?: string | undefined;
    max_columns?: number | undefined;
    min_columns?: number | undefined;
    row_gap?: number | undefined;
    column_gap?: number | undefined;
    ignore_root_styles?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type GridProps = typeof __propDef.props;
export type GridEvents = typeof __propDef.events;
export type GridSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        style?: string | undefined;
        max_columns?: number | undefined;
        min_columns?: number | undefined;
        row_gap?: number | undefined;
        column_gap?: number | undefined;
        ignore_root_styles?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
