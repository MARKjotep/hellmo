import { V } from "./@";
import { CATT } from "./catt";
import { Stateful } from "./stateful";
type X2 = V | V[];
export type X3 = X2 | Stateful<X2>;
export type CSSinT = {
    [P in keyof CSSStyleDeclaration]?: X3;
} & {
    [key: string]: X3;
};
export type Elements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
export interface c_events {
    watch?: (this: Elements) => [(...args: any[]) => void, Stateful<any>[]];
    ready?: (this: Elements) => void;
    resize?: (this: Elements, e: UIEvent) => void;
    unload?: (this: Elements, e: BeforeUnloadEvent) => void;
    popstate?: (this: Elements, e: PopStateEvent) => void;
}
export interface baseAttr {
    style?: CSSinT;
    on?: events;
    id?: string;
    class?: X3;
}
export declare class ATTR {
    attr: attr;
    constructor(attr?: attr);
    private getCallback;
    get(catt: CATT, attr?: attr, pre?: string): void;
}
export {};
