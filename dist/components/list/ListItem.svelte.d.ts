/** @typedef {typeof __propDef.props}  ListItemProps */
/** @typedef {typeof __propDef.events}  ListItemEvents */
/** @typedef {typeof __propDef.slots}  ListItemSlots */
export default class ListItem extends SvelteComponentTyped<{
    text?: string;
    tag?: any;
    label?: string;
    id?: string;
    icon?: any;
    onclick?: any;
    href?: any;
    new_page?: boolean;
    timeline?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ListItemProps = typeof __propDef.props;
export type ListItemEvents = typeof __propDef.events;
export type ListItemSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text?: string;
        tag?: any;
        label?: string;
        id?: string;
        icon?: any;
        onclick?: any;
        href?: any;
        new_page?: boolean;
        timeline?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
