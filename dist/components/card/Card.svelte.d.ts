/** @typedef {typeof __propDef.props}  CardProps */
/** @typedef {typeof __propDef.events}  CardEvents */
/** @typedef {typeof __propDef.slots}  CardSlots */
export default class Card extends SvelteComponentTyped<{
    radius?: "rounded" | "blocky" | undefined;
    footer?: {} | undefined;
    header?: {} | undefined;
    animate?: boolean | undefined;
    color?: string | undefined;
    shadow?: boolean | undefined;
    center?: boolean | undefined;
    border?: null | undefined;
    px?: number | undefined;
    py?: number | undefined;
    height100?: boolean | undefined;
    hide_overflow?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CardProps = typeof __propDef.props;
export type CardEvents = typeof __propDef.events;
export type CardSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        radius?: "rounded" | "blocky" | undefined;
        footer?: {} | undefined;
        header?: {} | undefined;
        animate?: boolean | undefined;
        color?: string | undefined;
        shadow?: boolean | undefined;
        center?: boolean | undefined;
        border?: null | undefined;
        px?: number | undefined;
        py?: number | undefined;
        height100?: boolean | undefined;
        hide_overflow?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
