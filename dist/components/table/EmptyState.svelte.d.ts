/** @typedef {typeof __propDef.props}  EmptyStateProps */
/** @typedef {typeof __propDef.events}  EmptyStateEvents */
/** @typedef {typeof __propDef.slots}  EmptyStateSlots */
export default class EmptyState extends SvelteComponentTyped<{
    text?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EmptyStateProps = typeof __propDef.props;
export type EmptyStateEvents = typeof __propDef.events;
export type EmptyStateSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        text?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
