interface obj<T> {
    [Key: string]: T;
}
type V = string | number | boolean;
declare class idm {
    private _c;
    private _id;
    constructor(mid?: string);
    get id(): string;
    get mid(): string;
}
declare class Mapper<K, V> extends Map<K, V> {
    obj(obj?: object | null): void;
    map(map: Mapper<K, V>): void;
    ass<T>(key: K, obj: T): void;
}

declare class OZ {
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

declare class CATT {
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

declare class Stateful<T> extends EventTarget {
    private options?;
    private states;
    private _value;
    private listening;
    private end?;
    private isNotWindow;
    constructor(value: T, options?: AddEventListenerOptions | undefined);
    get value(): T;
    set value(newValue: T);
    get listen(): () => void;
    call<Q>(callback: (this: Elements, arg: T) => Q, entry: string): (id: string) => () => void;
}
declare function State<T>(value: T): Stateful<T>;

type X2 = V | V[];
type X3 = X2 | Stateful<X2>;
type CSSinT = {
    [P in keyof CSSStyleDeclaration]?: X3;
} & {
    [key: string]: X3;
};
type Elements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
interface c_events {
    watch?: (this: Elements) => [(...args: any[]) => void, Stateful<any>[]];
    ready?: (this: Elements) => void;
    resize?: (this: Elements, e: UIEvent) => void;
    unload?: (this: Elements, e: BeforeUnloadEvent) => void;
    popstate?: (this: Elements, e: PopStateEvent) => void;
}
interface baseAttr {
    style?: CSSinT;
    on?: events;
    id?: string;
    class?: X3;
}
declare class ATTR {
    attr: attr;
    constructor(attr?: attr);
    private getCallback;
    get(catt: CATT, attr?: attr, pre?: string): void;
}

type ctx = V | Dom | Stateful<V | Dom> | ctx[];
type attr$1 = baseAttr | obj<X3>;
declare class CTX {
    tag: string;
    ctx: ctx[];
    closing: string;
    constructor(tag: string, ctx: ctx[]);
    private getCallback;
    private process;
    get(catt: CATT): string;
}
declare class Dom {
    tag: string;
    attr: ATTR;
    ctx: CTX;
    constructor(tag: string, attr?: attr$1, ...ctx: ctx[]);
    __(pid?: idm): {
        ctx: string;
        oz: OZ;
    };
}
declare function dom(tag: string | ((attr: any, ...ctx: any[]) => Dom), attr?: attr$1, ...ctx: ctx[]): Dom;
declare const frag: (r: attr$1, ...dom: ctx[]) => ctx[];
declare class Render {
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

type TElem = HTMLElement & InstanceType<typeof Element>;
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

declare class ColorScheme {
    state: Stateful<boolean>;
    toggle: (isDark: boolean) => void;
    click: (e: Event) => void;
    constructor({ toggle, initialState, }?: {
        toggle?: string[];
        initialState?: boolean;
    });
    get isMatchMediaSupported(): boolean;
    get isDark(): boolean;
}
declare class UI {
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
declare const reATTR: (a: attr, options?: {
    exclude?: string[];
    style?: obj<any>;
    classes?: string[];
}) => void;
declare global {
    type events = {
        [P in keyof GlobalEventHandlersEventMap]?: (this: Elements, e: GlobalEventHandlersEventMap[P]) => void;
    } & c_events;
    type attr = baseAttr | obj<X3>;
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

export { $, $$, ColorScheme, Dom, Render, Router, State, UI, type _$, dom, eventStream, frag, loadCSS, local, preload, reATTR, session };
