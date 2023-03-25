/** @typedef {typeof __propDef.props}  PageTransitionWrapperProps */
/** @typedef {typeof __propDef.events}  PageTransitionWrapperEvents */
/** @typedef {typeof __propDef.slots}  PageTransitionWrapperSlots */
export default class PageTransitionWrapper extends SvelteComponentTyped<{
    max_content_width?: number;
    refresh?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type PageTransitionWrapperProps = typeof __propDef.props;
export type PageTransitionWrapperEvents = typeof __propDef.events;
export type PageTransitionWrapperSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        max_content_width?: number;
        refresh?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
