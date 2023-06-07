/** @typedef {typeof __propDef.props}  ListItemProps */
/** @typedef {typeof __propDef.events}  ListItemEvents */
/** @typedef {typeof __propDef.slots}  ListItemSlots */
export default class ListItem extends SvelteComponentTyped<{
    text?: string | undefined;
    tag?: null | undefined;
    id?: string | undefined;
    label?: string | undefined;
    href?: null | undefined;
    icon?: null | undefined;
    onclick?: null | undefined;
    new_page?: boolean | undefined;
    timeline?: boolean | undefined;
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
        text?: string | undefined;
        tag?: null | undefined;
        id?: string | undefined;
        label?: string | undefined;
        href?: null | undefined;
        icon?: null | undefined;
        onclick?: null | undefined;
        new_page?: boolean | undefined;
        timeline?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
