/** @typedef {typeof __propDef.props}  TableRowProps */
/** @typedef {typeof __propDef.events}  TableRowEvents */
/** @typedef {typeof __propDef.slots}  TableRowSlots */
export default class TableRow extends SvelteComponentTyped<{
    href: string | undefined;
    onclick: Function | undefined;
    id?: string | undefined;
    wrap?: boolean | undefined;
    mobile_wrap?: boolean | undefined;
    cells?: import("$types").TableCell[] | undefined;
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
        href: string | undefined;
        onclick: Function | undefined;
        id?: string | undefined;
        wrap?: boolean | undefined;
        mobile_wrap?: boolean | undefined;
        cells?: import("$types").TableCell[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
