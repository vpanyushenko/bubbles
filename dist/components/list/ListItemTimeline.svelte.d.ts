/** @typedef {typeof __propDef.props}  ListItemTimelineProps */
/** @typedef {typeof __propDef.events}  ListItemTimelineEvents */
/** @typedef {typeof __propDef.slots}  ListItemTimelineSlots */
export default class ListItemTimeline extends SvelteComponentTyped<{
    active?: boolean;
    text?: string;
    label?: string;
    color?: string;
    id?: string;
    icon?: any;
    onclick?: any;
    href?: any;
    new_page?: boolean;
    pulse?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ListItemTimelineProps = typeof __propDef.props;
export type ListItemTimelineEvents = typeof __propDef.events;
export type ListItemTimelineSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        active?: boolean;
        text?: string;
        label?: string;
        color?: string;
        id?: string;
        icon?: any;
        onclick?: any;
        href?: any;
        new_page?: boolean;
        pulse?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
