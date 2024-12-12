import { CATT } from "./catt";
export declare class OZ {
    private events;
    private states;
    private winStates;
    private resetST;
    private resetEV;
    constructor();
    get keys(): string[];
    set(catt: CATT): this;
    push(_OZ: this): this;
    get stage(): this;
    get start(): this;
    reset(id: string[]): this;
}
