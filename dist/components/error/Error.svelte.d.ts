/** @typedef {typeof __propDef.props}  ErrorProps */
/** @typedef {typeof __propDef.events}  ErrorEvents */
/** @typedef {typeof __propDef.slots}  ErrorSlots */
export default class Error extends SvelteComponentTyped<{
    title?: string | undefined;
    message?: string | undefined;
    img?: null | undefined;
    button?: null | undefined;
    code?: number | undefined;
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
        title?: string | undefined;
        message?: string | undefined;
        img?: null | undefined;
        button?: null | undefined;
        code?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
