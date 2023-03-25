/** @typedef {typeof __propDef.props}  RowProps */
/** @typedef {typeof __propDef.events}  RowEvents */
/** @typedef {typeof __propDef.slots}  RowSlots */
export default class Row extends SvelteComponentTyped<{
    padding: any;
    style?: string;
    border?: boolean;
    mobile_reverse?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type RowProps = typeof __propDef.props;
export type RowEvents = typeof __propDef.events;
export type RowSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        padding: any;
        style?: string;
        border?: boolean;
        mobile_reverse?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
