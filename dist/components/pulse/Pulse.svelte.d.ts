/** @typedef {typeof __propDef.props}  PulseProps */
/** @typedef {typeof __propDef.events}  PulseEvents */
/** @typedef {typeof __propDef.slots}  PulseSlots */
export default class Pulse extends SvelteComponentTyped<{
    dark_mode_invert?: boolean | undefined;
    animate?: boolean | undefined;
    color?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PulseProps = typeof __propDef.props;
export type PulseEvents = typeof __propDef.events;
export type PulseSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        dark_mode_invert?: boolean | undefined;
        animate?: boolean | undefined;
        color?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
