import { Mapper, V } from "./@";
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
    private _id;
    private statefuls;
    on: events;
    attr: Mapper<string, string[]>;
    constructor(attr: baseAttr, _id: string, statefuls?: (() => void)[]);
    get id(): string | undefined;
    set id(id: string);
    get string(): string;
}
export {};
