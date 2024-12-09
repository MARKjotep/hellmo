import {
  $$,
  isArr,
  isFN,
  isNull,
  isNumber,
  isObj,
  keyInMapArray,
  makeID,
  Mapper,
  ngify,
  obj,
  oItems,
  V,
} from "./@";
import { ATTR, Elements } from "./attr";
import { getElementById, State, Stateful } from "./stateful";

/*
------------------------- 

-------------------------
*/

type ctx = V | Dom | Stateful<V | Dom>;

class idm {
  private _c = 0;
  private id = "";
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
    return this.id + "_" + this._c++;
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
Separate the statefuls to make it optional --
-------------------------
*/

const WinSTATE: Mapper<
  string,
  obj<(e?: HTMLElement, t?: EventTarget | null) => void>
> = new Mapper();
const EventListeners: Mapper<string, (() => any)[]> = new Mapper();

const Listen = (E: Elements, type: string, cb: () => any) => {
  E.addEventListener(type, cb);
  return () => {
    E.removeEventListener(type, cb);
  };
};

function handleWatch(
  key: string,
  w: [(...args: any[]) => void, Stateful<any>[]],
) {
  const [cb, statefuls] = w;

  const smap = () => statefuls.map((st) => st.value);
  const handler = () => {
    cb(...smap());
  };
  statefuls.forEach((st) => {
    st.call(handler, key, key + "_watch")();
  });
}

function handleEvents(ons: Mapper<string, events>) {
  for (const [key, val] of ons) {
    const E = getElementById(key);
    if (E) {
      oItems(val).forEach(([k, v]) => {
        if (k === "ready") {
          v.apply(E);
        } else if (["resize", "unload", "popstate"].includes(k)) {
          //
          WinSTATE.set(key, { [k]: v });
        } else if (k === "watch") {
          // load the watcher here
          handleWatch(key, v());
        } else {
          const KARR = <(() => any)[]>keyInMapArray(key, EventListeners);
          KARR.push(Listen(E, k, v));
        }
        //
      });
    }
  }
}

function windowState() {
  const _W = window;

  const handleEvent = (
    event: UIEvent | BeforeUnloadEvent | PopStateEvent,
    eventType: "resize" | "unload" | "popstate",
  ) => {
    WinSTATE.forEach((val, key) => {
      if (val[eventType]) {
        const D = getElementById(key);
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

const getDomProps = (arg: V | Dom, key: string) => {
  const states: (() => void)[] = [];
  const on: Mapper<string, events> = new Mapper();
  const ctx = getCTX(arg, key, states, on);
  return { states, on, ctx };
};

const processCtx = (
  ctx: ctx[],
  inner: string[],
  id: string,
  pid: idm,
  attr: ATTR,
  statefuls: (() => void)[],
  ons: Mapper<string, events>,
) => {
  const processStateful = (cc: Stateful<V | Dom>, isMultiCtx: boolean) => {
    if (isMultiCtx) {
      processCtx([dom("div", {}, cc)], inner, id, pid, attr, statefuls, ons);
    } else {
      const ndx = new idm(id + "_0");
      id = ndx.mid;
      attr.id = id;
      processCtx([cc.value], inner, id, ndx, attr, statefuls, ons);

      const entry = cc.value instanceof Dom ? "dom" : "ctx";
      //
      statefuls.push(
        //
        cc.call(
          function (this: Elements, arg: V | Dom) {
            const elementId = this.id;
            if (elementId) {
              const { states, on, ctx } = getDomProps(arg, elementId);
              if (this.innerHTML !== ctx) {
                cc.reset(elementId);
                this.innerHTML = ctx;
                states.forEach((ins) => ins());
                // unload the events associated with the element
                EventListeners.get(elementId)?.forEach((v) => v());
                // Push new events
                handleEvents(on);
                // Delete window state
                WinSTATE.delete(elementId);
                // Delete watched states
                // WaSTATE.delete(fc);
                // Also reset the dependencis in ON states
              }
            }
          },
          id,
          entry,
        ),
      );
    }
  };

  const processItem = (cc: ctx) => {
    if (isArr(cc)) {
      processCtx(cc, inner, id, pid, attr, statefuls, ons);
    } else if (cc instanceof Stateful) {
      processStateful(cc, ctx.length > 1);
    } else {
      inner.push(getCTX(cc, id, statefuls, ons));
    }
  };

  ctx.forEach(processItem);
};

const getCTX = (
  cc: ctx,
  pid: string,
  statefuls: (() => void)[],
  ons: Mapper<string, events>,
) => {
  if (cc instanceof Dom) {
    const ND = cc.__(new idm(pid));
    ons.map(cc.ons);
    statefuls.push(...cc.statefuls);
    return ND;
  } else if (isObj(cc)) {
    return ngify(cc);
  } else if (cc !== undefined && !isNull(cc)) {
    return String(cc);
  }
  return "";
};

export class Dom {
  statefuls: (() => void)[] = [];
  ons: Mapper<string, events> = new Mapper();
  __: (pid?: idm) => string;
  constructor(tag: string, attr: attr = {}, ...ctx: ctx[]) {
    //
    this.__ = (pid: idm = new idm()) => {
      let xid = pid.mid;
      const _attr = new ATTR(attr, xid, this.statefuls);
      const inner: string[] = [];

      processCtx(
        ctx,
        inner,
        _attr.id ?? xid,
        pid,
        _attr,
        this.statefuls,
        this.ons,
      );

      this.ons.ass(_attr.id ?? xid, _attr.on);

      // ----------
      const selfClosing = hasTag(tag);
      const attributes = _attr.string;
      const content = selfClosing ? "" : inner.join("");
      const closing = selfClosing ? "" : `</${tag}>`;

      return `<${tag}${attributes}>${content}${closing}`;
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
  return new Dom(tag, attr ?? {}, ...ctx);
}

export const frag = (r: attr, ...dom: any[]) => dom;

/*
-------------------------

-------------------------
*/

function reRender(
  DE: Dom[],
  eid: string,
  _CTX: string[],
  _STATES: (() => void)[],
  _ON: Mapper<string, events>[],
  isCTX: boolean = false,
) {
  DE.forEach((element) => {
    if (isArr(element)) {
      reRender(element, eid, _CTX, _STATES, _ON, isCTX);
    } else {
      const { states, ctx, on } = getDomProps(element, eid);
      _CTX.push(ctx);
      _STATES.push(...states);
      _ON.push(on);
    }
  });
}

export class Render {
  path: string = "";
  constructor(
    public app: (data: any) => Dom | Promise<Dom>,
    path?: string,
  ) {
    this.path = path ? path.replace(".tsx", ".js") : "";
  }
  async ctx(data = {}) {
    await this.dom(data, true);
  }
  async dom(data = {}, isCTX: boolean = false) {
    const bodyElement = document.body;
    const bodyId = bodyElement.id;

    const appResult: Dom | Dom[] = await this.app(data);
    const domElements = isArr(appResult) ? appResult : [appResult];
    const _CTX: string[] = [];
    const _STATES: (() => void)[] = [];
    const _ON: Mapper<string, events>[] = [];
    //
    reRender(domElements, bodyId, _CTX, _STATES, _ON, isCTX);

    if (isCTX) bodyElement.innerHTML = _CTX.join("");

    requestAnimationFrame(() => {
      //
      _STATES.forEach((st) => st());
      _ON.forEach((on) => handleEvents(on));
      windowState();
    });
  }
  async ssr(data = {}) {
    const TT = await this.app(data);
    const id = makeID(5);
    //
    const XDM = isArr(TT) ? TT : [TT];
    const _CTX: string[] = [];
    const _STATES: (() => void)[] = [];
    const _ON: Mapper<string, events>[] = [];

    reRender(XDM, id + "_0", _CTX, _STATES, _ON, true);

    return {
      script: `<script type="module">import x from "./${this.path}";x.dom(${ngify(data)});</script>`,
      body: `<body id="${id}">${_CTX.join("")}</body>`,
    };
  }
}

// const NS = State("ulol");
// const ctTEST = State("ct test");
// const domTT = State(dom("div", {}, "hello dom"));

// const AT: attr = {
//   hello: "str",
//   truthy: true,
//   numb: 2,
//   class: [1, 2, 3],
//   lol: NS,
//   // On should be on different object
//   on: {
//     click() {
//       $$.p = "nice!!";
//     },
//     ready() {
//       $$.p = "Ready";
//     },
//     watch() {
//       return [
//         (n: string, c: string, d: Dom) => {
//           //
//         },
//         [NS, ctTEST, domTT],
//       ];
//     },
//   },
//   style: {
//     color: "red",
//     background: ["orange"],
//     font: NS,
//   },
// };

// const DM = dom(
//   "div",
//   AT,
//   123,
//   "456",
//   dom("span", { style: { color: NS } }, "im span", NS),
//   ctTEST,
//   domTT,
// );

// $$.p = DM.__();

// $$.p = DM.ons;
