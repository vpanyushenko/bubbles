/** @typedef {typeof __propDef.props}  SegmentedControllerProps */
/** @typedef {typeof __propDef.events}  SegmentedControllerEvents */
/** @typedef {typeof __propDef.slots}  SegmentedControllerSlots */
export default class SegmentedController extends SvelteComponentTyped<{
    value: any;
    style?: string | undefined;
    mt?: null | undefined;
    mb?: null | undefined;
    segments?: any[] | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SegmentedControllerProps = typeof __propDef.props;
export type SegmentedControllerEvents = typeof __propDef.events;
export type SegmentedControllerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: any;
        style?: string | undefined;
        mt?: null | undefined;
        mb?: null | undefined;
        segments?: any[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
