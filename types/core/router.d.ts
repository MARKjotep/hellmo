import { Dom } from "./dom";
export declare class Router {
    private map;
    private pushState;
    url: string;
    attr: string;
    isSheet: boolean;
    private _page;
    private _nav;
    private _title;
    page: () => Dom;
    nav: () => string;
    title: () => string;
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
    path(path: string, { file, title, }: {
        file: string | (() => Dom | Promise<Dom>);
        title?: string;
    }): this;
}
