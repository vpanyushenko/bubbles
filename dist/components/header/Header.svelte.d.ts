/** @typedef {typeof __propDef.props}  HeaderProps */
/** @typedef {typeof __propDef.events}  HeaderEvents */
/** @typedef {typeof __propDef.slots}  HeaderSlots */
export default class Header extends SvelteComponentTyped<{
    title?: string | undefined;
    caption?: string | undefined;
    buttons?: any[] | undefined;
    subtitle?: string | undefined;
    breadcrumbs?: boolean | undefined;
    breadcrumb_labels?: any[] | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type HeaderProps = typeof __propDef.props;
export type HeaderEvents = typeof __propDef.events;
export type HeaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: string | undefined;
        caption?: string | undefined;
        buttons?: any[] | undefined;
        subtitle?: string | undefined;
        breadcrumbs?: boolean | undefined;
        breadcrumb_labels?: any[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
