/** @typedef {typeof __propDef.props}  SkeletonProps */
/** @typedef {typeof __propDef.events}  SkeletonEvents */
/** @typedef {typeof __propDef.slots}  SkeletonSlots */
export default class Skeleton extends SvelteComponentTyped<{
    offset?: number | undefined;
    rows?: number | undefined;
    height?: string | undefined;
    component?: "default" | "header" | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SkeletonProps = typeof __propDef.props;
export type SkeletonEvents = typeof __propDef.events;
export type SkeletonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        offset?: number | undefined;
        rows?: number | undefined;
        height?: string | undefined;
        component?: "default" | "header" | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
