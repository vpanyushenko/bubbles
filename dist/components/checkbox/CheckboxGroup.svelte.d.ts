/** @typedef {typeof __propDef.props}  CheckboxGroupProps */
/** @typedef {typeof __propDef.events}  CheckboxGroupEvents */
/** @typedef {typeof __propDef.slots}  CheckboxGroupSlots */
export default class CheckboxGroup extends SvelteComponentTyped<{
    id?: string | undefined;
    value?: any[] | undefined;
    label?: string | undefined;
    error?: string | undefined;
    desc?: string | undefined;
    validation?: null | undefined;
    options?: any[] | undefined;
    form_indent?: boolean | undefined;
    background?: boolean | undefined;
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
        id?: string | undefined;
        value?: any[] | undefined;
        label?: string | undefined;
        error?: string | undefined;
        desc?: string | undefined;
        validation?: null | undefined;
        options?: any[] | undefined;
        form_indent?: boolean | undefined;
        background?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
