/** @typedef {typeof __propDef.props}  SwitchProps */
/** @typedef {typeof __propDef.events}  SwitchEvents */
/** @typedef {typeof __propDef.slots}  SwitchSlots */
export default class Switch extends SvelteComponentTyped<{
    id?: string | undefined;
    value?: boolean | undefined;
    disabled?: boolean | undefined;
    onselect?: null | undefined;
    onclick?: null | undefined;
    onchange?: null | undefined;
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
        id?: string | undefined;
        value?: boolean | undefined;
        disabled?: boolean | undefined;
        onselect?: null | undefined;
        onclick?: null | undefined;
        onchange?: null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
