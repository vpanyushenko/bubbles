/** @typedef {typeof __propDef.props}  CardProps */
/** @typedef {typeof __propDef.events}  CardEvents */
/** @typedef {typeof __propDef.slots}  CardSlots */
export default class Card extends SvelteComponentTyped<{
    radius?: string;
    footer?: {};
    header?: {};
    animate?: boolean;
    color?: string;
    shadow?: boolean;
    border?: any;
    center?: boolean;
    px?: number;
    py?: number;
    height100?: boolean;
    hide_overflow?: boolean;
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
        radius?: string;
        footer?: {};
        header?: {};
        animate?: boolean;
        color?: string;
        shadow?: boolean;
        border?: any;
        center?: boolean;
        px?: number;
        py?: number;
        height100?: boolean;
        hide_overflow?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
