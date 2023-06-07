/** @typedef {typeof __propDef.props}  LabeledCheckboxProps */
/** @typedef {typeof __propDef.events}  LabeledCheckboxEvents */
/** @typedef {typeof __propDef.slots}  LabeledCheckboxSlots */
export default class LabeledCheckbox extends SvelteComponentTyped<{
    id?: string | undefined;
    value?: null | undefined;
    label?: string | undefined;
    error?: string | undefined;
    desc?: string | undefined;
    validation?: null | undefined;
    form_indent?: boolean | undefined;
    background?: boolean | undefined;
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
        id?: string | undefined;
        value?: null | undefined;
        label?: string | undefined;
        error?: string | undefined;
        desc?: string | undefined;
        validation?: null | undefined;
        form_indent?: boolean | undefined;
        background?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
