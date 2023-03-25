/** @typedef {typeof __propDef.props}  SidebarProps */
/** @typedef {typeof __propDef.events}  SidebarEvents */
/** @typedef {typeof __propDef.slots}  SidebarSlots */
export default class Sidebar extends SvelteComponentTyped<{
    padding?: string;
    onclick?: any;
    href?: string;
    sections?: any[];
    logo?: any;
    logo_dark?: any;
    flat?: boolean;
    invert_dark_mode?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SidebarProps = typeof __propDef.props;
export type SidebarEvents = typeof __propDef.events;
export type SidebarSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        padding?: string;
        onclick?: any;
        href?: string;
        sections?: any[];
        logo?: any;
        logo_dark?: any;
        flat?: boolean;
        invert_dark_mode?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
