/** @typedef {typeof __propDef.props}  GalleryProps */
/** @typedef {typeof __propDef.events}  GalleryEvents */
/** @typedef {typeof __propDef.slots}  GallerySlots */
export default class Gallery extends SvelteComponentTyped<{
    title?: null | undefined;
    id?: string | undefined;
    buttons?: any[] | undefined;
    page?: number | undefined;
    pagination?: boolean | undefined;
    images?: string[] | undefined;
    grid?: string | null | undefined;
    overlay_buttons?: any[] | undefined;
    previous_icon?: string | undefined;
    next_icon?: string | undefined;
    new_image?: Function | null | undefined;
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
        title?: null | undefined;
        id?: string | undefined;
        buttons?: any[] | undefined;
        page?: number | undefined;
        pagination?: boolean | undefined;
        images?: string[] | undefined;
        grid?: (string | null) | undefined;
        overlay_buttons?: any[] | undefined;
        previous_icon?: string | undefined;
        next_icon?: string | undefined;
        new_image?: Function | null | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
