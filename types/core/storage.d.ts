import { obj } from "./@";
declare class eStream {
    stream: EventSource;
    url: string;
    constructor(eurl: string, withCredentials: boolean);
    on(event: obj<(a: MessageEvent) => void>): this;
}
declare function eventStream(url: string, withCredentials?: boolean): eStream;
declare class __I {
    value: any;
    constructor(value: any);
    get str(): string | null;
    get int(): number | null;
    get float(): number | null;
    get bool(): boolean | null;
    get json(): any | null;
}
declare class _loc {
    key: string;
    func: (() => any) | null;
    storage: Storage;
    constructor(item: obj<() => any> | string, _type?: "local" | "session");
    get as(): __I;
    get value(): string | null;
    get save(): void;
    set set(val: any);
    get remove(): void;
}
declare const local: {
    get: (item: obj<() => any> | string) => _loc;
};
declare const session: {
    get: (item: obj<() => any> | string) => _loc;
};
export { eventStream, local, session };
