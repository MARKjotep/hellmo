import { $$, idm, isFN, isNum, isStr, oAss, obj, oItems, V } from "./@";
import { CSSinT } from "./attr";
import { Wizard, Dom } from "./dom";
import { OZ } from "./oz";

type TElem = HTMLElement & InstanceType<typeof Element>;

type kf = KeyframeAnimationOptions;
type KFType = (CSSinT | obj<V>)[] | CSSinT | obj<V>;
type fn<E, T> = (e?: E) => T;

const pushDOM = (
  val: Dom | string,
  pid?: string,
): { ctx: string; oz: OZ | undefined } => {
  if (val instanceof Dom) {
    return val.__(new idm(pid));
  }
  return { ctx: val, oz: undefined };
};

class anim {
  opt: kf;
  constructor(private e: Elem) {
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
      oAss(this.opt, options);
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
    oAss(this.opt, options);
    const ac = [0, 1].map((k) => ({
      opacity: k,
    }));
    this.e.animate(ac, this.opt);
    return this;
  }
  shake(XorY = "Y", opt: kf = {}) {
    oAss(this.opt, opt);
    const ac = [0, 5, -5, 5, 0].map((k) => ({
      transform: `translate${XorY}(${k}px)`,
    }));
    this.e.animate(ac, this.opt);
    return this;
  }
  color(c: string[] = [], opt: kf = {}) {
    oAss(this.opt, opt);
    let ac = Array.isArray(c) ? c.map((cc) => ({ color: cc })) : { color: c };
    this.e.animate(ac, this.opt);
    return this;
  }
  bg(c: string | string[] = [], opt: kf = {}) {
    oAss(this.opt, opt);
    let ac = Array.isArray(c)
      ? c.map((cc) => ({ backgroundColor: cc }))
      : { backgroundColor: c };
    this.e.animate(ac, this.opt);
    return this;
  }
  bounce(sVal = 1, opt: kf = {}) {
    oAss(this.opt, opt);
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
        return Array.from(QD).map((a) => a as T);
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
  get href() {
    return (this.e as unknown as HTMLAnchorElement)?.href ?? "";
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
  get path() {
    return (this.e as unknown as HTMLAnchorElement)?.pathname ?? "";
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
          oItems(style).forEach(([st, vs]) => {
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

        if (isFN(delayOrFN)) {
          TT.on("transitionend", delayOrFN);
        }

        if (isNum(delayOrFN)) {
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
    const { ctx, oz } = pushDOM(val, this.id);
    this.e.insertAdjacentHTML("beforeend", ctx);
    Wizard.RPS(oz);
  }
  // edit
  set appendfirst(val: any) {
    const { ctx, oz } = pushDOM(val, this.id);
    this.e.insertAdjacentHTML("afterbegin", ctx);
    Wizard.RPS(oz);
  }
  set inner(val: any) {
    // get the parent first
    $$.p = this.id;
    const { ctx, oz } = pushDOM(val, this.id + "-0");
    this.e.innerHTML = ctx;
    Wizard.RPS(oz);
  }
  set disabled(vl: boolean) {
    let tval = this.e;
    if ("disabled" in tval) {
      tval.disabled = vl;
    }
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

    if (isFN(optionsOrOnComplete)) {
      onComplete = optionsOrOnComplete;
    } else {
      oAss(opt, optionsOrOnComplete);
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
  if (isStr(element)) {
    const QD = document.querySelector(element);
    if (QD) return new Elem<T>(QD as T, element);
    return undefined;
  } else {
    return new Elem<T>(element);
  }
}
