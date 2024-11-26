import { Mapper, obj, V } from "./@";
type S = string | string[] | ((e?: Element) => S) | boolean;
type DV = V | Dom;
type ctx = DV | DV[] | (() => DV | DV[]);
type _MS = [(e?: Element) => S | ctx, any];
type MS2 = obj<_MS>;
type VMapper = Mapper<string, Mapper<string, MS2 | _MS>>;
declare class idm {
    _c: number;
    id: string;
    constructor(mid?: string);
    get mid(): string;
}
export declare function state<T, O = obj<any>>(val: T, affectChildren?: boolean): [() => T, (newValue: T) => void, O];
export declare class Dom {
    tag: string;
    _attr?: attr | undefined;
    _ctx: ctx[];
    component: boolean;
    constructor(tag: string, _attr?: attr | undefined, _ctx?: ctx[]);
    __(pid?: idm): {
        ctx: string;
        attr: VMapper;
    };
}
export declare function dom(tag: string | ((attr: attr, ctx: ctx[]) => Dom), attr?: attr, ...ctx: ctx[]): Dom;
export declare function frag(r: any, ...d: ctx[]): (DV | (() => DV | DV[]))[];
export declare function upMAP(NMP: VMapper): void;
export declare class Render {
    app: (data: any) => Dom | Promise<Dom>;
    path: string;
    constructor(app: (data: any) => Dom | Promise<Dom>, path?: string);
    ctx(data?: {}): Promise<void>;
    dom(data?: {}, isCTX?: boolean): Promise<void>;
    ssr(data?: {}): Promise<{
        script: string;
        body: string;
    }>;
}
export declare class Watcher<T> {
    private watchFn;
    private value;
    private handlers;
    constructor(watchFn: () => T);
    on(callback: (value: T) => void, initialize?: boolean): this;
    get update(): void;
}
export {};
