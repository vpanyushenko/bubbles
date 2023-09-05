/** @typedef {typeof __propDef.props}  RadioGroupProps */
/** @typedef {typeof __propDef.events}  RadioGroupEvents */
/** @typedef {typeof __propDef.slots}  RadioGroupSlots */
export default class RadioGroup extends SvelteComponentTyped<{
    id?: null | undefined;
    value?: null | undefined;
    label?: string | undefined;
    error?: string | undefined;
    desc?: string | undefined;
    validation?: null | undefined;
    options?: any[] | undefined;
    style?: string | undefined;
    focus?: boolean | undefined;
    form_indent?: boolean | undefined;
    background?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type RadioGroupProps = typeof __propDef.props;
export type RadioGroupEvents = typeof __propDef.events;
export type RadioGroupSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id?: null | undefined;
        value?: null | undefined;
        label?: string | undefined;
        error?: string | undefined;
        desc?: string | undefined;
        validation?: null | undefined;
        options?: any[] | undefined;
        style?: string | undefined;
        focus?: boolean | undefined;
        form_indent?: boolean | undefined;
        background?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
