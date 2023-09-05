/** @typedef {typeof __propDef.props}  StripeCardInputProps */
/** @typedef {typeof __propDef.events}  StripeCardInputEvents */
/** @typedef {typeof __propDef.slots}  StripeCardInputSlots */
export default class StripeCardInput extends SvelteComponentTyped<{
    id: any;
    __stripe: any;
    __stripe_card: any;
    label: any;
    error: any;
    desc: any;
    margin?: boolean | undefined;
    stripe_key_name?: string | undefined;
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
        id: any;
        __stripe: any;
        __stripe_card: any;
        label: any;
        error: any;
        desc: any;
        margin?: boolean | undefined;
        stripe_key_name?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
