/** @typedef {typeof __propDef.props}  DatePickerProps */
/** @typedef {typeof __propDef.events}  DatePickerEvents */
/** @typedef {typeof __propDef.slots}  DatePickerSlots */
export default class DatePicker extends SvelteComponentTyped<{
    value?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type DatePickerProps = typeof __propDef.props;
export type DatePickerEvents = typeof __propDef.events;
export type DatePickerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
