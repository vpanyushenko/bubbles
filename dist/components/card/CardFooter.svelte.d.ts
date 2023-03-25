/** @typedef {typeof __propDef.props}  CardFooterProps */
/** @typedef {typeof __propDef.events}  CardFooterEvents */
/** @typedef {typeof __propDef.slots}  CardFooterSlots */
export default class CardFooter extends SvelteComponentTyped<{
    align?: string;
    pagination?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CardFooterProps = typeof __propDef.props;
export type CardFooterEvents = typeof __propDef.events;
export type CardFooterSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        align?: string;
        pagination?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
