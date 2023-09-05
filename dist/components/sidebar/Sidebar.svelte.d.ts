/** @typedef {typeof __propDef.props}  SidebarProps */
/** @typedef {typeof __propDef.events}  SidebarEvents */
/** @typedef {typeof __propDef.slots}  SidebarSlots */
export default class Sidebar extends SvelteComponentTyped<{
    padding?: "roomy" | "compact" | undefined;
    flat?: boolean | undefined;
    href?: string | undefined;
    onclick?: null | undefined;
    sections?: any[] | undefined;
    logo?: null | undefined;
    logo_dark?: null | undefined;
    invert_dark_mode?: boolean | undefined;
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
        padding?: "roomy" | "compact" | undefined;
        flat?: boolean | undefined;
        href?: string | undefined;
        onclick?: null | undefined;
        sections?: any[] | undefined;
        logo?: null | undefined;
        logo_dark?: null | undefined;
        invert_dark_mode?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
