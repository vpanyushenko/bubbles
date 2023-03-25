/** @typedef {typeof __propDef.props}  ModalHeaderProps */
/** @typedef {typeof __propDef.events}  ModalHeaderEvents */
/** @typedef {typeof __propDef.slots}  ModalHeaderSlots */
export default class ModalHeader extends SvelteComponentTyped<{
    title?: string;
    caption?: string;
    buttons?: any[];
    hideModal?: () => {};
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ModalHeaderProps = typeof __propDef.props;
export type ModalHeaderEvents = typeof __propDef.events;
export type ModalHeaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: string;
        caption?: string;
        buttons?: any[];
        hideModal?: () => {};
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
