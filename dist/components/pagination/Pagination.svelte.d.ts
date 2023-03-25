/** @typedef {typeof __propDef.props}  PaginationProps */
/** @typedef {typeof __propDef.events}  PaginationEvents */
/** @typedef {typeof __propDef.slots}  PaginationSlots */
export default class Pagination extends SvelteComponentTyped<{
    limit?: any;
    id?: string;
    rows_per_page?: number[];
    count?: any;
    max_buttons?: number;
    arrows?: boolean;
    first_last_arrows?: boolean;
    has_more?: boolean;
    page_query_name?: string;
    limit_query_name?: string;
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
        limit?: any;
        id?: string;
        rows_per_page?: number[];
        count?: any;
        max_buttons?: number;
        arrows?: boolean;
        first_last_arrows?: boolean;
        has_more?: boolean;
        page_query_name?: string;
        limit_query_name?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
