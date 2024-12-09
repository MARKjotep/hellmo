import { isArr, obj } from "./core/@";
import { baseAttr, c_events, Elements, X3 } from "./core/attr";
import { dom, frag, Dom, Render } from "./core/dom";
import { $, CSSinT, Elem, STYLE } from "./core/elem";
import { Router } from "./core/router";
import { State } from "./core/stateful";
export * from "./core/ui";

export type _$ = Elem | undefined;
export class $$ {
  static set p(a: any) {
    if (isArr(a)) {
      console.log(...a);
    } else {
      console.log(a);
    }
  }
  static get isDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export * from "./core/storage.js";
export { dom, frag, State, $, Dom, Render, Router };
/*
-------------------------
-------------------------
*/
// if (typeof window === "undefined") {
//   Object.assign(global, {
//     window: {
//       location: {
//         pathname: "",
//       },
//     },
//     document: {
//       querySelector: () => ({}),
//       querySelectorAll: () => ({}),
//     },
//     location: {
//       location: {
//         pathname: "",
//       },
//     },
//     localStorage: {},
//     sessionStorage: {},
//     navigator: {},
//     history: {},
//     screen: {},
//     performance: {},
//   });
// }

/*
-------------------------
loadCSS
For loop
Preload
-------------------------
*/
const rgx = new RegExp(/\/\/(.*?\w.*?$)/);

function metaURL(meta: string | undefined, url: string) {
  let _url = url;
  if (meta) {
    const rgd = rgx.exec(meta);
    if (rgd?.length == 2) {
      let slicer = 0;
      if (url.startsWith("..")) {
        url.split("/").forEach((fu) => {
          if (fu == "..") {
            slicer += 1;
          }
        });
        const rgp = url.split("/").slice(slicer).join("/");
        const drx = rgd[1].split("/").slice(1, -1);
        const rgt = drx.slice(0, drx.length - slicer).join("/");
        _url = rgt + "/" + rgp;
        // -----
      } else if (url.startsWith(".")) {
        const rgp = url.split("/").slice(1).join("/");
        const rgy = rgd[1].split("/").slice(1, -1).join("/");
        _url = rgy + "/" + rgp;
      }
    }
    return "./" + _url;
  }
  return _url;
}

function isLINK(href: string) {
  const existingLinks: any = document.querySelectorAll("head link");
  for (const link of existingLinks) {
    if ("rel" in link) {
      if (link.href.indexOf(href.slice(1)) > -1) {
        return true;
      }
    }
  }
  return false;
}

export async function loadCSS(url: string[]): Promise<void>;
export async function loadCSS(
  url: string[] | string,
  importmetaurl?: string,
): Promise<void>;
export async function loadCSS(
  url: string[] | string,
  importmetaurl?: string,
): Promise<void> {
  // Handle an array of URLs
  if (Array.isArray(url)) {
    for (const singleUrl of url) {
      await loadCSS(singleUrl, importmetaurl);
    }
    return;
  }

  let _url = metaURL(importmetaurl, url);
  if (isLINK(_url)) return;

  return new Promise<void>((resolve, reject) => {
    const style = document.createElement("link");
    $(style).attr.set({
      id: "_css",
      rel: "preload stylesheet",
      type: "text/css",
      as: "style",
      href: _url,
    });
    style.onload = () => resolve();
    style.onerror = () => reject();
    $(`script[type="module"]`)?.insert("beforebegin").element(style);
  });
}

export function preload(url: string, as: string, type: string): string {
  if (isLINK(url)) return url;

  const link = document.createElement("link");
  link.rel = "preload";
  link.type = type;
  link.as = as;
  link.href = url;

  if (as === "font") {
    link.crossOrigin = "anonymous";
  }

  document.head.appendChild(link);
  return url;
}

/*
-------------------------

-------------------------
*/

// -------------------------

declare global {
  type events = {
    [P in keyof GlobalEventHandlersEventMap]?: (
      this: Elements,
      e: GlobalEventHandlersEventMap[P],
    ) => void;
  } & c_events;

  type attr = baseAttr | obj<X3>;

  namespace JSX {
    type Element = Dom;
    interface IntrinsicElements {
      // Basic ----------------------------------
      p: attr;
      br: attr;
      hr: attr;
      h: attr;
      cmnt: attr;
      root: attr;
      // Styles and Semantics ----------------------------------
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
      // Programming ----------------------------------
      noscript: attr;
      object: attr;
      param: attr;
      script: attr;
      // Links ----------------------------------
      a: attr;
      nav: attr;
      style: attr;
      // Audio / Video ----------------------------------
      audio: attr;
      video: attr;
      source: attr;
      track: attr;
      // Images ----------------------------------
      img: attr;
      map: attr;
      area: attr;
      canvas: attr;
      figcaption: attr;
      figure: attr;
      picture: attr;
      // IFrame ----------------------------------
      iframe: attr;
      // Forms and Input ----------------------------------
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
      // Tables ----------------------------------
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
      // Formatting ----------------------------------

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
      // List ----------------------------------
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

      // SVG Elements  ----------------------------------
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
