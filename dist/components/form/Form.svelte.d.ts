/** @typedef {typeof __propDef.props}  FormProps */
/** @typedef {typeof __propDef.events}  FormEvents */
/** @typedef {typeof __propDef.slots}  FormSlots */
export default class Form extends SvelteComponentTyped<{
    id?: string;
    inputs?: any[];
    breakpoint?: number;
}, {
    update: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type FormProps = typeof __propDef.props;
export type FormEvents = typeof __propDef.events;
export type FormSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id?: string;
        inputs?: any[];
        breakpoint?: number;
    };
    events: {
        update: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
