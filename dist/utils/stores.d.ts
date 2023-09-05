export const pageStore: import("svelte/store").Writable<{
    title: null;
    sidebar: {
        is_toggled: boolean;
        active_item: null;
        notifications: {};
    };
    select: null;
    dropdown: null;
    is_fetching: boolean;
    loading: never[];
    clicked: null;
    errors: never[];
    host: null;
    is_mobile: boolean;
    focused_gallery_id: null;
    table: {
        selected_table_rows: number;
        checkbox_options: never[];
        id: null;
    };
    search: null;
    is_search_active: boolean;
    dark_mode: boolean;
}>;
export const noscrollStore: import("svelte/store").Readable<boolean>;
export const modalStore: import("svelte/store").Writable<{
    title: string;
    active: boolean;
    form: never[];
    message: string;
    img: null;
    footer: never[];
    type: string;
    gallery: null;
}>;
export const toastStore: import("svelte/store").Writable<never[]>;
export const configStore: import("svelte/store").Writable<{
    /** @type {boolean} [validate_on_blur=true] */
    validate_on_blur: boolean;
    show_required: boolean;
    toast_delay: number;
    error_delay: number;
    debug: boolean;
    /** @type {"roomy"|"compact"} [padding="roomy"] */
    padding: "roomy" | "compact";
    /** @type {"rounded"|"blocky"} [radius="rounded"] */
    radius: "rounded" | "blocky";
    max_content_width: number;
    dark_mode_invert: boolean;
    back_nav: string;
}>;
