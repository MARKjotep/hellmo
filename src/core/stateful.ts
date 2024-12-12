import {
  $$,
  idm,
  isArr,
  isNotWindow,
  isNull,
  isObj,
  isUndefined,
  keyInMap,
  Mapper,
  ngify,
  oKeys,
  oLen,
  oVals,
} from "./@";
import { Elements } from "./attr";
/*
-------------------------
TYPES
-------------------------
*/

type statesM<T> = Mapper<string, (this: Elements, arg: T) => any>;
type stateMapped<T> = Mapper<string, statesM<T>>;

type Changes = {
  added: Record<string, any>;
  removed: Record<string, any>;
  modified: Record<string, { old: any; new: any }>;
};

/*
-------------------------

-------------------------
*/

const compareObjects = <T extends object>(
  oldObj: T,
  newObj: T | any,
): Changes => {
  const changes: Changes = { added: {}, removed: {}, modified: {} };

  const oldKeys = oKeys(oldObj as Record<string, any>);
  const newKeys = oKeys(newObj as Record<string, any>);

  // Check for added and modified keys
  for (const key of newKeys) {
    const oldValue = (oldObj as any)[key];
    const newValue = (newObj as any)[key];

    if (!(key in oldObj)) {
      changes.added[key] = newValue;
    } else if (isArr(oldValue) && isArr(newValue)) {
      if (ngify(oldValue) !== ngify(newValue)) {
        changes.modified[key] = { old: oldValue, new: newValue };
      }
    } else if (
      isObj(oldValue) &&
      isObj(newValue) &&
      !isNull(oldValue) &&
      !isNull(newValue)
    ) {
      const nestedChanges = compareObjects(oldValue, newValue);
      if (
        oLen(nestedChanges.added) ||
        oLen(nestedChanges.removed) ||
        oLen(nestedChanges.modified)
      ) {
        changes.modified[key] = { old: oldValue, new: newValue };
      }
    } else if (oldValue !== newValue) {
      changes.modified[key] = { old: oldValue, new: newValue };
    }
  }

  // Check for removed keys
  for (const key of oldKeys) {
    if (!(key in newObj)) {
      changes.removed[key] = (oldObj as any)[key];
    }
  }

  return changes;
};

const objectUdpated = (changes: Changes) => {
  return oVals(changes).some((vv) => {
    return oLen(vv);
  });
};

const isDomConnected = (element: Elements) => {
  return element && element.isConnected;
};

const ElementId: Mapper<string, Elements> = new Mapper();

export const getElementById = (key: string): Elements | undefined => {
  if (!ElementId.has(key)) {
    const element = document.getElementById(key);
    if (element) {
      ElementId.set(key, element);
      return element;
    }
  } else {
    const element = ElementId.get(key);
    if (element && isDomConnected(element)) {
      return element;
    }
    ElementId.delete(key);
  }

  //
  return undefined;
};

const handleMappedStates = (states: stateMapped<any>, value: any) => {
  for (const [key, val] of states) {
    const D = getElementById(key);
    if (!D) {
      states.delete(key);
      continue;
    }
    val.forEach((v) => {
      v.call(D, value);
    });
  }
};

export class Stateful<T> extends EventTarget {
  private states: stateMapped<any> = new Mapper();
  private _value: T;
  private listening = false;
  private end?: () => void;
  private isNotWindow = isNotWindow();
  constructor(
    value: T,
    private options?: AddEventListenerOptions,
  ) {
    super();
    this._value = value;
  }
  get value() {
    return this._value;
  }
  set value(newValue: T) {
    //
    if (isNull(newValue) || isUndefined(newValue)) return;

    if (isObj(this._value)) {
      const changes = compareObjects(this._value, newValue);
      if (!objectUdpated(changes)) return;
    } else if (this._value === newValue) return;

    this._value = newValue;
    this.dispatchEvent(new CustomEvent("updated", { detail: this._value }));
  }
  get listen() {
    // Register the listener once
    const handler = (event: CustomEvent) => {
      handleMappedStates(this.states, event.detail);
      if (!this.states.size) this.end?.();
    };

    // if the length of map size is 0, then remove listener and from States
    if (!this.listening) {
      this.addEventListener("updated", handler as any, this.options);
      //
      this.listening = true;
    }

    return () => {
      this.listening &&
        this.removeEventListener("updated", handler as any, this.options);
      //
      this.listening = false;
    };
  }
  call<Q>(callback: (this: Elements, arg: T) => Q, entry: string) {
    return (id: string) => {
      // Call this when ready to push -- add entry to only keep one updatable element --
      keyInMap<statesM<T>>(id, this.states).set(entry, callback);
      // MapArray(id, this.states)!.push(callback);
      if (!this.isNotWindow && !this.listening) {
        this.end = this.listen;
      }
      return () => {
        if (this.states.has(id)) this.states.get(id)?.delete(entry);
      };
    };
  }
}

export function State<T>(value: T) {
  return new Stateful(value);
}

/*
-------------------------
dom, ctx, style, etc
-------------------------
*/
