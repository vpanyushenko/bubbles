/** @typedef {typeof __propDef.props}  SelectProps */
/** @typedef {typeof __propDef.events}  SelectEvents */
/** @typedef {typeof __propDef.slots}  SelectSlots */
export default class Select extends SvelteComponentTyped<{
    validate_on_blur?: boolean;
    debug?: boolean;
    type?: string;
    search?: boolean;
    error?: string;
    label?: string;
    desc?: any;
    value?: any;
    id?: string;
    options?: any[];
    search_threshold?: number;
    onselect?: any;
    min_width?: boolean;
    validation?: any;
    vob?: boolean;
    prefix_options?: any[];
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
        validate_on_blur?: boolean;
        debug?: boolean;
        type?: string;
        search?: boolean;
        error?: string;
        label?: string;
        desc?: any;
        value?: any;
        id?: string;
        options?: any[];
        search_threshold?: number;
        onselect?: any;
        min_width?: boolean;
        validation?: any;
        vob?: boolean;
        prefix_options?: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
