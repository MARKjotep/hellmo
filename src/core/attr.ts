import { $$, isArr, isBool, isDict, isFN, isObj, ngify, oItems, V } from "./@";
import { CATT } from "./catt";

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

/*
-------------------------

-------------------------
*/
const attr_value = (v: any): string => {
  if (isArr(v)) {
    return v.join(" ");
  } else if (isObj(v)) {
    if (isDict(v)) {
      return ngify(v);
    }
  } else if (isFN(v)) {
    return attr_value((v as any)());
  } else if (v !== undefined && v !== null) {
    return isBool(v) ? (v ? "" : "false") : String(v);
  }
  return "";
};

export class ATTR {
  constructor(public attr: attr = {}) {}

  private getCallback(attr: string, pre?: string) {
    switch (pre ?? attr) {
      case "style":
        return function (this: Elements, e: string) {
          this.style.setProperty(attr, e);
        };
      default:
        return function (this: HTMLElement, e: any) {
          this.setAttribute(attr, e);
        };
    }
  }
  get(catt: CATT, attr: attr = this.attr, pre?: string) {
    //
    const processValue = (k: string, v: any) => {
      //
      if (isArr(v)) {
        catt.attr_push(k, attr_value(v));
      } else if (v instanceof Stateful) {
        const entry = pre ? `${pre}_${k}` : k;
        //

        catt.states.push(v.call(this.getCallback(k, pre), entry));

        processValue(k, v.value);
        //
      } else if (isObj(v)) {
        if (isDict(v) && !pre) {
          this.get(catt, v, k);
        }
      } else {
        catt.attr_push(k, attr_value(v), pre);
      }
    };

    oItems(attr).forEach(([k, v]) => {
      if (["on"].includes(k)) {
        isObj(attr.on) && catt.events.obj(attr.on);
      } else {
        processValue(k, v);
      }
    });
  }
}
