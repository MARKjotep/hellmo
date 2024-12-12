import { idm, obj, V } from "./@";
import { ATTR, baseAttr, X3 } from "./attr";
import { CATT } from "./catt";
import { OZ } from "./oz";
import { Stateful } from "./stateful";
type ctx = V | Dom | Stateful<V | Dom> | ctx[];
type attr = baseAttr | obj<X3>;
export declare const WIZARD: OZ;
declare class CTX {
    tag: string;
    ctx: ctx[];
    closing: string;
    constructor(tag: string, ctx: ctx[]);
    private hasTag;
    private getCallback;
    private process;
    get(catt: CATT): string;
}
export declare class Dom {
    tag: string;
    attr: ATTR;
    ctx: CTX;
    constructor(tag: string, attr?: attr, ...ctx: ctx[]);
    __(pid?: idm): {
        ctx: string;
        oz: OZ;
    };
}
export declare function dom(tag: string | ((attr: any, ...ctx: any[]) => Dom), attr?: attr, ...ctx: ctx[]): Dom;
export declare const frag: (r: attr, ...dom: ctx[]) => ctx[];
export declare class Render {
    app: (data: any) => ctx | ctx[] | Promise<ctx | ctx[]>;
    path: string;
    constructor(app: (data: any) => ctx | ctx[] | Promise<ctx | ctx[]>, filePath?: string);
    ctx(data?: {}): Promise<void>;
    dom(data?: {}, isCTX?: boolean): Promise<void>;
    ssr(data?: {}): Promise<{
        script: string;
        body: string;
    }>;
}
export {};
