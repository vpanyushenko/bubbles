/** @typedef {typeof __propDef.props}  CenterProps */
/** @typedef {typeof __propDef.events}  CenterEvents */
/** @typedef {typeof __propDef.slots}  CenterSlots */
export default class Center extends SvelteComponentTyped<{
    px?: number | undefined;
    py?: number | undefined;
    height100?: boolean | undefined;
    max_width?: string | number | undefined;
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
        px?: number | undefined;
        py?: number | undefined;
        height100?: boolean | undefined;
        max_width?: string | number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
