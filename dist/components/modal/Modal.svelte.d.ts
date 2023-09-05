/** @typedef {typeof __propDef.props}  ModalProps */
/** @typedef {typeof __propDef.events}  ModalEvents */
/** @typedef {typeof __propDef.slots}  ModalSlots */
export default class Modal extends SvelteComponentTyped<{
    height: any;
    title?: string | undefined;
    type?: string | undefined;
    id?: string | undefined;
    hideModal?: (() => {}) | undefined;
    lock_scroll?: boolean | undefined;
    hide_on_overlay_click?: boolean | undefined;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type ModalProps = typeof __propDef.props;
export type ModalEvents = typeof __propDef.events;
export type ModalSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        height: any;
        title?: string | undefined;
        type?: string | undefined;
        id?: string | undefined;
        hideModal?: (() => {}) | undefined;
        lock_scroll?: boolean | undefined;
        hide_on_overlay_click?: boolean | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
