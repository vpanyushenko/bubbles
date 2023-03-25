/** @typedef {typeof __propDef.props}  LabeledSwitchProps */
/** @typedef {typeof __propDef.events}  LabeledSwitchEvents */
/** @typedef {typeof __propDef.slots}  LabeledSwitchSlots */
export default class LabeledSwitch extends SvelteComponentTyped<{
    disabled?: boolean;
    error?: string;
    label?: string;
    desc?: string;
    value?: boolean;
    id?: string;
    onclick?: any;
    onselect?: any;
    onchange?: any;
    validation?: any;
    form_indent?: boolean;
    background?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LabeledSwitchProps = typeof __propDef.props;
export type LabeledSwitchEvents = typeof __propDef.events;
export type LabeledSwitchSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        disabled?: boolean;
        error?: string;
        label?: string;
        desc?: string;
        value?: boolean;
        id?: string;
        onclick?: any;
        onselect?: any;
        onchange?: any;
        validation?: any;
        form_indent?: boolean;
        background?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
