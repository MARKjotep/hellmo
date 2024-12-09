import { Mapper, V } from "./core/@";
import { attr, events } from "./core/attr";
import { Stateful } from "./core/stateful";
type ctx = V | Dom | Stateful<V | Dom>;
declare class idm {
    private _c;
    private id;
    constructor(mid?: string);
    get mid(): string;
}
export declare class Dom {
    statefuls: (() => void)[];
    ons: Mapper<string, events>;
    __: (pid?: idm) => string;
    constructor(tag: string, attr?: attr, ...ctx: ctx[]);
}
export declare function dom(tag: string | ((attr: any, ...ctx: any[]) => Dom), attr?: attr, ...ctx: ctx[]): Dom;
export declare const frag: (r: attr, ...dom: any[]) => any[];
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
export {};
