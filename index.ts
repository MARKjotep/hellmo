import { str, make, O, is } from "../_misc/__";

export class $$ {
  static set p(a: any) {
    if (is.arr(a)) {
      console.log(...a);
    } else {
      console.log(a);
    }
  }
}
/*
-------------------------

-------------------------
*/
interface obj<T> {
  [Key: string]: T;
}
type S = string | string[] | ((e?: Element) => S) | boolean;
type V = string | number | boolean;
type DV = V | Dom;
type ctx = DV | DV[] | (() => DV | DV[]);
type _MS = [(e?: Element) => S | ctx, any];
type MS2 = obj<_MS>;
type VMapper = Mapper<string, Mapper<string, MS2 | _MS>>;
type WTC = [(...e: any) => void, (e?: any) => any, true?];

type Elements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
interface c_events {
  ready?: (this: Elements) => void;
  watch?: (this: Elements) => Watcher<any> | Watcher<any>[];
  resize?: (this: HTMLElement, e: UIEvent) => void;
  unload?: (this: HTMLElement, e: BeforeUnloadEvent) => void;
  popstate?: (this: HTMLElement, e: PopStateEvent) => void;
}

type _events = {
  [P in keyof GlobalEventHandlersEventMap]?: (
    e: GlobalEventHandlersEventMap[P],
  ) => void;
};

//

interface Battr {
  [key: string]: any;
  id?: string;
  class?: S;
  style?: CSSinT | obj<STYLE>;
  on?: events;
}

type TElem = HTMLElement & InstanceType<typeof Element>;

type STYLE = V | (<T extends TElem = HTMLElement>(e: T) => V);
export type CSSinT = {
  [P in keyof CSSStyleDeclaration]?: STYLE;
};
type kf = KeyframeAnimationOptions;

type KFType = (CSSinT | obj<V>)[] | CSSinT | obj<V>;
type fn<E, T> = (e?: E) => T;
/*
-------------------------

-------------------------
*/

class anim {
  opt: kf;
  constructor(public e: Elem) {
    this.opt = { duration: 500, easing: "ease-in-out", fill: "forwards" };
  }
  animate(keyframes: CSSinT[] | CSSinT, options: kf = {}) {
    return this.e.animate(keyframes, options);
  }
  //
  get slide() {
    const slider = (
      { x = 0, y = 0 }: { x?: any; y?: any },
      options: kf = {},
    ): anim => {
      O.ass(this.opt, options);
      const ac = [
        [x, y],
        [0, 0],
      ].map(([k, v]) => ({
        transform: `translateX(${k}rem) translateY(${v}rem)`,
      }));
      this.e.animate(ac, this.opt);
      return this;
    };

    return {
      left: (options: kf = {}) => {
        return slider({ x: -2 }, options);
      },
      right: (options: kf = {}) => {
        return slider({ x: 2 }, options);
      },
      up: (options: kf = {}) => {
        return slider({ y: 2 }, options);
      },
      down: (options: kf = {}) => {
        return slider({ y: -2 }, options);
      },
    };
  }
  fade(options: kf = {}) {
    O.ass(this.opt, options);
    const ac = [0, 1].map((k) => ({
      opacity: k,
    }));
    this.e.animate(ac, this.opt);
    return this;
  }
  shake(XorY = "Y", opt: kf = {}) {
    O.ass(this.opt, opt);
    const ac = [0, 5, -5, 5, 0].map((k) => ({
      transform: `translate${XorY}(${k}px)`,
    }));
    this.e.animate(ac, this.opt);
    return this;
  }
  color(c: string[] = [], opt: kf = {}) {
    O.ass(this.opt, opt);
    let ac = Array.isArray(c) ? c.map((cc) => ({ color: cc })) : { color: c };
    this.e.animate(ac, this.opt);
    return this;
  }
  bg(c: string | string[] = [], opt: kf = {}) {
    O.ass(this.opt, opt);
    let ac = Array.isArray(c)
      ? c.map((cc) => ({ backgroundColor: cc }))
      : { backgroundColor: c };
    this.e.animate(ac, this.opt);
    return this;
  }
  bounce(sVal = 1, opt: kf = {}) {
    O.ass(this.opt, opt);
    const ad = [0.5, sVal, 1].map((mp) => ({ transform: `scale(${mp})` }));
    this.e.animate(ad);
    return this;
  }
}

class Eget<T extends TElem = HTMLElement> {
  constructor(
    public e: T,
    public query?: string,
  ) {}
  get a() {
    return new anim(this as any);
  }
  get all() {
    if (this.query) {
      const QD = document.querySelectorAll(this.query);
      if (QD.length) {
        return Array.from(QD).map((a) => $(a as T));
      }
    }
    return [];
  }
  get attr() {
    const lat = this.e;
    return {
      has: (attr: string): boolean => {
        return lat.hasAttribute(attr);
      },
      get: (attr: string): string | null => {
        return lat.getAttribute(attr);
      },
      del: (attr: string): Eget => {
        lat.removeAttribute(attr);

        return this;
      },
      set: (attrs: obj<any>): Eget => {
        for (const ats in attrs) {
          let aat = attrs[ats];
          if (attrs[ats] !== undefined) {
            lat.setAttribute(ats, aat ? aat : "");
          }
        }
        return this;
      },
    };
  }
  get children() {
    return Array.from(this.e.children).map((a) => $(a as T));
  }
  get click() {
    this.e.click();
    return this;
  }
  get delete() {
    this.e.remove();
    return this;
  }
  get disabled() {
    let tval = this.e as any;
    return tval.disabled ?? false;
  }
  get focus() {
    this.e.focus();
    return this;
  }
  get id() {
    return this.e.id;
  }
  get inner(): string {
    return this.e.innerHTML;
  }
  get offsetParent(): Elem | undefined {
    let prtn = this.e.offsetParent;
    if (prtn) {
      return new Elem(prtn as HTMLElement);
    }
    return undefined;
  }
  get parent(): Elem | undefined {
    let prtn = this.e.parentElement;
    if (prtn) {
      return new Elem(prtn);
    }
    return undefined;
  }
  get rect() {
    return this.e.getBoundingClientRect();
  }
  get remove_element() {
    this.e.remove();
    return this;
  }
  get style() {
    const CC = this.e.style;
    const TT = this as unknown as Elem;
    return {
      set: (
        style: CSSinT | obj<V | null>,
        delayOrFN: number | ((e?: any) => void) = 0,
      ) => {
        const TES: obj<any> = CC;
        const styler = () => {
          O.items(style).forEach(([st, vs]) => {
            if (st in TES) {
              if (TES[st] !== vs) {
                TES[st] = vs;
              }
            } else {
              if (vs !== null) {
                CC.setProperty(st, String(vs));
              }
            }
          });
        };

        if (is.fn(delayOrFN)) {
          TT.on("transitionend", delayOrFN);
        }

        if (is.num(delayOrFN)) {
          setTimeout(styler, delayOrFN);
        } else {
          styler();
        }

        return TT;
      },
      get: (prop: keyof CSSStyleDeclaration | string) => {
        return CC.getPropertyValue(prop.toString());
      },
      del: (...props: (keyof CSSStyleDeclaration | string)[]) => {
        props.forEach((pr) => {
          CC.removeProperty(pr.toString());
        });
      },
    };
  }
  get submit() {
    let tval = this.e as any;
    if ("submit" in tval) {
      return tval.submit();
    }
    return false;
  }
  get tag() {
    return this.e.tagName.toLowerCase();
  }
  get value() {
    let tval = this.e as any;
    return tval.value ?? "";
  }

  // SETTERS

  // edit
  set append(val: any) {
    if (val instanceof Dom) {
      const vl = val.__();
      upMAP(vl.attr);
      this.e.insertAdjacentHTML("beforeend", vl.ctx);
    } else {
      this.e.insertAdjacentHTML("beforeend", val);
    }
  }
  // edit
  set appendfirst(val: any) {
    if (val instanceof Dom) {
      const vl = val.__();
      upMAP(vl.attr);
      this.e.insertAdjacentHTML("afterbegin", vl.ctx);
    } else {
      this.e.insertAdjacentHTML("afterbegin", val);
    }
  }
  set disabled(vl: boolean) {
    let tval = this.e;
    if ("disabled" in tval) {
      tval.disabled = vl;
    }
  }
  set inner(val: any) {
    let ctx = val;
    if (val instanceof Dom) {
      const vl = val.__();
      upMAP(vl.attr);
      ctx = vl.ctx;
    }
    this.e.innerHTML = ctx;
  }
  set id(did: string) {
    this.e.id = did;
  }
  set value(vl: any) {
    let tval = this.e as any;
    tval.value = vl;
  }
}

export class Elem<T extends TElem = HTMLElement> extends Eget {
  constructor(e: T, query?: string) {
    super(e, query);
  }
  add(...className: string[]) {
    this.e.classList.add(...className.map((cn) => cn.replace(/[^\w-]/, "")));

    return this;
  }
  remove(...className: string[]) {
    this.e.classList.remove(...className.map((cn) => cn.replace(/[^\w-]/, "")));
    return this;
  }
  // edit
  toggle(className: string | fn<any, string>, force?: boolean) {
    let lt: string =
      typeof className != "string" ? className.apply(this) : className;
    const TC = this.e.classList;
    lt.split(" ").forEach((tg) => {
      TC.toggle(tg, force);
    });
    return this;
  }
  has(e: any | null) {
    return this.e.contains(e);
  }
  insert(position: InsertPosition) {
    return {
      HTML: (...text: string[]): Elem => {
        text.forEach((tt) => {
          this.e.insertAdjacentHTML(position, tt);
        });
        return this;
      },
      element: (...elem: HTMLElement[]): Elem => {
        elem.forEach((tt) => {
          this.e.insertAdjacentElement(position, tt as any);
        });
        return this;
      },
      text: function (this: Elem, ...text: string[]): Elem {
        text.forEach((tt) => {
          this.e.insertAdjacentText(position, tt);
        });
        return this;
      },
    };
  }
  is(tp: { dom?: string; class?: string | string[] }): boolean {
    const clist = this.e.classList.value.split(" ");
    const dom_name = this.e.tagName.toLocaleLowerCase();
    let yes: boolean = true;
    let isdom = true;

    if (tp.dom) {
      isdom = tp.dom == dom_name ? true : false;
    }

    if (tp.class) {
      if (Array.isArray(tp.class)) {
        tp.class.forEach((t) => {
          yes = yes ? clist.includes(t) : false;
        });
      } else {
        yes = yes ? clist.includes(tp.class) : false;
      }
    }
    return yes && isdom;
  }
  on(
    event: keyof HTMLElementEventMap,
    handler: (e?: any) => void,
    useCapture: boolean = false,
  ) {
    let passive = false;
    if (event.indexOf("touch") > -1) {
      passive = true;
    }
    this.e.addEventListener(event, handler, {
      capture: useCapture,
      passive: passive,
    });
    return this;
  }
  remove_on(
    event: keyof DocumentEventMap,
    handler: EventListenerOrEventListenerObject,
    useCapture: boolean = false,
  ) {
    this.e.removeEventListener(event, handler, useCapture);
    return this;
  }
  timed(fn: (ee?: Elem) => void, timeout = 250) {
    setTimeout(() => fn(this), timeout);
    return this;
  }
  animate(keyframes: KFType, options?: kf, onComplete?: fn<any, void>): this;
  animate(keyframes: KFType, onComplete?: fn<any, void>): this;
  animate(
    keyframes: KFType,
    optionsOrOnComplete?: kf | fn<any, void>,
    onComplete?: fn<any, void>,
  ) {
    const opt: kf = {
      duration: 300,
      easing: "ease",
      fill: "forwards",
    };

    if (is.fn(optionsOrOnComplete)) {
      onComplete = optionsOrOnComplete;
    } else {
      O.ass(opt, optionsOrOnComplete);
    }
    const anim = this.e.animate(keyframes as Keyframe[], opt);

    if (onComplete) {
      anim.finished.then(onComplete);
    }
    return this;
  }
}

export function $(query: string): Elem | undefined;
export function $<T extends TElem = HTMLElement>(element: T): Elem<T>;
export function $<T extends TElem = HTMLElement>(element: T | string) {
  if (is.str(element)) {
    const QD = document.querySelector(element);
    if (QD) return new Elem<T>(QD as T, element);
    return undefined;
  } else {
    return new Elem<T>(element);
  }
}

/*
-------------------------

-------------------------
*/

class Mapper<K, V> extends Map<K, V> {
  obj(obj?: object | null) {
    obj && O.items(obj).forEach(([k, v]) => this.set(k as K, v));
  }
  map(map: Map<K, V>) {
    map.forEach((v, k) => {
      this.set(k, v);
    });
  }
}
class idm {
  private _c = 0;
  private id = "";
  constructor(mid?: string) {
    this._c = 0;
    this.id = mid ?? make.ID(5);
    if (mid && mid.indexOf("_") > 1) {
      const [xid, xin] = mid.split("_");
      this.id = xid;
      this._c = parseInt(xin);
    }
  }
  get mid() {
    return this.id + "_" + ++this._c;
  }
}
export class Watcher<T> {
  private val: T;
  private _do: ((arg: T) => void)[] = [];
  constructor(public watching: () => T) {
    this.val = watching();
  }
  on(changed: (arg: T) => void, init: boolean = true) {
    this._do.push(changed);
    if (init) changed(this.val);
    return this;
  }
  get update() {
    const NV = this.watching();
    if (this.val !== NV) {
      this.val = NV;
      this._do.forEach((dd) => {
        dd(NV);
      });
    }
    return;
  }
}

const TAGS = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

const has = {
  tag: (tag: string) => TAGS.includes(tag),
};

/*
-------------------------

-------------------------
*/

/*
  -------------------------
  
  -------------------------
  */

const XMAP: VMapper = new Mapper();
const WinSTATE: Mapper<
  string,
  obj<(e?: HTMLElement, t?: EventTarget | null) => void>
> = new Mapper();
const WaSTATE: Mapper<string, Watcher<any>[]> = new Mapper();
const _D = document;
const _W = window;

/*
-------------------------
STATES
-------------------------
*/

function windowState() {
  _W.addEventListener("resize", function (e: UIEvent) {
    WinSTATE.forEach((val, key) => {
      if (val.resize) {
        const D = _D.getElementById(key);
        if (D) {
          val.resize.call(D, e.target as any);
        } else {
          WinSTATE.delete(key);
        }
      }
    });
  });
  _W.addEventListener("beforeunload", function (e: BeforeUnloadEvent) {
    WinSTATE.forEach((val, key) => {
      if (val.unload) {
        const D = _D.getElementById(key);
        if (D) {
          val.unload.call(D, e.target as any);
        } else {
          WinSTATE.delete(key);
        }
      }
    });
  });
  _W.addEventListener("popstate", function (e: PopStateEvent) {
    WinSTATE.forEach((val, key) => {
      if (val.popstate) {
        const D = _D.getElementById(key);
        if (D) {
          val.popstate.call(D, e.target as any);
        } else {
          WinSTATE.delete(key);
        }
      }
    });
  });

  // Maintain the scrollPosition in session
}

function upMAP(NMP: VMapper) {
  NMP.size &&
    NMP.keys().forEach((fc) => {
      XMAP.delete(fc);
      WaSTATE.delete(fc);
      WinSTATE.delete(fc);
    });
  XMAP.map(NMP);
}

function dom_trig(k: string, x: string, dx: Elem, yy: any): boolean {
  const [adm, _adm] = yy as _MS;
  const dm = adm(dx.e) as any;
  let mid = dx.id;
  if (mid) {
    let ndm = new idm(mid);
    const NMP: VMapper = new Mapper();
    const [actxx, _] = _CTX(dm, NMP, ndm);

    if (_adm !== actxx) {
      XMAP.get(k)!.get(x)![1] = actxx;
      NMP.size && upMAP(NMP);
      dx.inner = actxx;
      return true;
    }
  }
  return false;
}

function trigger(by: string, affectChildren = false, noDom = true) {
  if (XMAP.size) {
    for (const [key, val] of XMAP) {
      if (val.size) {
        const D = _D.getElementById(key);
        if (D) {
          const dx = $(D);
          let domOnly = false;
          const mx = affectChildren ? "dom" : "dom_ctx";
          const vg = val.get(mx);
          if (noDom && vg) {
            domOnly = dom_trig(key, mx, dx, vg);
          }
          //
          if (domOnly) {
            trigger("doms", false, false);
          } else
            for (const [x, y] of val) {
              switch (x) {
                case "dom":
                case "dom_ctx":
                  break;
                case "ctx":
                  const [cxt, _ctx] = y as _MS;
                  const NMP: VMapper = new Mapper();
                  const [ic] = _CTX(cxt(D!), NMP);
                  if (_ctx != ic) {
                    dx.inner = ic;
                    NMP.size && upMAP(NMP);
                    const XG = XMAP.get(key)?.get(x);
                    if (XG) XG[1] = ic;
                  }
                  //
                  break;
                case "on":
                  XMAP.get(key)?.delete(x);
                  O.items(y).forEach(([kk, vv]) => {
                    if (is.fn(vv)) {
                      let xvv = vv as (e?: HTMLElement | undefined) => void;
                      if (kk === "ready") {
                        vv.apply(D);
                      } else if (
                        ["resize", "unload", "popstate"].includes(kk)
                      ) {
                        WinSTATE.set(key, { [kk]: xvv });
                      } else if (kk === "watch") {
                        // const vvd = vv(D) as WTC | WTC[];
                        const vvd = vv.apply(D) as WTC | WTC[];
                        if (vvd) {
                          let fvvd = is.arr(vvd) ? vvd : [vvd];
                          fvvd.length && WaSTATE.set(key, fvvd as any);
                        }
                      } else {
                        dx.on(kk as any, xvv);
                      }
                    }
                  });

                  //
                  break;
                case "style":
                  const _stl: obj<V> = {};
                  O.items(y).forEach(([kk, vv]) => {
                    const [nval, _nval] = vv as _MS;
                    const sval = nval(D) as any;
                    if (sval !== _nval) {
                      _stl[kk] = sval;
                      O.ass(XMAP.get(key)?.get(x) ?? {}, {
                        [kk]: [nval, sval],
                      });
                    }
                  });
                  O.length(_stl) && dx.style.set(_stl);
                  break;
                default:
                  let [xy, _xy] = y as _MS;
                  let yxy = xy(D);
                  if (Array.isArray(yxy)) {
                    yxy = yxy.filter((y) => y != "").join(" ");
                  }
                  if (yxy != _xy) {
                    dx.attr.set({ [x]: yxy });
                    XMAP.get(key)?.set(x, [xy, yxy]);
                  }
                  break;
              }
            }
          //
        } else XMAP.delete(key);
      } else XMAP.delete(key);
    }
  }

  WaSTATE.forEach((val) => {
    val.forEach((vv) => {
      if ("update" in vv) {
        vv.update;
      }
    });
  });
}

const reValDom = (vx: any, affect: boolean) => {
  if (vx instanceof Dom && affect) {
    vx.component = false;
  } else if (is.arr(vx)) {
    vx.forEach((vc) => {
      reValDom(vc, affect);
    });
  }
};

function __unChanged(val: any, nval: any): boolean {
  if (typeof nval == "object") {
    if (is.arr(nval)) {
      if (!is.obj(nval[0])) {
        return nval.join("") === val.join("");
      }
    }
  }
  return val === nval;
}

export function state<T, O = obj<any>>(
  val: T,
  affectChildren = false,
): [() => T, (newValue: T) => void, O] {
  reValDom(val, affectChildren);
  let ee: T = val;
  let obj: O = {} as O;
  const getValue = (): T => ee;
  const setValue = (newValue: T): void => {
    if (__unChanged(ee, newValue)) return;
    reValDom(newValue, affectChildren);
    ee = newValue;
    trigger("state", affectChildren);
  };
  return [getValue, setValue, obj];
}

export class Render {
  constructor(public app: (data: any) => Dom | Promise<Dom>) {}
  async dom(data = {}) {
    let noscrp = `<noscript>You need to enable JavaScript to run this app.</noscript>`;
    const _XRT = $(document.body);
    const id = _XRT.id;
    if (id) {
      const _id = new idm(id + "_0");
      const TA = await this.app(data);
      const XDM = is.arr(TA) ? TA : [TA];
      XDM.reverse().forEach((ts: Dom) => {
        const its = ts.__(_id);
        XMAP.map(its.attr);
        _XRT.appendfirst = its.ctx;
      });
      _XRT.appendfirst = noscrp;

      trigger("render");
      windowState();
    }
  }
}

/*
-------------------------

-------------------------
*/

function _ATTR(
  key: string,
  val: any,
  style = false,
  atMap: Mapper<string, string>,
  doMap: Mapper<string, MS2 | _MS>,
) {
  if (is.fn(val)) {
    const vt = val();
    _ATTR(key, vt, style, atMap, doMap);
    doMap.set(key, [val, vt]);
  } else if (!is.arr(val) && is.obj(val)) {
    if (style) {
      const svt = O.items(val)
        .map(([ss, vv]) => {
          const xss = str.camel(ss);
          let _vv = vv;
          if (is.fn(vv)) {
            if (!doMap.has("style")) doMap.set("style", {});
            _vv = vv();
            O.ass(doMap.get("style")!, { [xss]: [vv, _vv] });
          }
          return `${xss}:${_vv}`;
        })
        .join(";");

      atMap.set("style", svt);
    }
  } else {
    const _val = (is.arr(val) ? val.flat() : [val]).filter(
      (s) => s !== undefined,
    );
    atMap.set(
      key,
      _val.map((s) => (is.bool(s) ? (s ? "" : "false") : String(s))).join(" "),
    );
  }
}

function _CTX(
  val: any,
  f_fatt: VMapper,
  pid: idm = new idm(),
  _ctx?: string[],
): [string, boolean] {
  let _xval = is.arr(val) ? val.flat() : [val];
  let component = true;
  const KV = _xval
    .map((e) => {
      if (e instanceof Dom) {
        component = e.component;
        const ed = e.__(pid);
        f_fatt.map(ed.attr);
        return ed.ctx;
      } else if (is.obj(e)) {
        return JSON.stringify(e);
      } else {
        return String(e === undefined ? "" : e);
      }
    })
    .join("");

  _ctx?.push(KV);
  return [KV, component];
}

export class Dom {
  component: boolean = true;
  constructor(
    public tag: string,
    public _attr?: attr,
    public _ctx: ctx[] = [],
  ) {}

  __(pid: idm = new idm()) {
    let xid = pid.mid;
    const doMap: Mapper<string, MS2 | _MS> = new Mapper();
    const attMap: Mapper<string, string> = new Mapper();
    const faMap: VMapper = new Mapper();
    const _ctx: string[] = [];

    if (this._attr) {
      O.items(this._attr).forEach(([k, v]) => {
        if (k !== "__") {
          if (k === "on") doMap.set(k, v);
          else {
            _ATTR(k, v, k === "style", attMap, doMap);
          }
        }
      });
    }

    const x_len = this._ctx.length;
    this._ctx.forEach((ct) => {
      if (is.fn(ct)) {
        if (x_len > 1) {
          _CTX(dom("span", {}, ct), faMap, pid, _ctx);
        } else {
          const vt = ct();
          const ndx = new idm();
          xid = ndx.mid;
          //
          if (vt instanceof Dom) {
            const [dctx, isD] = _CTX(vt, faMap, ndx, _ctx);
            doMap.set(isD ? "dom_ctx" : "dom", [ct, dctx]);
          } else {
            const [actx, isco] = _CTX(vt, faMap, ndx, _ctx);
            doMap.set(faMap.size ? (isco ? "dom_ctx" : "dom") : "ctx", [
              ct,
              actx,
            ]);
          }
        }
      } else {
        _CTX(ct, faMap, pid, _ctx);
      }
    });

    if (doMap.size) {
      xid = attMap.get("id") ?? attMap.set("id", xid).get("id")!;
      faMap.set(xid, doMap);
    }

    const _attr_txt = [[], ...attMap]
      .map(([k, v]) => {
        return v ? `${k}="${v}"` : k;
      })
      .join(" ");

    const name = this.tag;
    let dname = `<${name}${_attr_txt}>`;
    if (!has.tag(name)) {
      if (_ctx.length) dname += _ctx.join("");
      dname += `</${name}>`;
    }
    return {
      ctx: dname,
      attr: faMap,
    };
  }
}

export function dom(
  tag: string | ((attr?: attr, ...ctx: ctx[]) => Dom),
  attr?: attr,
  ...ctx: ctx[]
) {
  let __: any = ctx;
  if (attr && attr["__"]) {
    __ = attr.__;
    delete attr.__;
  }
  if (is.fn(tag)) {
    return tag(__ ? { ...attr, __ } : __, ...ctx);
  } else {
    return new Dom(tag, attr, ctx);
  }
}

export function frag(r: any, ...d: ctx[]) {
  return d;
}

/*
-------------------------

-------------------------
*/

/*
-------------------------
MISC
1. eventStream
2. local
3. session
-------------------------
*/

export const { eventStream, local, session } = (function () {
  //
  const eventSources: obj<EventSource> = {};
  const eventListener: obj<obj<((a: MessageEvent) => void)[]>> = {};
  class eStream {
    stream: EventSource;
    url: string;
    constructor(eurl: string, withCredentials: boolean) {
      this.url = eurl;
      if (eurl in eventSources) {
        this.stream = eventSources[eurl];
      } else {
        this.stream = new EventSource(eurl, {
          withCredentials: withCredentials,
        });
        eventSources[eurl] = this.stream;
        eventListener[this.url] = {};
      }
    }
    on(event: obj<(a: MessageEvent) => void>) {
      const strm = this.stream;
      O.items(event).forEach(([kk, vv]) => {
        if (kk in eventListener[this.url]) {
          eventListener[this.url][kk].forEach((lt) => {
            this.stream.removeEventListener(kk, lt);
          });
          eventListener[this.url][kk] = [];
        }
        // Then
        strm.addEventListener(kk, vv);
        if (!(kk in eventListener[this.url])) {
          eventListener[this.url][kk] = [];
        }
        eventListener[this.url][kk].push(vv);
      });
      return this;
    }
  }
  function eventStream(url: string, withCredentials = true) {
    return new eStream(url, withCredentials);
  }
  function is_number(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  class __I {
    constructor(public value: any) {}
    get str(): string | null {
      const stt = String(this.value).toString();
      return stt == "null" ? null : String(this.value).toString();
    }
    get int(): number | null {
      if (is_number(this.value)) {
        return parseInt(this.value);
      } else {
        return null;
      }
    }
    get float(): number | null {
      if (is_number(this.value)) {
        return parseFloat(this.value);
      } else {
        return null;
      }
    }
    get bool(): boolean | null {
      if (this.value === "true") {
        return true;
      } else if (this.value == "false") {
        return false;
      } else {
        return null;
      }
    }
    get json(): any | null {
      if (this.value) {
        return JSON.parse(this.value);
      }
      return null;
    }
  }
  class _loc {
    key: string;
    func: (() => any) | null;
    storage: Storage;
    constructor(
      item: obj<() => any> | string,
      _type: "local" | "session" = "local",
    ) {
      if (typeof item == "object") {
        const [k, v] = O.items(item)[0];
        this.key = k;
        this.func = v;
      } else {
        this.key = item;
        this.func = null;
      }
      this.storage = _type == "local" ? localStorage : sessionStorage;
    }
    get as() {
      return new __I(this.storage.getItem(this.key));
    }
    get value(): string | null {
      return this.storage.getItem(this.key);
    }
    get save() {
      if (this.func) {
        this.set = this.func();
      }

      return;
    }
    set set(val: any) {
      if (typeof val == "object") {
        this.storage.setItem(this.key, JSON.stringify(val));
      } else {
        this.storage.setItem(this.key, String(val));
      }
    }
    get remove() {
      this.storage.removeItem(this.key);
      return;
    }
  }
  /**
   * Local Storage
   */
  const local = {
    get: (item: obj<() => any> | string) => new _loc(item),
  };

  /**
   * Session Storage
   */
  const session = {
    get: (item: obj<() => any> | string) => new _loc(item, "session"),
  };

  return { eventStream, local, session };
})();

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

function isCSS(href: string) {
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
  if (isCSS(_url)) return;

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

const For = (
  d: attr & {
    each?: any[] | object;
  },
  ...X: Dom[]
) => {
  const RTS: any[] = [];
  const de = d.each;
  delete d.each;
  X.forEach((k: any) => {
    if (typeof k == "function") {
      if (Array.isArray(de)) {
        RTS.push(...de.map(k));
      } else if (typeof de == "object") {
        RTS.push(...O.keys(de).map(k));
      }
    } else {
      RTS.push(k);
    }
  });

  return dom("div", { ...d }, RTS);
};

export function preload(url: string, as: string, type: string): string {
  if (isCSS(url)) return url;

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

export class __ {
  static _class(x: attr, cl: any[]) {
    const _cl: any[] = cl;
    if (x?.class) {
      _cl.push(...(Array.isArray(x.class) ? x.class : [x.class]));
    }
    return _cl.filter((cf) => cf);
  }
  static _str(str?: string | Dom | number, ret?: Dom) {
    if ((str && typeof str == "string") || typeof str == "number") {
      return ret;
    }
    return str;
  }
  static _attr(x: attr, ...xclude: string[]) {
    return O.items(x).reduce<any>((dc, [k, v]) => {
      if (!xclude.includes(k)) dc[k] = v;
      return dc;
    }, {});
  }
  static _re_attr(
    x: any,
    vals: string[],
    _styles: obj<any> = {},
    ..._classes: any[]
  ) {
    const _x = __._attr(x, ...vals);

    if (O.length(_styles)) {
      !_x.style && (_x.style = {});
      O.ass(_x.style, _styles);
    }

    _classes && _classes.length && (_x.class = this._class(x, _classes));

    return _x;
  }
  static _meta(meta: string, url: string) {
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
          _url = "./" + rgt + "/" + rgp;
          // -----
        } else if (url.startsWith(".")) {
          const rgp = url.split("/").slice(1).join("/");
          const rgy = rgd[1].split("/").slice(1, -1).join("/");

          _url = "/" + rgy + "/" + rgp;
        }
      }
    }

    return _url;
  }
  static _parseURL(url: string) {
    const parsed: string[] = [];
    const wcard: string[] = [];
    let murl = url;
    let qurl = "";
    const splitd = url.match(/(?<=\?)[^/].*=?(?=\/|$)/g);

    if (splitd?.[0]) {
      qurl = splitd?.[0];
      murl = url.slice(0, url.indexOf(qurl) - 1);
    }
    const prsed = murl.match(/(?<=\/)[^/].*?(?=\/|$)/g) ?? ["/"];
    const query: any = {};

    prsed?.forEach((pr) => {
      if (pr.indexOf("<") >= 0) {
        const tgp = pr.match(/(?<=<)[^/].*?(?=>|$)/g);
        if (tgp?.length) {
          const tgz: string = tgp[0];
          if (tgz.indexOf(":") > -1) {
            const [_type, _wcard] = tgz.split(":");
            parsed.push(_type);
            wcard.push(_wcard);
          } else {
            parsed.push(tgz);
          }
        }
      } else {
        parsed.push(pr);
      }
    });

    if (url.slice(-1) == "/" && url.length > 1) {
      parsed.push("/");
    }

    if (qurl) {
      const _qq = decodeURIComponent(qurl);
      const _qstr = _qq.split("&");
      _qstr.forEach((qs) => {
        const [ak, av] = qs.split(/\=(.*)/, 2);
        query[ak] = av;
      });
    }

    return { parsed, wcard, query };
  }
  static is_number(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  static _type(wrd: any, isFinal: boolean = false) {
    let lit_type: [any, string] | [] = [];
    if (this.is_number(wrd)) {
      const nm = Number(wrd);
      lit_type = [nm, "number"];
    } else {
      if (isFinal && wrd.indexOf(".") >= 1) {
        lit_type = [wrd, "file"];
      } else {
        let tps = "-";
        if (wrd.length == 36) {
          const dashy = wrd.match(/\-/g);
          if (dashy && dashy.length == 4) {
            tps = "uuid";
          } else {
            tps = "string";
          }
        } else if (wrd != "/") {
          tps = "string";
        }
        lit_type = [wrd, tps];
      }
    }
    return lit_type;
  }
  static _px(itm: obj<number>) {
    return O.items(itm).reduce<obj<string>>((pr, [k, v]) => {
      pr[k] = typeof v == "number" ? v + "px" : v;
      return pr;
    }, {});
  }
}

/**
 *
 * string | number | uuid
 *
 * /url/\<string>
 *
 * /url/\<string:*hell> value contains the substring "hello"
 *
 * /url/\<string:^hell> value begins with "hello"
 *
 * /url/\<string:$hell> value ends with "hello"
 */

const SLC = (cf: Elem, xid: string, attr: string = "url") => {
  const curl = cf.attr.get(attr);
  if (curl == xid) {
    cf.attr.set({ slc: "" });
  } else {
    cf.attr.del("slc");
  }
};

function matchWC(str: string, fndr: string) {
  const st = str[0];
  const wrd = str.slice(1);
  switch (st) {
    case "*":
      return fndr.includes(wrd);
    case "^":
      return fndr.startsWith(wrd);
    case "&":
      return fndr.endsWith(wrd);
    default:
      return false;
  }
}

interface view {
  js: string | (() => Dom | Promise<Dom>);
  title: string;
  sT?: number;
}

const pathname = location.pathname.slice(0, -1);
class rS4t {
  maps: obj<view> = {};
  wild: string[] = [];
  constructor(private basePath?: string) {}
  private push(path: string) {
    const wc = ["string", "number", "uuid"];
    const { parsed, wcard } = __._parseURL(path);
    if (wcard.length) {
      this.wild.push(path);
    } else {
      for (let i = 0; i < parsed.length; i++) {
        if (wc.includes(parsed[i])) {
          this.wild.push(path);
          break;
        }
      }
    }
  }
  private match(url: string) {
    const WURL = this.wild;
    const { parsed } = __._parseURL(url);
    let smatch = "";
    let wcmatchd = "";
    let upcount = 0;
    //
    let wcrdCnt = 0;
    parsed.forEach((mk, ind) => {
      for (let i = 0; i < WURL.length; i++) {
        const { parsed: pr, wcard } = __._parseURL(WURL[i]);
        if (pr.length == parsed.length && wcard.length) {
          if (mk == pr[ind]) {
            wcmatchd = WURL[i];
            upcount++;
            break;
          } else if (wcard[wcrdCnt]) {
            const wc = wcard[wcrdCnt];
            wcrdCnt++;
            //
            if (matchWC(wc, mk)) {
              wcmatchd = WURL[i];
              upcount++;
              break;
            }
          } else {
            const TP = __._type(mk);
            if (pr[ind] == TP[1]) {
              wcmatchd = WURL[i];
              upcount++;
              break;
            }
          }
        }
      }
    });

    if (!wcmatchd || upcount != parsed.length) {
      parsed.forEach((mk, ind) => {
        for (let i = 0; i < WURL.length; i++) {
          const { parsed: pr } = __._parseURL(WURL[i]);
          if (pr.length == parsed.length) {
            if (mk == pr[ind]) {
              smatch = WURL[i];
              break;
            } else {
              const [_, xpctd] = __._type(mk);
              if (pr[ind] == xpctd) {
                smatch = WURL[i];
                break;
              }
            }
          }
        }
      });
    }

    return upcount == parsed.length ? wcmatchd : smatch;
  }
  url(url: string): [string, boolean] {
    if (url in this.maps) {
      return [url, false];
    } else {
      const wnv = this.match(url);
      if (wnv && wnv in this.maps) {
        return [wnv, true];
      }
    }
    return ["", false];
  }
  path(
    path: string,
    {
      file,
      title = "",
    }: { file: string | (() => Dom | Promise<Dom>); title?: string },
  ) {
    const bp = this.basePath;
    this.push(path);
    if (is.fn(file)) {
      this.maps[path] = { js: file, title };
    } else {
      const ult = pathname + (bp ? bp + file : file);
      this.maps[path] = { js: ult.replaceAll("//", "/"), title };
    }
  }
}

export class Router {
  private map: rS4t;
  private pushState: boolean;
  url: string = "";
  attr: string;
  isSheet: boolean;
  // states
  private _page: (dm: Dom) => void;
  private _nav: (dm: string) => void;
  private _title: (dm: string) => void;
  page: () => Dom;
  nav: () => string;
  title: () => string;
  private e?: HTMLElement;
  constructor(
    r: {
      pushState?: boolean;
      basePath?: string;
      isSheet?: boolean;
    } = {},
  ) {
    [this.page, this._page] = state<Dom>(dom("div", undefined, ""), true);
    [this.nav, this._nav] = state("/");
    [this.title, this._title] = state("");
    this.pushState = r.pushState ?? true;
    this.isSheet = r.isSheet ?? false;
    this.attr = r.isSheet ? "surl" : "url";
    //
    this.map = new rS4t(r.basePath);
  }
  init(eh?: HTMLElement, ...dsmissed: ((a: any) => void)[]) {
    this.e = eh;
    const nav = this.nav;
    const $nav = this._nav;
    const attr = this.attr;
    const STR = (xid: string, last?: string) => {
      if (xid !== last) {
        this.get(xid, last);
        $nav(xid);
      }
      dsmissed.forEach((df, indx) => {
        df(this.isSheet && indx == 0 ? true : false);
      });
    };
    $(`[${attr}]`)?.all.forEach((cf) => {
      const CG = cf.attr.has("nav");
      if (!CG) {
        cf.attr.set({ nav: null });
        cf.on("click", function (this: HTMLElement, e: MouseEvent) {
          e.preventDefault();
          const _E = $(this),
            xid = _E.attr.get(attr);
          if (xid) STR(xid, nav());
        });
      }
    });

    return this;
  }
  private afterImp(np: view, TTLE: string, nip: string, iswc = false) {
    this._title(TTLE);
    this.init(this.e);
    if (!this.isSheet) {
      const cURL = window.location.pathname;
      if (cURL !== nip) {
        this.pushState && history.pushState({}, TTLE, nip);
      }
      !iswc && this.e && this.e.scrollTo({ top: np.sT, behavior: "instant" });
    }
  }
  private import(np: view, nip: string, iswc = false) {
    const IMP = async (njs: () => Dom | Promise<Dom>) => {
      this._page(await njs());
      this.afterImp(np, document.title, nip);
    };
    //
    if (is.str(np.js)) {
      import(np.js)
        .then(async (e) => {
          if ("default" in e) {
            this._page(
              await e.default({
                ...(iswc && { url: nip }),
              }),
            );
            const TTLE = e.TITLE ?? document.title;
            !this.isSheet && (document.title = TTLE);
            this.afterImp(np, TTLE, nip);
          } else {
            this._page(
              dom("div", undefined, "error: js has no export defaults."),
            );
          }
        })
        .catch((e) => {
          this._page(dom("div", undefined, "Page not found..."));
        });
    } else {
      IMP(np.js);
    }
  }
  sheet(url: string) {
    const [_url, iswc] = this.map.url(url);
    if (_url) {
      this.import(this.map.maps[_url], url, iswc);
    }
    return this;
  }
  reset() {
    this._page(dom("div", undefined, ""));
  }
  async get(url: string, lastURL?: string) {
    if (lastURL) {
      const [_lasturl, _] = this.map.url(lastURL);
      if (_lasturl && this.e) {
        this.map.maps[_lasturl].sT = this.e.scrollTop ?? 0;
      }
    }
    const [_url, iswc] = this.map.url(url);
    if (_url) {
      this.url = url;
      this._nav(url);
      !this.isSheet && $(`[${this.attr}]`)?.all.forEach((cf) => SLC(cf, url));
      //
      this.import(this.map.maps[_url], url, iswc);
    } else {
      this._page(dom("div", undefined, `"${url}" - not found...`));
    }

    return this;
  }
  path(
    path: string,
    {
      file,
      title = "",
    }: { file: string | (() => Dom | Promise<Dom>); title?: string },
  ) {
    this.map.path(path, { file, title });
    //
    return this;
  }
}

/*
-------------------------

-------------------------
*/

declare global {
  type events = _events & c_events;
  type attr = obj<S> | Battr;
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
