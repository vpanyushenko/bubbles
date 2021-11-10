import { writable } from "svelte/store";

export const modalStore = writable({ title: "", active: false, form: [], message: "" });
