/** @typedef {typeof __propDef.props}  DropdownProps */
/** @typedef {typeof __propDef.events}  DropdownEvents */
/** @typedef {typeof __propDef.slots}  DropdownSlots */
export default class Dropdown extends SvelteComponentTyped<{
    type: "select" | "select-number" | undefined;
    parent: string | undefined;
    search?: boolean | undefined;
    id?: string | undefined;
    value?: string | number | null | undefined;
    options?: import("$types").SelectOption[] | undefined;
    search_threshold?: number | undefined;
    placeholder?: string | undefined;
    empty?: string | undefined;
    create_option?: boolean | undefined;
    align?: "left" | "right" | undefined;
    is_list_open?: boolean | undefined;
    buttons?: import("$types").Button[] | undefined;
}, {
    active: CustomEvent<any>;
    created: CustomEvent<any>;
    select: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type DropdownProps = typeof __propDef.props;
export type DropdownEvents = typeof __propDef.events;
export type DropdownSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        type: import("$types").Dropdown["type"];
        parent: import("$types").Dropdown["parent"];
        search?: import("$types").Dropdown["search"];
        id?: import("$types").Dropdown["id"];
        value?: import("$types").Dropdown["value"];
        options?: import("$types").Dropdown["options"];
        search_threshold?: import("$types").Dropdown["search_threshold"];
        placeholder?: import("$types").Dropdown["placeholder"];
        empty?: import("$types").Dropdown["empty"];
        create_option?: import("$types").Dropdown["create_option"];
        align?: import("$types").Dropdown["align"];
        is_list_open?: import("$types").Dropdown["is_list_open"];
        buttons?: import("$types").Button[] | undefined;
    };
    events: {
        active: CustomEvent<any>;
        created: CustomEvent<any>;
        select: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
