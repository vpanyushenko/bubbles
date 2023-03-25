/** @typedef {typeof __propDef.props}  TableProps */
/** @typedef {typeof __propDef.events}  TableEvents */
/** @typedef {typeof __propDef.slots}  TableSlots */
export default class Table extends SvelteComponentTyped<{
    padding?: string;
    header?: any[];
    id?: string;
    empty?: string;
    rows?: any[];
    overflow?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TableProps = typeof __propDef.props;
export type TableEvents = typeof __propDef.events;
export type TableSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        padding?: string;
        header?: any[];
        id?: string;
        empty?: string;
        rows?: any[];
        overflow?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
