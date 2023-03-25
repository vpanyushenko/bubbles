/** @typedef {typeof __propDef.props}  TableCellProps */
/** @typedef {typeof __propDef.events}  TableCellEvents */
/** @typedef {typeof __propDef.slots}  TableCellSlots */
export default class TableCell extends SvelteComponentTyped<{
    img?: any;
    text?: string;
    checkbox?: any;
    tag?: any;
    button?: any;
    caption?: string;
    code?: boolean;
    id?: string;
    empty?: boolean;
    align?: "left" | "right";
    href?: any;
    preload?: "hover" | "tap" | "off";
    tooltip?: any;
    width?: any;
    captions?: any;
    large?: boolean;
    bold?: boolean;
    mobile_width?: number;
    mobile_order?: number;
    wrap?: boolean;
    mobile_wrap?: boolean;
    sw?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TableCellProps = typeof __propDef.props;
export type TableCellEvents = typeof __propDef.events;
export type TableCellSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        img?: any;
        text?: string;
        checkbox?: any;
        tag?: any;
        button?: any;
        caption?: string;
        code?: boolean;
        id?: string;
        empty?: boolean;
        align?: ("left" | "right");
        href?: any;
        preload?: "hover" | "tap" | "off";
        tooltip?: any;
        width?: any;
        captions?: any;
        large?: boolean;
        bold?: boolean;
        mobile_width?: number | null;
        mobile_order?: number;
        wrap?: boolean;
        mobile_wrap?: boolean;
        sw?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
