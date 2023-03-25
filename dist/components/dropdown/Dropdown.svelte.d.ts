/** @typedef {typeof __propDef.props}  DropdownProps */
/** @typedef {typeof __propDef.events}  DropdownEvents */
/** @typedef {typeof __propDef.slots}  DropdownSlots */
export default class Dropdown extends SvelteComponentTyped<{
    parent: any;
    type?: any;
    search?: boolean;
    value?: any;
    id?: string;
    options?: any[];
    placeholder?: string;
    empty?: string;
    create_option?: boolean;
    search_threshold?: number;
    align?: string;
    is_list_open?: boolean;
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
        parent: any;
        type?: any;
        search?: boolean;
        value?: any;
        id?: string;
        options?: any[];
        placeholder?: string;
        empty?: string;
        create_option?: boolean;
        search_threshold?: number;
        align?: string;
        is_list_open?: boolean;
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
