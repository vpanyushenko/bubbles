/** @typedef {typeof __propDef.props}  CheckboxGroupProps */
/** @typedef {typeof __propDef.events}  CheckboxGroupEvents */
/** @typedef {typeof __propDef.slots}  CheckboxGroupSlots */
export default class CheckboxGroup extends SvelteComponentTyped<{
    error?: string;
    label?: string;
    desc?: string;
    value?: any[];
    id?: string;
    options?: any[];
    validation?: any;
    form_indent?: boolean;
    background?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CheckboxGroupProps = typeof __propDef.props;
export type CheckboxGroupEvents = typeof __propDef.events;
export type CheckboxGroupSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        error?: string;
        label?: string;
        desc?: string;
        value?: any[];
        id?: string;
        options?: any[];
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
