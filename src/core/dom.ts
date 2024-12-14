import {
  $$,
  idm,
  isArr,
  isFN,
  isNotWindow,
  isObj,
  makeID,
  ngify,
  obj,
  V,
} from "./@";
import { ATTR, baseAttr, Elements, X3 } from "./attr";
import { CATT } from "./catt";
import { OZ } from "./oz";
import { Router } from "./router";
import { Stateful } from "./stateful";

/*
-------------------------
TYPES
-------------------------
*/
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
//
type ctx = V | Dom | Stateful<V | Dom> | ctx[];
type attr = baseAttr | obj<X3>;

export const Wizard = new OZ();

const ctx_value = (cc: any, catt: CATT): string => {
  if (isArr(cc)) {
    return cc.map((c) => ctx_value(c, catt)).join("");
  } else if (cc instanceof Dom) {
    const ND = cc.__(catt.IDM);
    const { ctx, oz } = ND;
    catt.OZ.push(oz);
    return ctx;
  } else if (isObj(cc)) {
    return ngify(cc);
  } else if (isFN(cc)) {
    return ctx_value((cc as any)(), catt);
  } else if (cc !== undefined && cc !== null) {
    return String(cc);
  }
  return "";
};

const processCTXStateful = (xid: string, value: any) => {
  const ndm = new idm(xid);
  const catt = new CATT(ndm.mid, ndm);
  const ctx = ctx_value(value, catt);
  return { ctx, catt };
};

//
class CTX {
  closing: string;
  constructor(
    public tag: string,
    public ctx: ctx[],
  ) {
    const selfClosing = hasTag(tag);
    this.closing = selfClosing ? "" : `</${tag}>`;
  }
  //
  private getCallback(entry: string) {
    return function (this: Elements, arg: V | Dom) {
      const elementId = this.id;
      if (elementId) {
        const { ctx, catt } = processCTXStateful(elementId, arg);
        if (this.innerHTML !== ctx) {
          this.innerHTML = ctx;
          //
          Wizard.RPS(catt.OZ);

          // reset the id from mainOZ then combine new catt.OZ
        }
      }
    };
  }
  private process(catt: CATT, ctx: any[] = this.ctx, inner: string[] = []) {
    //
    const processCTX = (v: ctx) => {
      if (isArr(v)) {
        this.process(catt, v, inner);
      } else if (v instanceof Stateful) {
        if (ctx.length > 1) {
          processCTX(dom("div", {}, v));
        } else {
          const entry = v.value instanceof Dom ? "dom" : "ctx";
          const { ctx, catt: _ct } = processCTXStateful(
            catt.xid + "-0",
            v.value,
          );
          catt.xid = _ct.xid;
          catt.OZ.push(_ct.OZ);
          inner.push(ctx);
          catt.states.push(v.call(this.getCallback(entry), entry));
        }
      } else {
        inner.push(ctx_value(v, catt));
      }
    };

    ctx.forEach(processCTX);
    return inner.join("");
  }
  get(catt: CATT) {
    const ctx = this.process(catt);

    if (catt.events.size || catt.states.length) {
      catt.id = catt.xid;
    }
    //
    return `<${this.tag}${catt.attr}>${ctx}${this.closing}`;
  }
}

export class Dom {
  private attr: ATTR;
  private ctx: CTX;
  constructor(
    private tag: string,
    attr: attr = {},
    ...ctx: ctx[]
  ) {
    this.attr = new ATTR(attr);
    this.ctx = new CTX(tag, ctx);
  }
  __(pid = new idm()) {
    const catt = new CATT(pid.mid, pid);
    this.attr.get(catt);
    const ctx = this.ctx.get(catt);
    const oz = catt.OZ.set(catt);

    return {
      ctx,
      oz,
    };
  }
}

export function dom(
  tag: string | ((attr: any, ...ctx: any[]) => Dom),
  attr: attr = {},
  ...ctx: ctx[]
) {
  // Process the ctx here to lessen the time -- convert them all to flat array?
  //
  if (isFN(tag)) {
    return tag(attr ?? {}, ...ctx);
  }
  // if ctx is array, flatten or use rest operator
  return new Dom(tag, attr ?? {}, ctx);
}

export const frag = (r: attr, ...dom: ctx[]) => dom;

/*
-------------------------

-------------------------
*/
//
interface renderConfig {
  importMeta?: ImportMeta;
  router?: Router;
}

export class Render {
  path: string = "";
  constructor(public app: (data: any) => ctx | ctx[] | Promise<ctx | ctx[]>) {}
  async ctx(data = {}) {
    await this.dom(data, true);
  }
  async dom(data = {}, isCTX: boolean = false) {
    const bodyElement = document.body;
    const DM = dom("div", { id: "root" }, await this.app(data));
    const { ctx, oz } = DM.__(new idm(bodyElement.id));
    //
    if (isCTX) {
      bodyElement.insertAdjacentHTML("afterbegin", ctx);
    }

    Wizard.push(oz);
    //
    requestAnimationFrame(() => {
      Wizard.start;
    });
  }
  async ssr(data = {}) {
    const DM = dom("div", { id: "root" }, await this.app(data));
    const id = makeID(5);
    const { ctx } = DM.__(new idm(id + "-0"));
    //
    return {
      head: ``,
      script: `<script type="module">import x from "./${this.path}";x.dom(${ngify(data)});</script>`,
      body: `<body  id="${id}">${ctx}</body>`,
    };
  }
  config(config: renderConfig) {
    const { importMeta, router } = config;
    this.path = importMeta?.file ? importMeta.file.replace(".tsx", ".js") : "";

    /*
    -------------------------
    todo
    get router - head and save in render class
    -------------------------
    */

    return this;
  }
  data(data = {}) {
    return this;
  }
}
