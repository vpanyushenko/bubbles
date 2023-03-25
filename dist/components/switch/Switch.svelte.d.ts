/** @typedef {typeof __propDef.props}  SwitchProps */
/** @typedef {typeof __propDef.events}  SwitchEvents */
/** @typedef {typeof __propDef.slots}  SwitchSlots */
export default class Switch extends SvelteComponentTyped<{
    disabled?: boolean;
    value?: boolean;
    id?: string;
    onclick?: any;
    onselect?: any;
    onchange?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SwitchProps = typeof __propDef.props;
export type SwitchEvents = typeof __propDef.events;
export type SwitchSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        disabled?: boolean;
        value?: boolean;
        id?: string;
        onclick?: any;
        onselect?: any;
        onchange?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
