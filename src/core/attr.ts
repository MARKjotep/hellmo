import {
  $$,
  isArr,
  isBool,
  isDict,
  isObj,
  keyInMap,
  Mapper,
  obj,
  oItems,
  V,
} from "./@";

import { Stateful } from "./stateful";

type X2 = V | V[];
export type X3 = X2 | Stateful<X2>;

export type CSSinT = {
  [P in keyof CSSStyleDeclaration]?: X3;
} & {
  [key: string]: X3;
};

export type Elements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface c_events {
  watch?: (this: Elements) => [(...args: any[]) => void, Stateful<any>[]];
  ready?: (this: Elements) => void;
  resize?: (this: Elements, e: UIEvent) => void;
  unload?: (this: Elements, e: BeforeUnloadEvent) => void;
  popstate?: (this: Elements, e: PopStateEvent) => void;
}

export interface baseAttr {
  style?: CSSinT;
  on?: events;
  id?: string;
  class?: X3;
}

const keyInAttrMap = (key: string, map: Mapper<string, string[]>) => {
  if (!map.has(key)) map.set(key, []);
  return map.get(key);
};

const pushToMap = (
  k: string,
  v: any,
  map: Mapper<string, string[]>,
  pref?: string,
) => {
  const mapped = keyInAttrMap(pref ?? k, map)!;
  mapped.push(pref ? `${k}:${v}` : v);
};

const getStateCallback = (attr: string, pre?: string) => {
  switch (pre ?? attr) {
    case "style":
      return function (this: Elements, e: CustomEvent) {
        this.style.setProperty(attr, e.detail);
      };
    default:
      return function (this: HTMLElement, e: CustomEvent) {
        this.setAttribute(attr, e.detail);
      };
  }
};

const toAttr = (
  attr: Exclude<baseAttr, events>,
  id: string,
  map: Mapper<string, string[]>,
  statefuls: (() => void)[],
  pre?: string,
) => {
  //
  const processValue = (k: string, v: any) => {
    if (isArr(v)) {
      pushToMap(k, v.join(" "), map, pre);
    } else if (v instanceof Stateful) {
      const cb = getStateCallback(k, pre);
      const entry = pre ? `${pre}_${k}` : k;

      statefuls.push(v.call(cb, (attr.id ??= id), entry));

      processValue(k, v.value);
    } else if (isObj(v)) {
      isDict(v) && toAttr(v, id, map, statefuls, k);
      if ("id" in v) {
        attr.id ??= v.id as string;
      }
    } else {
      pushToMap(k, isBool(v) ? (v ? "" : "false") : String(v), map, pre);
    }
  };
  //
  oItems(attr).forEach(
    ([k, v]) => !["on", "id"].includes(k) && processValue(k, v),
  );
};

export class ATTR {
  /*
    -------------------------
    save the
    Stateful, CB and ID -- to be
    -------------------------
    */
  //   Immediately register the callback with ID
  on: events = {};
  attr: Mapper<string, string[]> = new Mapper();
  constructor(
    attr: baseAttr,
    private _id: string,
    private statefuls: (() => void)[] = [],
  ) {
    this.on = attr.on ?? {};
    toAttr(attr, _id, this.attr, this.statefuls);
    if (attr.id) {
      this.attr.set("id", [attr.id]);
    }
  }

  get id(): string | undefined {
    return this.attr.get("id")?.join("");
  }
  set id(id: string) {
    if (!this.attr.has("id")) {
      this.attr.set("id", [id]);
    }
  }
  get string() {
    let _attr_arr: string[] = [""];
    this.attr.forEach((v, k) => {
      const vv = v.join(";");
      _attr_arr.push(vv ? `${k}="${vv}"` : k);
    });
    return _attr_arr.join(" ");
  }
}
