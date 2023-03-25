/** @typedef {typeof __propDef.props}  TableHeaderProps */
/** @typedef {typeof __propDef.events}  TableHeaderEvents */
/** @typedef {typeof __propDef.slots}  TableHeaderSlots */
export default class TableHeader extends SvelteComponentTyped<{
    hidden?: boolean;
    cells?: any[];
}, {
    sort: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type TableHeaderProps = typeof __propDef.props;
export type TableHeaderEvents = typeof __propDef.events;
export type TableHeaderSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        hidden?: boolean;
        cells?: any[];
    };
    events: {
        sort: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
