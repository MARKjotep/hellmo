import { obj, V } from "./@";
import { CSSinT } from "./attr";
type TElem = HTMLElement & InstanceType<typeof Element>;
type kf = KeyframeAnimationOptions;
type KFType = (CSSinT | obj<V>)[] | CSSinT | obj<V>;
type fn<E, T> = (e?: E) => T;
declare class anim {
    e: Elem;
    opt: kf;
    constructor(e: Elem);
    animate(keyframes: CSSinT[] | CSSinT, options?: kf): Elem<HTMLElement>;
    get slide(): {
        left: (options?: kf) => anim;
        right: (options?: kf) => anim;
        up: (options?: kf) => anim;
        down: (options?: kf) => anim;
    };
    fade(options?: kf): this;
    shake(XorY?: string, opt?: kf): this;
    color(c?: string[], opt?: kf): this;
    bg(c?: string | string[], opt?: kf): this;
    bounce(sVal?: number, opt?: kf): this;
}
declare class Eget<T extends TElem = HTMLElement> {
    e: T;
    query?: string | undefined;
    constructor(e: T, query?: string | undefined);
    get a(): anim;
    get all(): Elem<T>[];
    get attr(): {
        has: (attr: string) => boolean;
        get: (attr: string) => string | null;
        del: (attr: string) => Eget;
        set: (attrs: obj<any>) => Eget;
    };
    get children(): Elem<T>[];
    get click(): this;
    get delete(): this;
    get disabled(): boolean;
    get focus(): this;
    get id(): string;
    get inner(): string;
    get offsetParent(): Elem | undefined;
    get parent(): Elem | undefined;
    get rect(): DOMRect;
    get remove_element(): this;
    get style(): {
        set: (style: CSSinT | obj<V | null>, delayOrFN?: number | ((e?: any) => void)) => Elem<HTMLElement>;
        get: (prop: keyof CSSStyleDeclaration | string) => string;
        del: (...props: (keyof CSSStyleDeclaration | string)[]) => void;
    };
    get submit(): any;
    get tag(): string;
    get value(): any;
    set append(val: any);
    set appendfirst(val: any);
    set disabled(vl: boolean);
    set inner(val: any);
    set id(did: string);
    set value(vl: any);
}
export declare class Elem<T extends TElem = HTMLElement> extends Eget {
    constructor(e: T, query?: string);
    add(...className: string[]): this;
    remove(...className: string[]): this;
    toggle(className: string | fn<any, string>, force?: boolean): this;
    has(e: any | null): boolean;
    insert(position: InsertPosition): {
        HTML: (...text: string[]) => Elem;
        element: (...elem: HTMLElement[]) => Elem;
        text: (this: Elem, ...text: string[]) => Elem;
    };
    is(tp: {
        dom?: string;
        class?: string | string[];
    }): boolean;
    on(event: keyof HTMLElementEventMap, handler: (e?: any) => void, useCapture?: boolean): this;
    remove_on(event: keyof DocumentEventMap, handler: EventListenerOrEventListenerObject, useCapture?: boolean): this;
    timed(fn: (ee?: Elem) => void, timeout?: number): this;
    animate(keyframes: KFType, options?: kf, onComplete?: fn<any, void>): this;
    animate(keyframes: KFType, onComplete?: fn<any, void>): this;
}
export declare function $(query: string): Elem | undefined;
export declare function $<T extends TElem = HTMLElement>(element: T): Elem<T>;
export {};
