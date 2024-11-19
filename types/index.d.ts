type V = string | number | boolean;
type S = string | string[] | ((e?: Element) => S) | boolean;
type DV = V | Dom;
interface obj<T> {
    [Key: string]: T;
}
type meta<T> = {
    charset?: T;
    content?: T;
    "http-equiv"?: T;
    name?: T;
    media?: T;
    url?: T;
};
type link<T> = {
    href?: T;
    hreflang?: T;
    media?: T;
    referrerpolicy?: T;
    rel?: "stylesheet" | "icon" | "manifest" | T;
    sizes?: T;
    title?: T;
    type?: T;
    as?: T;
};
type impmap = {
    imports?: obj<string>;
    scopes?: obj<string>;
    integrity?: obj<string>;
};
type script<T> = {
    async?: T;
    crossorigin?: T;
    defer?: T;
    integrity?: T;
    nomodule?: T;
    referrerpolicy?: T;
    src?: T;
    type?: "text/javascript" | T;
    id?: T;
    importmap?: impmap;
    body?: T;
};
type base = {
    href?: string;
    target?: "_blank" | "_parent" | "_self" | "_top";
};
export interface headP {
    title?: string;
    base?: base[];
    meta?: meta<V>[];
    link?: link<V>[];
    script?: script<V>[];
}
type ctx = DV | DV[] | (() => DV | DV[]);
type TElem = HTMLElement & InstanceType<typeof Element>;
type Elements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
type STYLE = V | (<T extends TElem = HTMLElement>(e: T) => V);
export type CSSinT = {
    [P in keyof CSSStyleDeclaration]?: STYLE;
};
interface c_events {
    ready?: (this: Elements) => void;
    watch?: (this: Elements) => Watcher<any> | Watcher<any>[];
    resize?: (this: HTMLElement, e: UIEvent) => void;
    unload?: (this: HTMLElement, e: BeforeUnloadEvent) => void;
    popstate?: (this: HTMLElement, e: PopStateEvent) => void;
}
type _MS = [(e?: Element) => S | ctx, any];
type MS2 = obj<_MS>;
type _events = {
    [P in keyof GlobalEventHandlersEventMap]?: (e: GlobalEventHandlersEventMap[P]) => void;
};
type events = _events & c_events;
interface Battr {
    [key: string]: any;
    id?: string;
    class?: S;
    style?: CSSinT | obj<STYLE>;
    on?: events;
}
type attr = obj<S> | Battr;
export declare const gen8: {
    numSequence: (length: number) => number[];
};
export declare class $$ {
    static set p(a: any);
}
declare class idm {
    _c: number;
    private id;
    constructor(mid?: string);
    get mid(): string;
}
declare class Mapper<K, V> extends Map<K, V> {
    obj(obj?: object | null): void;
    map(map: Map<K, V>): void;
}
export declare class Watcher<T> {
    watching: () => T;
    private val;
    private _do;
    constructor(watching: () => T);
    on(changed: (arg: T) => void, init?: boolean): this;
    get update(): void;
}
type kf = KeyframeAnimationOptions;
type KFType = (CSSinT | obj<V>)[] | CSSinT | obj<V>;
type fn<E, T> = (e?: E) => T;
declare class anim {
    e: Elem;
    opt: kf;
    constructor(e: Elem);
    animate(keyframes: CSSinT[] | CSSinT, options?: kf): Elem<HTMLElement>;
    get slide(): {
        left: (options?: kf) => anim;
        right: (options?: kf) => anim;
        up: (options?: kf) => anim;
        down: (options?: kf) => anim;
    };
    fade(options?: kf): this;
    shake(XorY?: string, opt?: kf): this;
    color(c?: string[], opt?: kf): this;
    bg(c?: string | string[], opt?: kf): this;
    bounce(sVal?: number, opt?: kf): this;
}
declare class Eget<T extends TElem = HTMLElement> {
    e: T;
    query?: string | undefined;
    constructor(e: T, query?: string | undefined);
    get a(): anim;
    get all(): Elem<T>[];
    get attr(): {
        has: (attr: string) => boolean;
        get: (attr: string) => string | null;
        del: (attr: string) => Eget;
        set: (attrs: obj<any>) => Eget;
    };
    get children(): Elem<T>[];
    get click(): this;
    get delete(): this;
    get disabled(): boolean;
    get focus(): this;
    get id(): string;
    get inner(): string;
    get offsetParent(): Elem | undefined;
    get parent(): Elem | undefined;
    get rect(): DOMRect;
    get remove_element(): this;
    get style(): {
        set: (style: CSSinT | obj<V | null>, delayOrFN?: number | ((e?: any) => void)) => Elem<HTMLElement>;
        get: (prop: keyof CSSStyleDeclaration | string) => string;
        del: (...props: (keyof CSSStyleDeclaration | string)[]) => void;
    };
    get submit(): any;
    get tag(): string;
    get value(): any;
    set append(val: any);
    set appendfirst(val: any);
    set disabled(vl: boolean);
    set inner(val: any);
    set id(did: string);
    set value(vl: any);
}
export declare class Elem<T extends TElem = HTMLElement> extends Eget {
    constructor(e: T, query?: string);
    add(...className: string[]): this;
    remove(...className: string[]): this;
    toggle(className: string | fn<any, string>, force?: boolean): this;
    has(e: any | null): boolean;
    insert(position: InsertPosition): {
        HTML: (...text: string[]) => Elem;
        element: (...elem: HTMLElement[]) => Elem;
        text: (this: Elem, ...text: string[]) => Elem;
    };
    is(tp: {
        dom?: string;
        class?: string | string[];
    }): boolean;
    on(event: keyof HTMLElementEventMap, handler: (e?: any) => void, useCapture?: boolean): this;
    remove_on(event: keyof DocumentEventMap, handler: EventListenerOrEventListenerObject, useCapture?: boolean): this;
    timed(fn: (ee?: Elem) => void, timeout?: number): this;
    animate(keyframes: KFType, options?: kf, onComplete?: fn<any, void>): this;
    animate(keyframes: KFType, onComplete?: fn<any, void>): this;
}
export declare function $(query: string): Elem | undefined;
export declare function $<T extends TElem = HTMLElement>(element: T): Elem<T>;
export declare function state<T, O = obj<any>>(val: T, affectChildren?: boolean): [() => T, (newValue: T) => void, O];
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
type VMapper = Mapper<string, Mapper<string, MS2 | _MS>>;
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
export declare function dom(tag: string | ((attr?: attr, ...ctx: ctx[]) => Dom), attr?: attr, ...ctx: ctx[]): Dom;
export declare function frag(r: any, ...d: ctx[]): ctx[];
export declare const eventStream: (url: string, withCredentials?: boolean) => {
    stream: EventSource;
    url: string;
    on(event: obj<(a: MessageEvent) => void>): any;
}, local: {
    get: (item: obj<() => any> | string) => {
        key: string;
        func: (() => any) | null;
        storage: Storage;
        readonly as: {
            value: any;
            readonly str: string | null;
            readonly int: number | null;
            readonly float: number | null;
            readonly bool: boolean | null;
            readonly json: any;
        };
        readonly value: string | null;
        readonly save: void;
        set: any;
        readonly remove: void;
    };
}, session: {
    get: (item: obj<() => any> | string) => {
        key: string;
        func: (() => any) | null;
        storage: Storage;
        readonly as: {
            value: any;
            readonly str: string | null;
            readonly int: number | null;
            readonly float: number | null;
            readonly bool: boolean | null;
            readonly json: any;
        };
        readonly value: string | null;
        readonly save: void;
        set: any;
        readonly remove: void;
    };
};
export declare function loadCSS(url: string[]): Promise<void>;
export declare function loadCSS(url: string[] | string, importmetaurl?: string): Promise<void>;
export declare function preload(url: string, as: string, type: string): string;
export declare class __ {
    static _class(x: attr, cl: any[]): any[];
    static _str(str?: string | Dom | number, ret?: Dom): string | Dom | undefined;
    static _attr(x: attr, ...xclude: string[]): any;
    static _re_attr(x: any, vals: string[], _styles?: obj<any>, ..._classes: any[]): any;
    static _meta(meta: string, url: string): string;
    static _parseURL(url: string): {
        parsed: string[];
        wcard: string[];
        query: any;
    };
    static is_number(value: any): boolean;
    static _type(wrd: any, isFinal?: boolean): [any, string];
    static _px(itm: obj<number>): obj<string>;
}
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
declare global {
    type events = _events & c_events;
    type attr = obj<S> | Battr;
    namespace JSX {
        type Element = Dom;
        interface IntrinsicElements {
            p: attr;
            br: attr;
            hr: attr;
            h: attr;
            cmnt: attr;
            root: attr;
            html: attr;
            body: attr;
            div: attr;
            span: attr;
            header: attr;
            hgroup: attr;
            footer: attr;
            main: attr;
            section: attr;
            search: attr;
            article: attr;
            aside: attr;
            details: attr;
            dialog: attr;
            summary: attr;
            data: attr;
            noscript: attr;
            object: attr;
            param: attr;
            script: attr;
            a: attr;
            nav: attr;
            style: attr;
            audio: attr;
            video: attr;
            source: attr;
            track: attr;
            img: attr;
            map: attr;
            area: attr;
            canvas: attr;
            figcaption: attr;
            figure: attr;
            picture: attr;
            iframe: attr;
            form: attr;
            input: attr;
            textarea: attr;
            button: attr;
            select: attr;
            optgroup: attr;
            option: attr;
            label: attr;
            fieldset: attr;
            legend: attr;
            datalist: attr;
            table: attr;
            caption: attr;
            th: attr;
            tr: attr;
            td: attr;
            thead: attr;
            tbody: attr;
            tfoot: attr;
            col: attr;
            colgroup: attr;
            b: attr;
            i: attr;
            q: attr;
            s: attr;
            u: attr;
            em: attr;
            rp: attr;
            del: attr;
            dfn: attr;
            ins: attr;
            kbd: attr;
            pre: attr;
            sub: attr;
            sup: attr;
            var: attr;
            wbr: attr;
            cite: attr;
            time: attr;
            abbr: attr;
            code: attr;
            mark: attr;
            samp: attr;
            meter: attr;
            small: attr;
            strong: attr;
            address: attr;
            progress: attr;
            template: attr;
            blockquote: attr;
            menu: attr;
            ul: attr;
            ol: attr;
            li: attr;
            dl: attr;
            dt: attr;
            dd: attr;
            h1: attr;
            h2: attr;
            h3: attr;
            h4: attr;
            h5: attr;
            h6: attr;
            svg: attr;
            path: attr;
            circle: attr;
            animate: attr;
            animateMotion: attr;
            animateTransform: attr;
            clipPath: attr;
            defs: attr;
            desc: attr;
            ellipse: attr;
            feBlend: attr;
            feColorMatrix: attr;
            feComponentTransfer: attr;
            feComposite: attr;
            feConvolveMatrix: attr;
            feDiffuseLighting: attr;
            feDisplacementMap: attr;
            feDistantLight: attr;
            feDropShadow: attr;
            feFlood: attr;
            feFuncA: attr;
            feFuncB: attr;
            feFuncG: attr;
            feFuncR: attr;
            feGaussianBlur: attr;
            feImage: attr;
            feMerge: attr;
            feMergeNode: attr;
            feMorphology: attr;
            feOffset: attr;
            fePointLight: attr;
            feSpecularLighting: attr;
            feSpotLight: attr;
            feTile: attr;
            feTurbulence: attr;
            filter: attr;
            foreignObject: attr;
            g: attr;
            image: attr;
            line: attr;
            linearGradient: attr;
            marker: attr;
            mask: attr;
            metadata: attr;
            mpath: attr;
            pattern: attr;
            polygon: attr;
            polyline: attr;
            radialGradient: attr;
            rect: attr;
            set: attr;
            stop: attr;
            symbol: attr;
            text: attr;
            textPath: attr;
            title: attr;
            tspan: attr;
            use: attr;
            view: attr;
        }
    }
}
export {};
