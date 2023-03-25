/** @typedef {typeof __propDef.props}  RadioGroupProps */
/** @typedef {typeof __propDef.events}  RadioGroupEvents */
/** @typedef {typeof __propDef.slots}  RadioGroupSlots */
export default class RadioGroup extends SvelteComponentTyped<{
    error?: string;
    label?: string;
    style?: string;
    desc?: string;
    value?: any;
    id?: any;
    options?: any[];
    validation?: any;
    form_indent?: boolean;
    background?: boolean;
    focus?: boolean;
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
        error?: string;
        label?: string;
        style?: string;
        desc?: string;
        value?: any;
        id?: any;
        options?: any[];
        validation?: any;
        form_indent?: boolean;
        background?: boolean;
        focus?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
