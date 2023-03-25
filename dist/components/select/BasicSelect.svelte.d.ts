/** @typedef {typeof __propDef.props}  BasicSelectProps */
/** @typedef {typeof __propDef.events}  BasicSelectEvents */
/** @typedef {typeof __propDef.slots}  BasicSelectSlots */
export default class BasicSelect extends SvelteComponentTyped<{
    value?: any;
    id?: string;
    options?: any[];
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type BasicSelectProps = typeof __propDef.props;
export type BasicSelectEvents = typeof __propDef.events;
export type BasicSelectSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
        id?: string;
        options?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
