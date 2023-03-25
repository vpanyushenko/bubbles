/** @typedef {typeof __propDef.props}  CenterProps */
/** @typedef {typeof __propDef.events}  CenterEvents */
/** @typedef {typeof __propDef.slots}  CenterSlots */
export default class Center extends SvelteComponentTyped<{
    px?: number;
    py?: number;
    height100?: boolean;
    max_width?: string | number;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CenterProps = typeof __propDef.props;
export type CenterEvents = typeof __propDef.events;
export type CenterSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        px?: number;
        py?: number;
        height100?: boolean;
        max_width?: number | string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
