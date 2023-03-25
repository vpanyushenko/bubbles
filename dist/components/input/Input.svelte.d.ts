/** @typedef {typeof __propDef.props}  InputProps */
/** @typedef {typeof __propDef.events}  InputEvents */
/** @typedef {typeof __propDef.slots}  InputSlots */
export default class Input extends SvelteComponentTyped<{
    label: any;
    desc: any;
    id: any;
    validate_on_blur?: boolean;
    type?: string;
    disabled?: boolean;
    error?: string;
    value?: any;
    typeahead?: any;
    onselect?: any;
    debounce?: number;
    margin?: boolean;
    validation?: any;
    bounds?: any;
    rows?: number;
    autocomplete?: boolean;
    vob?: boolean;
    extensions?: string[];
    typeahead_options?: any[];
    allow_multiple_files?: boolean;
    display_value?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type InputProps = typeof __propDef.props;
export type InputEvents = typeof __propDef.events;
export type InputSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label: any;
        desc: any;
        id: any;
        validate_on_blur?: boolean;
        type?: string;
        disabled?: boolean;
        error?: string;
        value?: any;
        typeahead?: any;
        onselect?: any;
        debounce?: number;
        margin?: boolean;
        validation?: any;
        bounds?: any;
        rows?: number;
        autocomplete?: boolean;
        vob?: boolean;
        extensions?: string[];
        typeahead_options?: any[];
        allow_multiple_files?: boolean;
        display_value?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
