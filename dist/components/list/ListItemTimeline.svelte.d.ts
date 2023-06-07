/** @typedef {typeof __propDef.props}  ListItemTimelineProps */
/** @typedef {typeof __propDef.events}  ListItemTimelineEvents */
/** @typedef {typeof __propDef.slots}  ListItemTimelineSlots */
export default class ListItemTimeline extends SvelteComponentTyped<{
    active?: boolean | undefined;
    text?: string | undefined;
    id?: string | undefined;
    label?: string | undefined;
    href?: null | undefined;
    color?: string | undefined;
    icon?: null | undefined;
    onclick?: null | undefined;
    new_page?: boolean | undefined;
    pulse?: boolean | undefined;
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
        active?: boolean | undefined;
        text?: string | undefined;
        id?: string | undefined;
        label?: string | undefined;
        href?: null | undefined;
        color?: string | undefined;
        icon?: null | undefined;
        onclick?: null | undefined;
        new_page?: boolean | undefined;
        pulse?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
