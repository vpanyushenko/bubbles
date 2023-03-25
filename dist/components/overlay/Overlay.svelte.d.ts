/** @typedef {typeof __propDef.props}  OverlayProps */
/** @typedef {typeof __propDef.events}  OverlayEvents */
/** @typedef {typeof __propDef.slots}  OverlaySlots */
export default class Overlay extends SvelteComponentTyped<{
    img?: string;
    id?: string;
    onclick?: () => void;
    colors?: string[];
    background?: "solid" | "gradient";
    solid?: boolean;
    transition_duration?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type OverlayProps = typeof __propDef.props;
export type OverlayEvents = typeof __propDef.events;
export type OverlaySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        img?: string;
        id?: string;
        onclick?: (() => void) | null;
        colors?: Array<string>;
        background?: ("solid" | "gradient") | null;
        solid?: boolean;
        transition_duration?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
