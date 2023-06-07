/** @typedef {typeof __propDef.props}  CheckboxProps */
/** @typedef {typeof __propDef.events}  CheckboxEvents */
/** @typedef {typeof __propDef.slots}  CheckboxSlots */
export default class Checkbox extends SvelteComponentTyped<{
    value?: null | undefined;
    onchange?: null | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type CheckboxProps = typeof __propDef.props;
export type CheckboxEvents = typeof __propDef.events;
export type CheckboxSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: null | undefined;
        onchange?: null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
