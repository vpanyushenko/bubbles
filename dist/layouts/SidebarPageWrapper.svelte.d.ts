/** @typedef {typeof __propDef.props}  SidebarPageWrapperProps */
/** @typedef {typeof __propDef.events}  SidebarPageWrapperEvents */
/** @typedef {typeof __propDef.slots}  SidebarPageWrapperSlots */
export default class SidebarPageWrapper extends SvelteComponentTyped<{
    max_content_width?: number | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type SidebarPageWrapperProps = typeof __propDef.props;
export type SidebarPageWrapperEvents = typeof __propDef.events;
export type SidebarPageWrapperSlots = typeof __propDef.slots;
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
