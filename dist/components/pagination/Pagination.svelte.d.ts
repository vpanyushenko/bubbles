/** @typedef {typeof __propDef.props}  PaginationProps */
/** @typedef {typeof __propDef.events}  PaginationEvents */
/** @typedef {typeof __propDef.slots}  PaginationSlots */
export default class Pagination extends SvelteComponentTyped<{
    id?: string | undefined;
    limit?: null | undefined;
    rows_per_page?: number[] | undefined;
    count?: null | undefined;
    max_buttons?: number | undefined;
    arrows?: boolean | undefined;
    first_last_arrows?: boolean | undefined;
    has_more?: boolean | undefined;
    page_query_name?: string | undefined;
    limit_query_name?: string | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PaginationProps = typeof __propDef.props;
export type PaginationEvents = typeof __propDef.events;
export type PaginationSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        id?: string | undefined;
        limit?: null | undefined;
        rows_per_page?: number[] | undefined;
        count?: null | undefined;
        max_buttons?: number | undefined;
        arrows?: boolean | undefined;
        first_last_arrows?: boolean | undefined;
        has_more?: boolean | undefined;
        page_query_name?: string | undefined;
        limit_query_name?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
