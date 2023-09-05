/** @typedef {typeof __propDef.props}  ButtonProps */
/** @typedef {typeof __propDef.events}  ButtonEvents */
/** @typedef {typeof __propDef.slots}  ButtonSlots */
export default class Button extends SvelteComponentTyped<{
    typeahead: import("$types").typeahead | undefined;
    label: string | undefined;
    href: string | undefined;
    style: string | undefined;
    icon: string | undefined;
    onclick: Function | undefined;
    counter: number | undefined;
    __search_width_100: string;
    __search_id: string;
    onsubmit: Function | undefined;
    radius?: "rounded" | "blocky" | undefined;
    dark_mode_invert?: boolean | undefined;
    type?: "button" | "submit" | "reset" | undefined;
    search?: boolean | undefined;
    id?: string | undefined;
    debounce?: number | undefined;
    disabled?: boolean | undefined;
    color?: string | undefined;
    new_page?: boolean | undefined;
    larger?: boolean | undefined;
    shadow?: boolean | undefined;
    mt?: boolean | undefined;
    mb?: boolean | undefined;
    wide?: boolean | undefined;
    preload?: "hover" | "tap" | "off" | undefined;
}, {
    click: MouseEvent;
    keydown: CustomEvent<any>;
    submit: SubmitEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        typeahead: import("$types").Button["typeahead"];
        label: import("$types").Button["label"];
        href: import("$types").Button["href"];
        style: import("$types").Button["style"];
        icon: import("$types").Button["icon"];
        onclick: import("$types").Button["onclick"];
        counter: import("$types").Button["counter"];
        __search_width_100: string;
        __search_id: string;
        onsubmit: import("$types").Button["onsubmit"];
        radius?: import("$types").Button["radius"];
        dark_mode_invert?: import("$types").Button["dark_mode_invert"];
        type?: import("$types").Button["type"];
        search?: import("$types").Button["search"];
        id?: import("$types").Button["id"];
        debounce?: import("$types").Button["debounce"];
        disabled?: import("$types").Button["disabled"];
        color?: import("$types").Button["color"];
        new_page?: import("$types").Button["new_page"];
        larger?: import("$types").Button["larger"];
        shadow?: import("$types").Button["shadow"];
        mt?: import("$types").Button["mt"];
        mb?: import("$types").Button["mb"];
        wide?: import("$types").Button["wide"];
        preload?: import("$types").Button["preload"];
    };
    events: {
        click: MouseEvent;
        keydown: CustomEvent<any>;
        submit: SubmitEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
