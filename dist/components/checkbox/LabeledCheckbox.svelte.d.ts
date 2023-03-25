/** @typedef {typeof __propDef.props}  LabeledCheckboxProps */
/** @typedef {typeof __propDef.events}  LabeledCheckboxEvents */
/** @typedef {typeof __propDef.slots}  LabeledCheckboxSlots */
export default class LabeledCheckbox extends SvelteComponentTyped<{
    error?: string;
    label?: string;
    desc?: string;
    value?: any;
    id?: string;
    validation?: any;
    form_indent?: boolean;
    background?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type LabeledCheckboxProps = typeof __propDef.props;
export type LabeledCheckboxEvents = typeof __propDef.events;
export type LabeledCheckboxSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        error?: string;
        label?: string;
        desc?: string;
        value?: any;
        id?: string;
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
