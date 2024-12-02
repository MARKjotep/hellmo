import {
  $$,
  isArr,
  isBool,
  isDict,
  isFN,
  isNumber,
  isObj,
  makeID,
  Mapper,
  ngify,
  oAss,
  obj,
  oItems,
  oLen,
  reCamel,
  V,
} from "./@.js";
import { $, CSSinT, Elem, STYLE } from "./elem.js";
import { attr } from "../index.js";

type S = string | string[] | ((e?: Element) => S) | boolean;
type DV = V | Dom;
type ctx = DV | DV[] | (() => DV | DV[]);
type _MS = [(e?: Element) => S | ctx, any];
type MS2 = obj<_MS>;
type VMapper = Mapper<string, Mapper<string, MS2 | _MS>>;
type domMAP = Mapper<string, MS2 | _MS>;
type WTC = [(...e: any) => void, (e?: any) => any, true?];

const XMAP: VMapper = new Mapper();

const WinSTATE: Mapper<
  string,
  obj<(e?: HTMLElement, t?: EventTarget | null) => void>
> = new Mapper();

// -------------------------
const WaSTATE: Mapper<string, Watcher<any>[]> = new Mapper();
// -------------------------

class idm {
  _c = 0;
  id = "";
  constructor(mid?: string) {
    this._c = 0;
    this.id = mid ?? makeID(5);
    if (mid && mid.includes("_")) {
      const sa = mid.split("_");
      const lstr = sa.slice(-1).toString();
      const nm = isNumber(lstr);
      this.id = sa.slice(0, -1).join("_");
      this._c = nm ? parseInt(lstr) : 0;
    }
  }
  get mid() {
    return this.id + "_" + ++this._c;
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

const hasTag = (tag: string) => TAGS.includes(tag);

/*
-------------------------

-------------------------
*/

function windowState() {
  const _W = window;
  const _D = document;

  const handleEvent = (
    event: UIEvent | BeforeUnloadEvent | PopStateEvent,
    eventType: "resize" | "unload" | "popstate",
  ) => {
    WinSTATE.forEach((val, key) => {
      if (val[eventType]) {
        const D = _D.getElementById(key);
        if (D) {
          val[eventType].call(D, event.target as any);
        } else {
          WinSTATE.delete(key);
        }
      }
    });
  };

  _W.addEventListener("resize", (e) => handleEvent(e, "resize"));
  _W.addEventListener("beforeunload", (e) => handleEvent(e, "unload"));
  _W.addEventListener("popstate", (e) => handleEvent(e, "popstate"));
}

function dom_trig(
  key: string,
  selector: string,
  element: Elem,
  state: _MS,
): boolean {
  const [getValue, prevValue] = state;
  const newValue = getValue(element.e) as any;
  const elementId = element.id;

  if (elementId) {
    const newIdManager = new idm(elementId);
    const valueMapper: VMapper = new Mapper();
    const [contextValue, _] = _CTX(newValue, valueMapper, newIdManager);

    if (prevValue !== contextValue) {
      XMAP.get(key)!.get(selector)![1] = contextValue;
      valueMapper.size && upMAP(valueMapper);
      element.inner = contextValue;
      return true;
    }
  }
  return false;
}

function trigger(by: string, affectChildren = false, noDom = true) {
  const _D = document;
  if (!XMAP.size) return;
  handleXMAPEntries(_D, affectChildren, noDom);
  updateWatchState();
}

function handleXMAPEntries(
  _D: Document,
  affectChildren: boolean,
  noDom: boolean,
) {
  for (const [key, val] of XMAP) {
    if (!val.size) {
      XMAP.delete(key);
      continue;
    }
    const D = _D.getElementById(key);
    if (!D) {
      XMAP.delete(key);
      continue;
    }

    const dx = $(D);
    const mx = affectChildren ? "dom" : "dom_ctx";
    const vg = val.get(mx);

    if (noDom && vg && dom_trig(key, mx, dx, vg as _MS)) {
      trigger("doms", false, false);
      continue;
    }

    processMapEntries(val, key, dx);
  }
}

function processMapEntries(val: Map<any, any>, key: string, dx: Elem) {
  for (const [x, y] of val) {
    if (x === "dom" || x === "dom_ctx") continue;
    switch (x) {
      case "ctx":
        handleContext(key, dx, y);
        break;
      case "on":
        handleEvents(key, dx, y);
        break;
      case "style":
        handleStyles(key, dx, y);
        break;
      default:
        handleDefaultAttribute(key, dx, x, y);
    }
  }
}

function handleContext(key: string, dx: Elem, y: _MS) {
  const [cxt, _ctx] = y;
  const NMP: VMapper = new Mapper();
  const [ic] = _CTX(cxt(dx.e) as any, NMP);

  if (_ctx !== ic) {
    dx.inner = ic;
    NMP.size && upMAP(NMP);
    const XG = XMAP.get(key)?.get("ctx");
    if (XG) XG[1] = ic;
  }
}

function handleEvents(key: string, dx: Elem, y: any) {
  XMAP.get(key)?.delete("on");
  oItems(y).forEach(([kk, vv]) => {
    if (!isFN(vv)) return;

    let xvv = vv as (e?: HTMLElement | undefined) => void;
    if (kk === "ready") {
      vv.apply(dx.e);
    } else if (["resize", "unload", "popstate"].includes(kk)) {
      WinSTATE.set(key, { [kk]: xvv });
    } else if (kk === "watch") {
      const vvd = vv.apply(dx.e) as WTC | WTC[];
      if (vvd) {
        let fvvd = isArr(vvd) ? vvd : [vvd];
        fvvd.length && WaSTATE.set(key, fvvd as any);
      }
    } else {
      dx.on(kk as any, xvv);
    }
  });
}

function handleStyles(key: string, dx: Elem, y: any) {
  const _stl: obj<V> = {};
  oItems(y).forEach(([kk, vv]) => {
    const [nval, _nval] = vv as _MS;
    const sval = nval(dx.e) as any;
    if (sval !== _nval) {
      _stl[kk] = sval;
      oAss(XMAP.get(key)?.get("style") ?? {}, {
        [kk]: [nval, sval],
      });
    }
  });
  oLen(_stl) && dx.style.set(_stl);
}

function handleDefaultAttribute(key: string, dx: Elem, x: string, y: _MS) {
  let [xy, _xy] = y;
  let yxy = xy(dx.e);
  if (Array.isArray(yxy)) {
    yxy = yxy.filter((y) => y != "").join(" ");
  }
  if (yxy != _xy) {
    dx.attr.set({ [x]: yxy });
    XMAP.get(key)?.set(x, [xy, yxy]);
  }
}

function updateWatchState() {
  WaSTATE.forEach((val) => {
    val.forEach((vv) => {
      if ("update" in vv) {
        vv.update;
      }
    });
  });
}

// ---------------------

const reValDom = (value: any, shouldAffectChildren: boolean): void => {
  if (value instanceof Dom && shouldAffectChildren) {
    value.component = false;
  } else if (isArr(value)) {
    value.forEach((item) => reValDom(item, shouldAffectChildren));
  }
};

function __unChanged(val: any, nval: any): boolean {
  if (typeof nval === "object" && isArr(nval) && !isObj(nval[0])) {
    return nval.join("") === val.join("");
  }
  return val === nval;
}

export function upMAP(NMP: VMapper) {
  NMP.size &&
    NMP.keys().forEach((fc) => {
      XMAP.delete(fc);
      WaSTATE.delete(fc);
      WinSTATE.delete(fc);
    });
  XMAP.map(NMP);
}

export function state<T, O = obj<any>>(
  val: T,
  affectChildren = false,
): [() => T, (newValue: T) => void, O] {
  reValDom(val, affectChildren);
  let currentValue: T = val;
  let stateObj: O = {} as O;
  //
  const getValue = (): T => currentValue;
  const setValue = (newValue: T): void => {
    if (__unChanged(currentValue, newValue)) return;
    reValDom(newValue, affectChildren);
    currentValue = newValue;
    trigger("state", affectChildren);
  };
  return [getValue, setValue, stateObj];
}

/*
-------------------------

-------------------------
*/

const processATTR = (
  attMap: Mapper<string, string>,
  doMap: domMAP,
  attr: attr | null = null,
) => {
  if (!attr) return;

  oItems(attr).forEach((k) => {
    _ATTR(k, attMap, doMap);
  });
};

function _ATTR(
  attr: [string, any],
  attMap: Mapper<string, string>,
  doMap: domMAP,
) {
  const [key, value] = attr;
  const isStyleAttr = key === "style";

  if (isFN(value)) {
    const evaluatedValue = value();

    _ATTR([key, evaluatedValue], attMap, doMap);
    doMap.set(key, [value, evaluatedValue]);
    return;
  }

  if (isDict(value)) {
    handleDictValue(key, value, isStyleAttr, attMap, doMap);
    return;
  }

  const processedValue = (isArr(value) ? value.flat() : [value])
    .filter((item) => item !== undefined)
    .map((item) => (isBool(item) ? (item ? "" : "false") : String(item)))
    .join(" ");

  attMap.set(key, processedValue);
}

function handleDictValue(
  key: string,
  value: Record<string, any>,
  isStyle: boolean,
  attMap: Mapper<string, string>,
  doMap: domMAP,
) {
  if (isStyle) {
    const styleValue = processStyleObject(value, doMap);
    attMap.set("style", styleValue);
  } else if (key === "on") {
    doMap.set(key, value);
  }
}

function processStyleObject(
  styleObj: Record<string, any>,
  doMap: domMAP,
): string {
  return oItems(styleObj)
    .map(([styleProp, styleValue]) => {
      const processedProp = reCamel(styleProp);
      let processedValue = styleValue;

      if (isFN(styleValue)) {
        processedValue = styleValue();
        if (!doMap.has("style")) {
          doMap.set("style", {});
        }
        oAss(doMap.get("style")!, {
          [processedProp]: [styleValue, processedValue],
        });
      }

      return `${processedProp}:${processedValue}`;
    })
    .join(";");
}

const processCTX = (
  ctx: ctx[],
  _ctx: string[],
  attr: VMapper,
  doMap: domMAP,
  pid: idm,
  xid: string,
) => {
  const x_len = ctx.length;

  const processFunction = (ct: any, isMultiContext: boolean) => {
    if (isMultiContext) {
      const [_cc] = _CTX(dom("div", {}, ct), attr, pid);
      _ctx.push(_cc);
    } else {
      const vt = ct();
      const ndx = new idm(xid + "_0");
      xid = ndx.mid;
      const [_cc, isDom, comp] = _CTX(vt, attr, ndx);
      const ccd = isDom ? (comp ? "dom_ctx" : "dom") : "ctx";
      doMap.set(ccd, [ct, _cc]);

      _ctx.push(_cc);
    }
  };

  ctx.forEach((ct) => {
    if (isArr(ct)) {
      processCTX(ct, _ctx, attr, doMap, pid, xid);
    } else if (isFN(ct)) {
      processFunction(ct, x_len > 1);
    } else {
      const [_cc] = _CTX(ct, attr, pid);
      _ctx.push(_cc);
    }
  });

  return xid;
};

function _CTX(
  ct: ctx,
  attr: VMapper,
  pid: idm = new idm(),
): [string, boolean, boolean] {
  const values = isArr(ct) ? ct.flat() : [ct];
  let component = true;
  let isDom = false;

  const processedValues = values.map((value) => {
    if (value instanceof Dom) {
      isDom = true;
      component = value.component;
      const processedDom = value.__(pid);
      attr.map(processedDom.attr);

      return processedDom.ctx;
    }

    if (isObj(value)) {
      return JSON.stringify(value);
    }

    return String(value === undefined ? "" : value);
  });

  return [processedValues.join(""), isDom, component];
}

export class Dom {
  component: boolean = true;
  private _ctx: ctx[];
  constructor(
    public tag: string,
    public _attr: attr | null = null,
    ..._ctx: ctx[]
  ) {
    this._ctx = _ctx;
  }
  __(pid: idm = new idm()) {
    let xid = pid.mid;
    const doMap: domMAP = new Mapper();
    const attMap: Mapper<string, string> = new Mapper();
    const attr: VMapper = new Mapper();
    const _ctx: string[] = [];
    //

    processATTR(attMap, doMap, this._attr);

    const _xid = processCTX(this._ctx, _ctx, attr, doMap, pid, xid);

    if (doMap.size) {
      const id = attMap.get("id") ?? _xid;
      attMap.set("id", id);
      attr.set(id, doMap);
    }

    let _attr_arr: string[] = [""];
    attMap.forEach((v, k) => {
      _attr_arr.push(v ? `${k}="${v}"` : k);
    });

    const name = this.tag;

    let ctx = `<${name}${_attr_arr.join(" ")}>`;
    if (!hasTag(name)) {
      if (_ctx.length) ctx += _ctx.join("");
      ctx += `</${name}>`;
    }

    return { ctx, attr };
  }
}

export function dom(
  tag: string | ((attr: attr, ctx: ctx[]) => Dom),
  attr: attr | null = null,
  ...ctx: ctx[]
): Dom {
  if (typeof tag === "function") {
    return tag(attr ?? {}, ctx);
  }
  return new Dom(tag, attr, ...ctx);
}

export const frag = (r: attr, ...dom: ctx[]) => dom.flat();

/*
-------------------------
RENDER
 - 
-------------------------
*/

function reRender(
  DE: Dom[],
  instanceId: idm,
  _CTX: string[],
  isCTX: boolean = false,
) {
  DE.forEach((element) => {
    if (isArr(element)) {
      reRender(element, instanceId, _CTX, isCTX);
    } else {
      if (element instanceof Dom) {
        const instance = element.__(instanceId);
        XMAP.map(instance.attr);
        if (isCTX) _CTX.push(instance.ctx);
      } else {
        if (isCTX) _CTX.push(element);
      }
    }
  });
  return _CTX;
}

export class Render {
  path: string = "";
  constructor(
    public app: (data: any) => Dom | Promise<Dom>,
    path?: string,
  ) {
    this.path = path ? path.replace(".tsx", ".js") : "";
  }
  //   CLIENT
  async ctx(data = {}) {
    await this.dom(data, true);
  }
  async dom(data = {}, isCTX: boolean = false) {
    const bodyElement = $(document.body);
    const bodyId = bodyElement.id;
    const _CTX: string[] = [];
    if (!bodyId) return;
    const instanceId = new idm(bodyId + "_0");
    const appResult: Dom | Dom[] = await this.app(data);

    if (isCTX) bodyElement.inner = "";

    const domElements = isArr(appResult) ? appResult : [appResult];

    reRender(domElements, instanceId, _CTX, isCTX);

    if (isCTX) bodyElement.appendfirst = _CTX.join("");

    trigger("render");
    windowState();
  }
  async ssr(data = {}) {
    const TT = await this.app(data);
    const id = makeID(5);
    const instanceId = new idm(id + "_0");
    const XDM = isArr(TT) ? TT : [TT];
    const _CTX: string[] = [];

    reRender(XDM, instanceId, _CTX, true);

    return {
      script: `<script type="module">import x from "./${this.path}";x.dom(${ngify(data)});</script>`,
      body: `<body id="${id}">${_CTX.join("")}</body>`,
    };
  }
}

export class Watcher<T> {
  private value: T;
  private handlers: ((value: T) => void)[] = [];

  constructor(private watchFn: () => T) {
    this.value = watchFn();
  }

  on(callback: (value: T) => void, initialize: boolean = true) {
    this.handlers.push(callback);
    if (initialize) callback(this.value);
    return this;
  }

  get update() {
    const newValue = this.watchFn();
    if (this.value !== newValue) {
      this.value = newValue;
      this.handlers.forEach((handler) => handler(newValue));
    }
    return;
  }
}
