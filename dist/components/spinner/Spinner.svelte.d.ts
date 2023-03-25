/** @typedef {typeof __propDef.props}  SpinnerProps */
/** @typedef {typeof __propDef.events}  SpinnerEvents */
/** @typedef {typeof __propDef.slots}  SpinnerSlots */
export default class Spinner extends SvelteComponentTyped<{
    size?: number;
    color?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SpinnerProps = typeof __propDef.props;
export type SpinnerEvents = typeof __propDef.events;
export type SpinnerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        size?: number;
        color?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
