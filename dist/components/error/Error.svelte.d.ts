/** @typedef {typeof __propDef.props}  ErrorProps */
/** @typedef {typeof __propDef.events}  ErrorEvents */
/** @typedef {typeof __propDef.slots}  ErrorSlots */
export default class Error extends SvelteComponentTyped<{
    title?: string;
    message?: string;
    img?: any;
    button?: any;
    code?: number;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ErrorProps = typeof __propDef.props;
export type ErrorEvents = typeof __propDef.events;
export type ErrorSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: string;
        message?: string;
        img?: any;
        button?: any;
        code?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
