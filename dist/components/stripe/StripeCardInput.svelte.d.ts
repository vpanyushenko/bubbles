/** @typedef {typeof __propDef.props}  StripeCardInputProps */
/** @typedef {typeof __propDef.events}  StripeCardInputEvents */
/** @typedef {typeof __propDef.slots}  StripeCardInputSlots */
export default class StripeCardInput extends SvelteComponentTyped<{
    error: any;
    label: any;
    desc: any;
    id: any;
    __stripe_card: any;
    __stripe: any;
    margin?: boolean;
    stripe_key_name?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type StripeCardInputProps = typeof __propDef.props;
export type StripeCardInputEvents = typeof __propDef.events;
export type StripeCardInputSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        error: any;
        label: any;
        desc: any;
        id: any;
        __stripe_card: any;
        __stripe: any;
        margin?: boolean;
        stripe_key_name?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
