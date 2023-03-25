/** @typedef {typeof __propDef.props}  GalleryProps */
/** @typedef {typeof __propDef.events}  GalleryEvents */
/** @typedef {typeof __propDef.slots}  GallerySlots */
export default class Gallery extends SvelteComponentTyped<{
    title?: any;
    id?: string;
    buttons?: any[];
    page?: number;
    pagination?: boolean;
    images?: string[];
    grid?: string;
    overlay_buttons?: any[];
    previous_icon?: string;
    next_icon?: string;
    new_image?: Function;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type GalleryProps = typeof __propDef.props;
export type GalleryEvents = typeof __propDef.events;
export type GallerySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: any;
        id?: string;
        buttons?: any[];
        page?: number;
        pagination?: boolean;
        images?: string[];
        grid?: string;
        overlay_buttons?: any[];
        previous_icon?: string;
        next_icon?: string;
        new_image?: Function | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
