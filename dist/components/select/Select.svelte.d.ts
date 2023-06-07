/** @typedef {typeof __propDef.props}  SelectProps */
/** @typedef {typeof __propDef.events}  SelectEvents */
/** @typedef {typeof __propDef.slots}  SelectSlots */
export default class Select extends SvelteComponentTyped<{
    onselect: import("$types").onselect | undefined;
    validate_on_blur?: boolean | undefined;
    debug?: boolean | undefined;
    type?: "select" | undefined;
    search?: boolean | undefined;
    id?: string | undefined;
    value?: any;
    label?: string | undefined;
    error?: string | undefined;
    desc?: string | undefined;
    validation?: string | undefined;
    options?: import("$types").SelectOption[] | undefined;
    prefix_options?: import("$types").SelectOption[] | undefined;
    search_threshold?: number | undefined;
    min_width?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SelectProps = typeof __propDef.props;
export type SelectEvents = typeof __propDef.events;
export type SelectSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        onselect: import("$types").Select["onselect"];
        validate_on_blur?: import("$types").Select["validate_on_blur"];
        debug?: boolean | undefined;
        type?: "select" | undefined;
        search?: boolean | undefined;
        id?: string | undefined;
        value?: import("$types").Select["value"];
        label?: import("$types").Select["label"];
        error?: string | undefined;
        desc?: import("$types").Select["desc"];
        validation?: string | undefined;
        options?: import("$types").SelectOption[] | undefined;
        prefix_options?: import("$types").Select["prefix_options"];
        search_threshold?: import("$types").Select["search_threshold"];
        min_width?: import("$types").Select["min_width"];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
