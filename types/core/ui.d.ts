import { Stateful } from "./stateful";
export declare class ColorScheme {
    state: Stateful<boolean>;
    toggle: (isDark: boolean) => void;
    click: (e: Event) => void;
    constructor({ toggle, initialState, }?: {
        toggle?: string[];
        initialState?: boolean;
    });
    get isMatchMediaSupported(): boolean;
    get isDark(): boolean;
}
export declare class UI {
}
