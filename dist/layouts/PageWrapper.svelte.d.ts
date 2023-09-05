/** @typedef {typeof __propDef.props}  PageWrapperProps */
/** @typedef {typeof __propDef.events}  PageWrapperEvents */
/** @typedef {typeof __propDef.slots}  PageWrapperSlots */
export default class PageWrapper extends SvelteComponentTyped<{
    max_content_width?: number | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type PageWrapperProps = typeof __propDef.props;
export type PageWrapperEvents = typeof __propDef.events;
export type PageWrapperSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        max_content_width?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
