/** @typedef {typeof __propDef.props}  OverlayProps */
/** @typedef {typeof __propDef.events}  OverlayEvents */
/** @typedef {typeof __propDef.slots}  OverlaySlots */
export default class Overlay extends SvelteComponentTyped<{
    img?: string | undefined;
    id?: string | undefined;
    onclick?: (() => void) | null | undefined;
    colors?: string[] | undefined;
    background?: "solid" | "gradient" | null | undefined;
    solid?: boolean | undefined;
    transition_duration?: number | undefined;
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
        img?: string | undefined;
        id?: string | undefined;
        onclick?: (() => void) | null | undefined;
        colors?: string[] | undefined;
        background?: "solid" | "gradient" | null | undefined;
        solid?: boolean | undefined;
        transition_duration?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
