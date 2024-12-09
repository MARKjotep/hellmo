import { Dom } from "./dom";
import { Stateful } from "./stateful";
export declare class Router {
    private map;
    private pushState;
    url: string;
    attr: string;
    isSheet: boolean;
    page: Stateful<Dom>;
    nav: Stateful<string>;
    title: Stateful<string>;
    private e?;
    constructor(r?: {
        pushState?: boolean;
        basePath?: string;
        isSheet?: boolean;
    });
    init(eh?: HTMLElement, ...dsmissed: ((a: any) => void)[]): this;
    private afterImp;
    private import;
    sheet(url: string): this;
    reset(): void;
    get(url: string, lastURL?: string): Promise<this>;
    path(path: string, { file, title, css, }: {
        file: string | (() => Dom | Promise<Dom>);
        title?: string;
        css?: string;
    }): this;
}
