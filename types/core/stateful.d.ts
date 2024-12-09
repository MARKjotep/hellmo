type Elements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
export declare const getElementById: (key: string) => Elements | undefined;
export declare class Stateful<T> extends EventTarget {
    private options?;
    private states;
    private _value;
    private listening;
    private isNotWindow;
    constructor(value: T, options?: AddEventListenerOptions | undefined);
    get value(): T;
    set value(newValue: T);
    get listen(): () => void;
    call<Q>(callback: (this: Elements, arg: T) => Q, id: string, entry: string): () => void;
    reset(id: string): void;
}
export declare function State<T>(value: T): Stateful<T>;
export {};
