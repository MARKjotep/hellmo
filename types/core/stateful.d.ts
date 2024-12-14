import { Elements } from "./attr";
export declare const getElementById: (key: string) => Elements | undefined;
export declare class Stateful<T> extends EventTarget {
    private options?;
    private states;
    private _value;
    private listening;
    private end?;
    private isNotWindow;
    constructor(value: T, options?: AddEventListenerOptions | undefined);
    get value(): T;
    set value(newValue: T);
    get listen(): () => void;
    call<Q>(callback: (this: Elements, arg: T) => Q, entry: string): (id: string) => () => void;
}
export declare function State<T>(value: T): Stateful<T>;
