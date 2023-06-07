/** @typedef {typeof __propDef.props}  SkeletonSvgProps */
/** @typedef {typeof __propDef.events}  SkeletonSvgEvents */
/** @typedef {typeof __propDef.slots}  SkeletonSvgSlots */
export default class SkeletonSvg extends SvelteComponentTyped<{
    height?: string | undefined;
    animate?: boolean | undefined;
    width?: string | undefined;
    speed?: number | undefined;
    secondary_color_percent_width?: number | undefined;
    aria_label?: string | null | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type SkeletonSvgProps = typeof __propDef.props;
export type SkeletonSvgEvents = typeof __propDef.events;
export type SkeletonSvgSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        height?: string | undefined;
        animate?: boolean | undefined;
        width?: string | undefined;
        speed?: number | undefined;
        secondary_color_percent_width?: number | undefined;
        aria_label?: (string | null) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
