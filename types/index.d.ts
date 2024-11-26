import { obj } from "./core/@";
import { dom, frag, state, Dom, Watcher, Render } from "./core/dom";
import { $, CSSinT, Elem, STYLE } from "./core/elem";
import { Router } from "./core/router";
export type _$ = Elem | undefined;
export declare class $$ {
    static set p(a: any);
    static get isDark(): boolean;
}
export * from "./core/storage.js";
export { dom, frag, state, $, Dom, Watcher, Render, Router };
export declare function loadCSS(url: string[]): Promise<void>;
export declare function loadCSS(url: string[] | string, importmetaurl?: string): Promise<void>;
export declare function preload(url: string, as: string, type: string): string;
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
export type events = _events & c_events;
export type attr = obj<S> | Battr;
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
