/** @typedef {typeof __propDef.props}  CardHeaderProps */
/** @typedef {typeof __propDef.events}  CardHeaderEvents */
/** @typedef {typeof __propDef.slots}  CardHeaderSlots */
export default class CardHeader extends SvelteComponentTyped<{
    title?: string;
    caption?: string;
    border?: boolean;
    buttons?: any[];
    filters?: any[];
    center?: boolean;
    px?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CardHeaderProps = typeof __propDef.props;
export type CardHeaderEvents = typeof __propDef.events;
export type CardHeaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: string;
        caption?: string;
        border?: boolean;
        buttons?: any[];
        filters?: any[];
        center?: boolean;
        px?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
