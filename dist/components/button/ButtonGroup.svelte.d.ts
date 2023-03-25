/** @typedef {typeof __propDef.props}  ButtonGroupProps */
/** @typedef {typeof __propDef.events}  ButtonGroupEvents */
/** @typedef {typeof __propDef.slots}  ButtonGroupSlots */
export default class ButtonGroup extends SvelteComponentTyped<{
    align?: "left" | "right" | "end" | "start";
    larger?: boolean;
    mt?: boolean;
    mb?: boolean;
    buttons?: any[];
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ButtonGroupProps = typeof __propDef.props;
export type ButtonGroupEvents = typeof __propDef.events;
export type ButtonGroupSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        align?: "left" | "right" | "start" | "end";
        larger?: boolean;
        mt?: boolean;
        mb?: boolean;
        buttons?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
