/** @typedef {typeof __propDef.props}  GridProps */
/** @typedef {typeof __propDef.events}  GridEvents */
/** @typedef {typeof __propDef.slots}  GridSlots */
export default class Grid extends SvelteComponentTyped<{
    style?: string;
    max_columns?: number;
    min_columns?: number;
    row_gap?: number;
    column_gap?: number;
    ignore_root_styles?: boolean;
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
        style?: string;
        max_columns?: number;
        min_columns?: number;
        row_gap?: number;
        column_gap?: number;
        ignore_root_styles?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
