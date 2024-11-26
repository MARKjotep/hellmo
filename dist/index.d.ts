declare class Mapper<K, V> extends Map<K, V> {
    obj(obj?: object | null): void;
    map(map: Map<K, V>): void;
    ass<T>(key: K, obj: T): void;
}
interface obj<T> {
    [Key: string]: T;
}
type V = string | number | boolean;

type S$1 = string | string[] | ((e?: Element) => S$1) | boolean;
type DV = V | Dom;
type ctx = DV | DV[] | (() => DV | DV[]);
type _MS = [(e?: Element) => S$1 | ctx, any];
type MS2 = obj<_MS>;
type VMapper = Mapper<string, Mapper<string, MS2 | _MS>>;
declare class idm {
    _c: number;
    id: string;
    constructor(mid?: string);
    get mid(): string;
}
declare function state<T, O = obj<any>>(val: T, affectChildren?: boolean): [() => T, (newValue: T) => void, O];
declare class Dom {
    tag: string;
    _attr: attr | null;
    component: boolean;
    private _ctx;
    constructor(tag: string, _attr?: attr | null, ..._ctx: ctx[]);
    __(pid?: idm): {
        ctx: string;
        attr: VMapper;
    };
}
declare function dom(tag: string | ((attr: attr, ctx: ctx[]) => Dom), attr?: attr | null, ...ctx: ctx[]): Dom;
declare const frag: (r: any, ...dom: ctx[]) => (DV | (() => DV | DV[]))[];
declare class Render {
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
declare class Watcher<T> {
    private watchFn;
    private value;
    private handlers;
    constructor(watchFn: () => T);
    on(callback: (value: T) => void, initialize?: boolean): this;
    get update(): void;
}

type TElem = HTMLElement & InstanceType<typeof Element>;
type STYLE = V | (<T extends TElem = HTMLElement>(e: T) => V);
type CSSinT = {
    [P in keyof CSSStyleDeclaration]?: STYLE;
};
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
declare class Elem<T extends TElem = HTMLElement> extends Eget {
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
declare function $(query: string): Elem | undefined;
declare function $<T extends TElem = HTMLElement>(element: T): Elem<T>;

declare class Router {
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

type _$ = Elem | undefined;
declare class $$ {
    static set p(a: any);
    static get isDark(): boolean;
}

declare function loadCSS(url: string[]): Promise<void>;
declare function loadCSS(url: string[] | string, importmetaurl?: string): Promise<void>;
declare function preload(url: string, as: string, type: string): string;
type S = string | string[] | ((e?: Element) => S) | boolean;
type Elements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
interface c_events {
    ready?: (this: Elements) => void;
    watch?: (this: Elements) => Watcher<any> | Watcher<any>[];
    resize?: (this: HTMLElement, e: UIEvent) => void;
    unload?: (this: HTMLElement, e: BeforeUnloadEvent) => void;
    popstate?: (this: HTMLElement, e: PopStateEvent) => void;
}
type _events = {
    [P in keyof GlobalEventHandlersEventMap]?: (e: GlobalEventHandlersEventMap[P]) => void;
};
interface Battr {
    [key: string]: any;
    id?: string;
    class?: S;
    style?: CSSinT | obj<STYLE>;
    on?: events;
}
type events = _events & c_events;
type attr = obj<S> | Battr;
declare global {
    type events = _events & c_events;
    export type attr = obj<S> | Battr;
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

export { $, $$, Dom, Render, Router, Watcher, type _$, type attr, dom, eventStream, type events, frag, loadCSS, local, preload, session, state };
