/** @typedef {typeof __propDef.props}  TableRowProps */
/** @typedef {typeof __propDef.events}  TableRowEvents */
/** @typedef {typeof __propDef.slots}  TableRowSlots */
export default class TableRow extends SvelteComponentTyped<{
    id?: string;
    onclick?: any;
    href?: any;
    wrap?: boolean;
    mobile_wrap?: boolean;
    cells?: any[];
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TableRowProps = typeof __propDef.props;
export type TableRowEvents = typeof __propDef.events;
export type TableRowSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id?: string;
        onclick?: any;
        href?: any;
        wrap?: boolean;
        mobile_wrap?: boolean;
        cells?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
