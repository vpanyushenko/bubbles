export default w;
declare class w {
    constructor(t: any, e: {} | undefined, n: any);
    options: {
        useExtendedSearch: boolean;
        getFn: (r: any, o: any) => any;
        ignoreLocation: boolean;
        ignoreFieldNorm: boolean;
        isCaseSensitive: boolean;
        includeScore: boolean;
        keys: never[];
        shouldSort: boolean;
        sortFn: (t: any, e: any) => 1 | -1;
        includeMatches: boolean;
        findAllMatches: boolean;
        minMatchCharLength: number;
        location: number;
        threshold: number;
        distance: number;
    };
    _keyStore: h;
    setCollection(t: any, e: any): void;
    _docs: any;
    _myIndex: any;
    add(t: any): void;
    remove(t?: () => boolean): any[];
    removeAt(t: any): void;
    getIndex(): any;
    search(t: any, { limit: s }?: {
        limit?: number | undefined;
    }): any;
    _searchStringList(t: any): any[];
    _searchLogical(t: any): void;
    _searchObjectList(t: any): any[];
    _findMatches({ key: e, value: n, searcher: s }: {
        key: any;
        value: any;
        searcher: any;
    }): {
        score: any;
        key: any;
        value: any;
        norm: any;
        indices: any;
    }[];
}
declare class h {
    constructor(t: any);
    _keys: any[];
    _keyMap: {};
    get(t: any): any;
    keys(): any[];
    toJSON(): string;
}
