/** @typedef {typeof __propDef.props}  HeaderProps */
/** @typedef {typeof __propDef.events}  HeaderEvents */
/** @typedef {typeof __propDef.slots}  HeaderSlots */
export default class Header extends SvelteComponentTyped<{
    title?: string;
    caption?: string;
    subtitle?: string;
    breadcrumbs?: boolean;
    buttons?: any[];
    breadcrumb_labels?: any[];
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
        title?: string;
        caption?: string;
        subtitle?: string;
        breadcrumbs?: boolean;
        buttons?: any[];
        breadcrumb_labels?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
