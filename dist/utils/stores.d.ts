export const pageStore: import("svelte/store").Writable<{
    title: any;
    sidebar: {
        is_toggled: boolean;
        active_item: any;
        notifications: {};
    };
    select: any;
    dropdown: any;
    is_fetching: boolean;
    loading: any[];
    clicked: any;
    errors: any[];
    host: any;
    is_mobile: boolean;
    focused_gallery_id: any;
    table: {
        selected_table_rows: number;
        checkbox_options: any[];
        id: any;
    };
    search: any;
    is_search_active: boolean;
    dark_mode: boolean;
}>;
export const noscrollStore: import("svelte/store").Readable<boolean>;
export const modalStore: import("svelte/store").Writable<{
    title: string;
    active: boolean;
    form: any[];
    message: string;
    img: any;
    footer: any[];
    type: string;
    gallery: any;
}>;
export const toastStore: import("svelte/store").Writable<any[]>;
export const configStore: import("svelte/store").Writable<{
    validate_on_blur: boolean;
    show_required: boolean;
    toast_delay: number;
    error_delay: number;
    debug: boolean;
    padding: string;
    radius: string;
    max_content_width: number;
    dark_mode_invert: boolean;
    back_nav: string;
}>;
