import { idm, Mapper } from "./@";
import { OZ } from "./oz";
export declare class CATT {
    xid: string;
    IDM: idm;
    map: Mapper<string, string[]>;
    states: ((id: string) => () => void)[];
    events: Mapper<string, (...arg: any) => any>;
    OZ: OZ;
    constructor(xid: string, IDM?: idm, _OZ?: OZ);
    attr_push(key: string, val: any, pre?: string): void;
    get attr(): string;
    set id(id: string);
    get id(): string | undefined;
}
