/** @typedef {typeof __propDef.props}  DividerProps */
/** @typedef {typeof __propDef.events}  DividerEvents */
/** @typedef {typeof __propDef.slots}  DividerSlots */
export default class Divider extends SvelteComponentTyped<{
    label: string | undefined;
    image: string | undefined;
    tag: import("$types").Tag | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type DividerProps = typeof __propDef.props;
export type DividerEvents = typeof __propDef.events;
export type DividerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label: string | undefined;
        image: string | undefined;
        tag: import("$types").Tag | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
