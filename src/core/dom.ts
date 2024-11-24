import {
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
} from "./@";
import { $, Elem } from "./elem";

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
const WaSTATE: Mapper<string, Watcher<any>[]> = new Mapper();

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
            domOnly = dom_trig(key, mx, dx, vg as _MS);
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
                  const [ic] = _CTX(cxt(D!) as any, NMP);
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
                  oItems(y).forEach(([kk, vv]) => {
                    if (isFN(vv)) {
                      let xvv = vv as (e?: HTMLElement | undefined) => void;
                      if (kk === "ready") {
                        vv.apply(D);
                      } else if (
                        ["resize", "unload", "popstate"].includes(kk)
                      ) {
                        WinSTATE.set(key, { [kk]: xvv });
                      } else if (kk === "watch") {
                        const vvd = vv.apply(D) as WTC | WTC[];
                        if (vvd) {
                          let fvvd = isArr(vvd) ? vvd : [vvd];
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
                  oItems(y).forEach(([kk, vv]) => {
                    const [nval, _nval] = vv as _MS;
                    const sval = nval(D) as any;
                    if (sval !== _nval) {
                      _stl[kk] = sval;
                      oAss(XMAP.get(key)?.get(x) ?? {}, {
                        [kk]: [nval, sval],
                      });
                    }
                  });
                  oLen(_stl) && dx.style.set(_stl);
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

const reValDom = (vx: any, affect: boolean): void => {
  if (vx instanceof Dom && affect) {
    vx.component = false;
  } else if (isArr(vx)) {
    vx.forEach((vc) => reValDom(vc, affect));
  }
};

function __unChanged(val: any, nval: any): boolean {
  if (typeof nval === "object" && isArr(nval) && !isObj(nval[0])) {
    return nval.join("") === val.join("");
  }
  return val === nval;
}

function _ATTR(
  attr: [string, any],
  attMap: Mapper<string, string>,
  doMap: domMAP,
) {
  const [k, v] = attr;
  let style = k === "style";
  if (isFN(v)) {
    const vt = v();
    _ATTR([k, vt], attMap, doMap);
    doMap.set(k, [v, vt]);
  } else if (isDict(v)) {
    if (style) {
      const svt = oItems(v)
        .map(([ss, vv]) => {
          const xss = reCamel(ss);
          let _vv = vv;
          if (isFN(vv)) {
            _vv = vv();
            if (!doMap.has("style")) doMap.set("style", {});
            oAss(doMap.get("style")!, { [xss]: [vv, _vv] });
          }
          return `${xss}:${_vv}`;
        })
        .join(";");
      attMap.set("style", svt);
    } else if (k === "on") {
      doMap.set(k, v);
    }
  } else {
    const _val = (isArr(v) ? v.flat() : [v]).filter((s) => s !== undefined);
    attMap.set(
      k,
      _val.map((s) => (isBool(s) ? (s ? "" : "false") : String(s))).join(" "),
    );
  }
}

function _CTX(
  ct: ctx,
  faMap: VMapper,
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
      faMap.map(processedDom.attr);
      return processedDom.ctx;
    }

    if (isObj(value)) {
      return JSON.stringify(value);
    }

    return String(value === undefined ? "" : value);
  });

  return [processedValues.join(""), isDom, component];
}

export function state<T, O = obj<any>>(
  val: T,
  affectChildren = false,
): [() => T, (newValue: T) => void, O] {
  reValDom(val, affectChildren);
  let currentValue: T = val;
  let stateObj: O = {} as O;
  const getValue = (): T => currentValue;
  const setValue = (newValue: T): void => {
    if (__unChanged(currentValue, newValue)) return;
    reValDom(newValue, affectChildren);
    currentValue = newValue;
    trigger("state", affectChildren);
  };
  return [getValue, setValue, stateObj];
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
    const doMap: domMAP = new Mapper();
    const attMap: Mapper<string, string> = new Mapper();
    const _ctx: string[] = [];
    const faMap: VMapper = new Mapper();
    //
    if (this._attr) {
      oItems(this._attr).forEach((k) => {
        _ATTR(k, attMap, doMap);
      });
    }

    const x_len = this._ctx.length;
    const conMAP: ((e?: Element) => S | ctx)[] = [];
    this._ctx.forEach((ct) => {
      if (isFN(ct)) {
        if (x_len > 1) {
          const [_cc] = _CTX(dom("div", {}, ct), faMap, pid);
          _ctx.push(_cc);
        } else {
          const vt = ct();
          const ndx = new idm(xid + "_0");
          xid = ndx.mid;
          const [_cc, isDom, comp] = _CTX(vt, faMap, ndx);
          let ccd = isDom ? (comp ? "dom_ctx" : "dom") : "ctx";
          doMap.set(ccd, [ct, _cc]);
          _ctx.push(_cc);
        }
      } else {
        const [_cc] = _CTX(ct, faMap, pid);
        _ctx.push(_cc);
      }
    });

    /*
      -------------------------
      
      -------------------------
      */

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
    if (!hasTag(name)) {
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
  if (isFN(tag)) {
    return tag(__ ? { ...attr, __ } : __, ...ctx);
  } else {
    return new Dom(tag, attr, ctx);
  }
}

export function frag(r: any, ...d: ctx[]) {
  return d.flat();
}
/*
-------------------------

-------------------------
*/

export function upMAP(NMP: VMapper) {
  NMP.size &&
    NMP.keys().forEach((fc) => {
      XMAP.delete(fc);
      WaSTATE.delete(fc);
      WinSTATE.delete(fc);
    });
  XMAP.map(NMP);
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
    let noscrp = `<noscript>You need to enable JavaScript to run this app.</noscript>`;
    const _XRT = $(document.body);
    const id = _XRT.id;
    if (id) {
      const _id = new idm(id + "_0");
      const TA = await this.app(data);
      const XDM = isArr(TA) ? TA : [TA];
      if (isCTX) _XRT.inner = "";

      XDM.forEach((ts: Dom) => {
        if (ts instanceof Dom) {
          const its = ts.__(_id);
          XMAP.map(its.attr);
          if (isCTX) _XRT.appendfirst = its.ctx;
        } else {
          if (isCTX) _XRT.appendfirst = ts;
        }
      });
      if (isCTX) _XRT.appendfirst = noscrp;

      trigger("render");
      windowState();
    }
  }
  //   SSR
  async ssr(data = {}) {
    const TT = await this.app(data);
    const id = makeID(5);

    const nid = new idm(id + "_0");
    const XDM = isArr(TT) ? TT : [TT];
    let _CTX: string[] = [];
    XDM.forEach((ts: Dom) => {
      if (ts instanceof Dom) {
        const its = ts.__(nid);
        _CTX.push(its.ctx);
      } else {
        _CTX.push(ts);
      }
    });

    return {
      script: `<script type="module">import x from "./${this.path}";x.dom(${ngify(data)});</script>`,
      body: `<body id="${id}">${_CTX.join("")}</body>`,
    };
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
