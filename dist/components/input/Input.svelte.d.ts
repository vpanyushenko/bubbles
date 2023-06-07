/** @typedef {typeof __propDef.props}  InputProps */
/** @typedef {typeof __propDef.events}  InputEvents */
/** @typedef {typeof __propDef.slots}  InputSlots */
export default class Input extends SvelteComponentTyped<{
    id: string;
    bounds: number[] | undefined;
    typeahead: import("$types").typeahead | undefined;
    display_value: string | undefined;
    label: string | undefined;
    desc: string | undefined;
    validation: string | undefined;
    onselect: Function | undefined;
    validate_on_blur?: boolean | undefined;
    type?: import("$types").input_type | undefined;
    value?: any;
    margin?: boolean | undefined;
    rows?: number | undefined;
    autocomplete?: boolean | undefined;
    debounce?: number | undefined;
    disabled?: boolean | undefined;
    extensions?: string[] | undefined;
    typeahead_options?: {
        label: string;
        value: string | number;
    }[] | undefined;
    allow_multiple_files?: boolean | undefined;
    error?: string | undefined;
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
        id: import("$types").Input["id"];
        bounds: import("$types").Input["bounds"];
        typeahead: import("$types").Input["typeahead"];
        display_value: import("$types").Input["display_value"];
        label: import("$types").Input["label"];
        desc: import("$types").Input["desc"];
        validation: import("$types").Input["validation"];
        onselect: import("$types").Input["onselect"];
        validate_on_blur?: import("$types").Input["validate_on_blur"];
        type?: import("$types").input_type | undefined;
        value?: import("$types").Input["value"];
        margin?: import("$types").Input["margin"];
        rows?: import("$types").Input["rows"];
        autocomplete?: import("$types").Input["autocomplete"];
        debounce?: import("$types").Input["debounce"];
        disabled?: import("$types").Input["disabled"];
        extensions?: import("$types").Input["extensions"];
        typeahead_options?: import("$types").Input["typeahead_options"];
        allow_multiple_files?: import("$types").Input["allow_multiple_files"];
        error?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
