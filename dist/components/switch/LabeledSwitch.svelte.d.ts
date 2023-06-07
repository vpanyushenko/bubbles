/** @typedef {typeof __propDef.props}  LabeledSwitchProps */
/** @typedef {typeof __propDef.events}  LabeledSwitchEvents */
/** @typedef {typeof __propDef.slots}  LabeledSwitchSlots */
export default class LabeledSwitch extends SvelteComponentTyped<{
    id?: string | undefined;
    value?: boolean | undefined;
    disabled?: boolean | undefined;
    label?: string | undefined;
    error?: string | undefined;
    desc?: string | undefined;
    validation?: null | undefined;
    onselect?: null | undefined;
    onclick?: null | undefined;
    onchange?: null | undefined;
    form_indent?: boolean | undefined;
    background?: boolean | undefined;
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
        id?: string | undefined;
        value?: boolean | undefined;
        disabled?: boolean | undefined;
        label?: string | undefined;
        error?: string | undefined;
        desc?: string | undefined;
        validation?: null | undefined;
        onselect?: null | undefined;
        onclick?: null | undefined;
        onchange?: null | undefined;
        form_indent?: boolean | undefined;
        background?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
