export function writable(key: any, initialValue: any): {
    set(value: any): void;
    update(cb: any): void;
    subscribe: (this: void, run: import("svelte/store").Subscriber<any>, invalidate?: (value?: any) => void) => import("svelte/store").Unsubscriber;
};
