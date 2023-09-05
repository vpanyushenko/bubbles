/** @typedef {typeof __propDef.props}  TableCellProps */
/** @typedef {typeof __propDef.events}  TableCellEvents */
/** @typedef {typeof __propDef.slots}  TableCellSlots */
export default class TableCell extends SvelteComponentTyped<{
    img: {
        src?: string | undefined;
        alt?: string | undefined;
    } | undefined;
    checkbox: boolean | undefined;
    tag: import("$types").Tag | undefined;
    button: import("$types").Button | undefined;
    href: string | undefined;
    tooltip: string | undefined;
    width: number | "min" | undefined;
    captions: string[] | undefined;
    mobile_width: number | "min" | undefined;
    sw: any;
    text?: string | undefined;
    id?: string | undefined;
    caption?: string | undefined;
    code?: boolean | undefined;
    empty?: boolean | undefined;
    align?: "left" | "right" | undefined;
    preload?: "hover" | "tap" | "off" | undefined;
    large?: boolean | undefined;
    bold?: boolean | undefined;
    wrap?: boolean | undefined;
    mobile_wrap?: boolean | undefined;
    mobile_order?: number | undefined;
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
        img: import("$types").TableCell["img"];
        checkbox: import("$types").TableCell["checkbox"];
        tag: import("$types").TableCell["tag"];
        button: import("$types").TableCell["button"];
        href: import("$types").TableCell["href"];
        tooltip: import("$types").TableCell["tooltip"];
        width: import("$types").TableCell["width"];
        captions: import("$types").TableCell["captions"];
        mobile_width: import("$types").TableCell["mobile_width"];
        sw: any;
        text?: import("$types").TableCell["text"];
        id?: import("$types").TableCell["id"];
        caption?: import("$types").TableCell["caption"];
        code?: import("$types").TableCell["code"];
        empty?: import("$types").TableCell["empty"];
        align?: import("$types").TableCell["align"];
        preload?: import("$types").TableCell["preload"];
        large?: import("$types").TableCell["large"];
        bold?: import("$types").TableCell["bold"];
        wrap?: import("$types").TableCell["wrap"];
        mobile_wrap?: import("$types").TableCell["mobile_wrap"];
        mobile_order?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
