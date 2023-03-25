/** @typedef {typeof __propDef.props}  ModalContainerProps */
/** @typedef {typeof __propDef.events}  ModalContainerEvents */
/** @typedef {typeof __propDef.slots}  ModalContainerSlots */
export default class ModalContainer extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ModalContainerProps = typeof __propDef.props;
export type ModalContainerEvents = typeof __propDef.events;
export type ModalContainerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
