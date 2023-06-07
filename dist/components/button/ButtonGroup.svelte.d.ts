/** @typedef {typeof __propDef.props}  ButtonGroupProps */
/** @typedef {typeof __propDef.events}  ButtonGroupEvents */
/** @typedef {typeof __propDef.slots}  ButtonGroupSlots */
export default class ButtonGroup extends SvelteComponentTyped<{
    align?: "left" | "right" | "end" | "start" | undefined;
    buttons?: any[] | undefined;
    larger?: boolean | undefined;
    mt?: boolean | undefined;
    mb?: boolean | undefined;
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
        align?: "left" | "right" | "end" | "start" | undefined;
        buttons?: any[] | undefined;
        larger?: boolean | undefined;
        mt?: boolean | undefined;
        mb?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
