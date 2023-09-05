/** @typedef {typeof __propDef.props}  AvatarProps */
/** @typedef {typeof __propDef.events}  AvatarEvents */
/** @typedef {typeof __propDef.slots}  AvatarSlots */
export default class Avatar extends SvelteComponentTyped<{
    [x: string]: any;
    name: string;
    counter?: number | null | undefined;
    outline?: boolean | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AvatarProps = typeof __propDef.props;
export type AvatarEvents = typeof __propDef.events;
export type AvatarSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name: string;
        counter?: number | null | undefined;
        outline?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
